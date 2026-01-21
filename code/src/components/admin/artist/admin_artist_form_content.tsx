"use client"; 

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { Artist } from "../../../../models/artist";
import styles from "./adminArtistFomContent.module.css";
import ApiArtistService from "../../../services/api_artist_service";

const AdminArtistFormContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [artistData, setArtistData] = useState<Artist | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Artist & { image?: FileList }>();

  // Charger l'artiste si on est en mode modification
  useEffect(() => {
    if (!id) return;

    const fetchArtist = async () => {
      const response = await new ApiArtistService().selectOne(Number(id));
      if (response.data) {
        setArtistData(response.data);
        // Pré-remplir le formulaire
        reset({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          youtubeurl: response.data.youtubeurl,
          concertday: response.data.concertday,
          // image ne peut pas être pré-remplie pour type file
        });
      }
    };
    fetchArtist();
  }, [id, reset]);

  const submitForm = async (data: Artist & { image?: FileList }) => {
    const formData = new FormData();

    if (data.id) formData.set("id", data.id.toString());
    formData.set("name", data.name);
    formData.set("description", data.description);
    formData.set("youtubeurl", data.youtubeurl ?? "");
    formData.set("concertday", data.concertday ?? "");
    
    if (data.image && data.image.length > 0) {
      formData.set("image", data.image[0]);
    }

    const api = new ApiArtistService();
    let response;

    if (id) {
      response = await api.update(formData);
    } else {
      response = await api.insert(formData);
    }

    if ([200, 201].includes(response.status)) {
      navigate("/admin");
    } else {
      alert("Erreur : " + response.message);
    }
  };

  return (
    <section className={styles.container}>
      <h2>{id ? "Modifier un artiste" : "Ajouter un artiste"}</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit(submitForm)}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            {...register("name", { required: "Le nom est obligatoire" })}
          />
          <small>{errors.name?.message}</small>
        </div>

        <div>
          <label>Image :</label>
          <input
            type="file"
            {...register("image", { required: !id && "L'image est obligatoire" })}
          />
          <small>{errors.image?.message}</small>
        </div>

        <div>
          <label>Description :</label>
          <textarea
            {...register("description", { required: "La description est obligatoire" })}
          />
          <small>{errors.description?.message}</small>
        </div>

        <div>
          <label>YouTube URL :</label>
          <input
            type="text"
            {...register("youtubeurl")}
          />
        </div>

        <div>
          <label>Concert Day :</label>
          <input
            type="text"
            {...register("concertday")}
          />
        </div>

        <div>
          <button type="submit">{id ? "Modifier" : "Ajouter"}</button>
        </div>
      </form>
    </section>
  );
};

export default AdminArtistFormContent;