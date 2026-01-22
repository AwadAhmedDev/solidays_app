"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { ZodIssue } from "zod/v3";
import type { AdminArtistFormContentProps } from "../../models/props/admin/admin_artist_form_content_props";
import type { Artist } from "../../../models/artist";
import ArtistApiService from "../../services/artist_api_service";
import style from "./admin_artist_form_content.module.css"


const AdminArtistFormContent = ({
	validator,
	dataToUpdate,
}: AdminArtistFormContentProps) => {
	
    const idId = useId();
    const nameId = useId();
	const descriptionId = useId();
    const imageId = useId();
    const youtubeId = useId();
    const concertId = useId();

	const [serverErrors, setServerErrors] = useState<Partial<Artist>>();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Partial<Artist>>();

	// préremplir le formulaire avant l'affichage du composant
	useEffect(() => {
		if (dataToUpdate) {

			const normalizedData = { ...dataToUpdate };
			reset(normalizedData);
		}
	}, [dataToUpdate, reset]);

	// message lié à la soumission du formulaire
	const [message, setMessage] = useState<string>("");

	// useNavigate permet de créer une redirection
	const navigate = useNavigate();

	// soumission du formulaire
	// data stocke la saisie du formulaire
	const submitForm = async (data: Partial<Artist>) => {
		// normaliser les données saisies : se baser sur les données testées dans flashpost pour que les données marchent
		const normalizedData = { ...data, image: (data.image as string)[0] };

		// validation de la saisie avec validateur côté serveur
		const validation = await validator(normalizedData);

		// si la validation échoue
		if (validation instanceof Error) {
			// stocker les messages d'erreur
			let errors = {};

			//récupérer les messages d'erreur
			(JSON.parse(validation.message) as ZodIssue[]).map((item) => {
				errors = { ...errors, [item.path.shift() as string]: item.message };
				return errors;
			});

			// définir l'état affichant les messages d'erreur côté serveur
			setServerErrors(errors);

			return;
		}

		// si la validation réussie
		// si le formulaire contient un champ de fichier : envoyer vers l'API un objet de type formData
		const formData = new FormData();

		formData.set("id", normalizedData.id as unknown as string);
		formData.set("name", normalizedData.name as unknown as string);
		formData.set("image", normalizedData.image as unknown as string);
		formData.set("description", normalizedData.description as unknown as string);
		formData.set("youtubeurl", normalizedData.youtubeurl as unknown as string);
		formData.set("concertday", normalizedData.concertday as unknown as string);
		

		// requête HTTP vers l'API
		const process = dataToUpdate
			? await new ArtistApiService().update(formData)
			: await new ArtistApiService().insert(formData);

		// si la requête HTTP a réussie
		if ([200, 201].indexOf(process.status) !== -1) {
			// redirection
			navigate("/admin");
		}

		// si la requête HTTP échoue
		else if ([400].indexOf(process.status) !== -1) {
			// afficher un message
			setMessage(process.data as unknown as string);
		}
	};

	return (
		<section className={style.Dataform}>
			<h2 className={style.title}>Gérer les artistes</h2>
			
			<form encType="multipart/form-data" onSubmit={handleSubmit(submitForm)}>
				<p className={style.Formulaire}>
					<label htmlFor={nameId}>Nom :</label>
					<input
						type="text"
						id={nameId}
						{...register("name", {
							required: "Le nom est obligatoire",
							minLength: {
								value: 2,
								message: "Un nom doit comporter, au minimum, 2 caractères",
							},
							maxLength: {
								value: 20,
								message: "Un nom doit comporter, au maximum, 20 caractères",
							},
						})}
					/>
					<small role="alert">
						{" "}
						{errors.name?.message ?? serverErrors?.name}
					</small>
				</p>
				<p className={style.Formulaire}>
					<label htmlFor={imageId}>Image :</label>
					<input
						type="file"
						id={imageId}
						{...register(
							"image",
							dataToUpdate
								? {}
								: {
										required: "L'image est obligatoire",
									},
						)}
					/>
					
					<small role="alert">
						{" "}
						{errors.image?.message ?? serverErrors?.image}
					</small>
				</p>
				<p className={style.Formulaire}>
					<label htmlFor={descriptionId}>Description :</label>
					<textarea
						id={descriptionId}
						{...register("description", {
							required: "La description est obligatoire",
							minLength: {
								value: 20,
								message:
									"La description doit comporter, au minimum, 20 caractères",
							},
							maxLength: {
								value: 500,
								message:
									"La description doit comporter, au maximum, 500 caractères",
							},
						})}
					/>
					
					<small role="alert">
						{" "}
						{errors.description?.message ?? serverErrors?.description}
					</small>
				</p>
				<p className={style.Formulaire}>
					<label htmlFor={youtubeId}>Lien Youtube :</label>
					<input
						type="text"
						id={youtubeId}
						{...register("youtubeurl", {
							required: "Le Youtube est obligatoire",
							minLength: {
								value: 20,
								message: "Un lien doit comporter, au minimum, 20 caractères",
							},
							maxLength: {
								value: 50,
								message: "Un lien doit comporter, au maximum, 100 caractères",
							},
						})}
					/>
					<small role="alert">
						{" "}
						{errors.youtubeurl?.message ?? serverErrors?.youtubeurl}
					</small>
				</p>
				<p className={style.Formulaire}>
					<label htmlFor={concertId}>Concert day :</label>
					<input
						type="text"
						id={concertId}
						{...register("concertday", {
							required: "Le jour du concert est obligatoire",
							minLength: {
								value: 5,
								message: "Un jour doit comporter, au minimum, 5 caractères",
							},
							maxLength: {
								value: 10,
								message: "Un jour doit comporter, au maximum, 10 caractères",
							},
						})}
					/>
					<small role="alert">
						{" "}
						{errors.concertday?.message ?? serverErrors?.concertday}
					</small>
				</p>

				<p className={style.Btn}>
					<input type="hidden" id={idId} {...register("id")} />
					<button type="submit">Soumettre</button>
				</p>
			</form>
		</section>
	);
};

export default AdminArtistFormContent;
