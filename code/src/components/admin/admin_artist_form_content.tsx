import { useEffect, useId, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { ZodError } from "zod";
import type { AdminArtistFormContentProps } from "../../models/props/admin/admin_artist_form_content_props";
import type { Artist } from "../../../models/artist";
import ArtistApiService from "../../services/artist_api_service";
import { CONCERT_DAYS } from "../../validators/admin/admin_artist_form_validators";
import style from "./admin_artist_form_content.module.css"

type FormValues = Omit<Partial<Artist>, "image"> & { image?: FileList };

const AdminArtistFormContent = ({
	validator,
	dataToUpdate,
}: AdminArtistFormContentProps) => {

	const nameId = useId();
	const descriptionId = useId();
	const imageId = useId();
	const youtubeId = useId();
	const concertId = useId();

	// messages d'erreur renvoyés par le validateur
	const [serverErrors, setServerErrors] = useState<Partial<Record<keyof Artist, string>>>();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>();

	// préremplir le formulaire avant l'affichage du composant
	useEffect(() => {
		if (dataToUpdate) {
			const { image: _image, ...rest } = dataToUpdate;
			reset(rest);
		}
	}, [dataToUpdate, reset]);

	// aperçu de la nouvelle image choisie (sinon l'image actuelle)
	const file = useWatch({ control, name: "image" })?.[0];
	const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
	useEffect(() => () => {
		if (preview) URL.revokeObjectURL(preview);
	}, [preview]);
	const shownImage = preview ?? (dataToUpdate ? `/img/programmation/${dataToUpdate.image}` : null);

	// message lié à la soumission du formulaire
	const [message, setMessage] = useState<string>("");

	// useNavigate permet de créer une redirection
	const navigate = useNavigate();

	// soumission du formulaire
	const submitForm = async (data: FormValues) => {
		setMessage("");
		// normaliser les données saisies : le champ fichier renvoie une liste, on garde le premier fichier
		const image = data.image?.[0];
		const normalizedData = { ...data, image } as unknown as Partial<Artist>;

		// validation de la saisie
		const validation = await validator(normalizedData);

		if (validation instanceof ZodError) {
			const fieldErrors: Partial<Record<keyof Artist, string>> = {};
			for (const issue of validation.issues) {
				fieldErrors[issue.path[0] as keyof Artist] = issue.message;
			}
			setServerErrors(fieldErrors);
			return;
		}
		setServerErrors(undefined);

		// le formulaire contient un fichier : envoi d'un objet FormData vers l'API
		const formData = new FormData();
		if (dataToUpdate) formData.set("id", String(dataToUpdate.id));
		formData.set("name", String(data.name ?? ""));
		formData.set("description", String(data.description ?? ""));
		formData.set("youtubeurl", String(data.youtubeurl ?? ""));
		formData.set("concertday", String(data.concertday ?? ""));
		if (image) formData.set("image", image);

		// requête HTTP vers l'API
		const process = dataToUpdate
			? await new ArtistApiService().update(formData)
			: await new ArtistApiService().insert(formData);

		if ([200, 201].includes(process.status)) {
			navigate("/admin");
		} else if (process.status === 401) {
			navigate("/admin/login");
		} else {
			setMessage(process.message);
		}
	};

	return (
		<section className={style.Dataform}>
			<NavLink to="/admin" className={style.back}>← Retour à la liste</NavLink>
			<h1 className={style.title}>{dataToUpdate ? `Modifier ${dataToUpdate.name}` : "Ajouter un artiste"}</h1>

			<form encType="multipart/form-data" onSubmit={handleSubmit(submitForm)} noValidate>
				<p className={style.Formulaire}>
					<label htmlFor={nameId}>Nom</label>
					<input
						type="text"
						id={nameId}
						aria-invalid={!!(errors.name || serverErrors?.name)}
						{...register("name", {
							required: "Le nom est obligatoire",
							minLength: { value: 2, message: "Un nom doit comporter, au minimum, 2 caractères" },
							maxLength: { value: 50, message: "Un nom doit comporter, au maximum, 50 caractères" },
						})}
					/>
					<small role="alert">{errors.name?.message ?? serverErrors?.name}</small>
				</p>

				<div className={style.Formulaire}>
					<label htmlFor={imageId}>Photo {dataToUpdate && "(laisser vide pour garder l'actuelle)"}</label>
					{shownImage && <img src={shownImage} alt="" className={style.preview} />}
					<input
						type="file"
						id={imageId}
						accept="image/jpeg,image/png,image/webp,image/avif"
						{...register("image", {
							validate: (files) =>
								dataToUpdate || (files && files.length > 0) ? true : "L'image est obligatoire",
						})}
					/>
					<small className={style.hint}>JPG, PNG, WebP ou AVIF · 5 Mo maximum</small>
					<small role="alert">{errors.image?.message ?? serverErrors?.image}</small>
				</div>

				<p className={style.Formulaire}>
					<label htmlFor={descriptionId}>Description</label>
					<textarea
						id={descriptionId}
						rows={8}
						aria-invalid={!!(errors.description || serverErrors?.description)}
						{...register("description", {
							required: "La description est obligatoire",
							minLength: { value: 20, message: "La description doit comporter, au minimum, 20 caractères" },
							maxLength: { value: 3000, message: "La description doit comporter, au maximum, 3000 caractères" },
						})}
					/>
					<small role="alert">{errors.description?.message ?? serverErrors?.description}</small>
				</p>

				<p className={style.Formulaire}>
					<label htmlFor={youtubeId}>Lien YouTube</label>
					<input
						type="url"
						id={youtubeId}
						placeholder="https://youtu.be/…"
						aria-invalid={!!(errors.youtubeurl || serverErrors?.youtubeurl)}
						{...register("youtubeurl", { required: "Le lien YouTube est obligatoire" })}
					/>
					<small role="alert">{errors.youtubeurl?.message ?? serverErrors?.youtubeurl}</small>
				</p>

				<p className={style.Formulaire}>
					<label htmlFor={concertId}>Jour du concert</label>
					<select
						id={concertId}
						defaultValue=""
						aria-invalid={!!(errors.concertday || serverErrors?.concertday)}
						{...register("concertday", { required: "Choisissez le jour du concert" })}
					>
						<option value="" disabled>Choisir…</option>
						{CONCERT_DAYS.map((day) => (
							<option key={day} value={day}>{day}</option>
						))}
					</select>
					<small role="alert">{errors.concertday?.message ?? serverErrors?.concertday}</small>
				</p>

				{message && <p className={style.error} role="alert">{message}</p>}

				<p className={style.Btn}>
					<button type="submit" className="sd-btn sd-btn--solid" disabled={isSubmitting}>
						{isSubmitting ? "Enregistrement…" : dataToUpdate ? "Enregistrer les modifications" : "Ajouter l'artiste"}
					</button>
					<NavLink to="/admin" className="sd-btn">Annuler</NavLink>
				</p>
			</form>
		</section>
	);
};

export default AdminArtistFormContent;
