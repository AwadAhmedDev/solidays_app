import { useEffect, useId, useState } from "react";
import type { Artist } from "../../../../models/artist";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import ApiArtistService from "../../../services/api_artist_service";


const AdminArtistFormContent = () => {
    // States;
    const idId = useId();
    const nameId = useId();
    const imageId = useId();
    const descriptionId = useId();
    const youtubeurlId = useId();
    const concertdayId = useId();


    // useNavigate permet de créer une rédirection
    const navigate = useNavigate()

    // Stocker les messages d'erreurs de validation coté server
    const [serverErrors, setServerErrors] = useState<Partial<Artist>>();

    // meessage lié a la soumission du formulaire
    const [message, setMessage] = useState<string>("")

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Artist>();

    // Comportements;
    useEffect(() => {
        // normalizer les données saisie et se baser sur les données testées dans Flashpost pour que données..


    }, [])


    const submitForm = async (data: Artist) => {
        // console.log(data);

        const formData = new FormData();
        formData.set('id', data.id as unknown as string);
        formData.set('name', data.name);
        formData.set('image', data.image[0]);
        formData.set('description', data.description);
        formData.set('youtubeurl', data.youtubeurl as unknown as string);
        formData.set('concertday', data.concertday as unknown as string);
        // console.log(formData);

        const process = await new ApiArtistService().insert(formData)
        // console.log(process);

        if ([200, 201].indexOf(process.status) !== -1) {
            navigate('/admin/products')
        } else if ([400].indexOf(process.status) !== -1) {
            setMessage(process.message as unknown as string)
        }

    }

    return (
        <>


            <h1>AdminFormHome</h1>

            <form encType="multipart/form-data" onSubmit={handleSubmit(submitForm)} >
                {/* name */}
                <div>
                    <label htmlFor={nameId}>Nom :</label>
                    <input type="text" id={nameId} {...register('name', { required: 'Le nom est obligatoire', minLength: { value: 5, message: 'Le nom doit comporter 5 caractères au minimum' }, maxLength: { value: 50, message: 'Le nom doit comporter 50 caractères au maximum' } })} />
                    <small role="alert">{errors.name?.message}</small>
                </div>
                {/* image */}
                <div>
                    <label htmlFor={imageId}>Image :</label>
                    <input type="file" id={imageId} {...register('image', { required: 'Le champs image est obligatoire', maxLength: { value: 150, message: "L'image doit comporter 150 caractères au maximum" } })} />
                    <small>{errors.image?.message}</small>
                </div>
                {/* description */}
                <div>
                    <label htmlFor={descriptionId}>Description :</label>
                    <textarea id={descriptionId} {...register('description', { required: 'Le champs description est obligatoire' })} />
                    <small>{errors.description?.message}</small>
                </div>
                {/* youtubeurl */}
                <div>
                    <label htmlFor={youtubeurlId}>YouTube URL :</label>
                    <input type="text" id={youtubeurlId} {...register('youtubeurl', { required: 'Le champs YouTube URL est obligatoire' })} />
                    <small>{errors.youtubeurl?.message}</small>
                </div>
                {/* concertday */}
                <div>
                    <label htmlFor={concertdayId}>Jour du concert :</label>
                    <input type="date" id={concertdayId} {...register('concertday', { required: 'Le champs jour du concert est obligatoire' })} />
                    <small>{errors.concertday?.message}</small>
                </div>

                <div>
                    <input type="hidden" id={idId} {...register('id')} />
                    <button type="submit">Ajouter un produit</button>
                </div>

            </form>

        </>
    )
}

export default AdminArtistFormContent