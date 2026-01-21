import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { Artist } from "../../../../models/artist";
import styles from "./adminHomepage.module.css";
import ApiArtistService from "../../../services/api_artist_service";

const AdminHomepage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();

  const fetchArtists = async () => {
    const response = await new ApiArtistService().selectAll();
    setArtists(response.data ?? []);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet artiste ?")) return;

    const response = await new ApiArtistService().delete({ id });
    if (response.status === 200) {
      fetchArtists(); // rafraîchir la liste après suppression
    } else {
      alert("Impossible de supprimer l'artiste : " + response.message);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Gérer les artistes</h2>

      <div className={styles.actions}>
        <NavLink
          className={`${styles.btn} ${styles.btnAdd}`}
          to="/admin/form"
        >
          Ajouter un artiste
        </NavLink>
      </div>

      <div className={styles.list}>
        {artists.map((artist) => (
          <div key={artist.id} className={styles.card}>
            <p className={styles.cardName}>{artist.name}</p>
            <div className={styles.buttons}>
              <NavLink
                className={`${styles.btn} ${styles.btnEdit}`}
                to={`/admin/form/${artist.id}`}
              >
                Modifier
              </NavLink>
              <button
                className={`${styles.btn} ${styles.btnDelete}`}
                onClick={() => handleDelete(artist.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
        {artists.length === 0 && <p>Aucun artiste pour le moment.</p>}
      </div>
    </section>
  );
};

export default AdminHomepage;