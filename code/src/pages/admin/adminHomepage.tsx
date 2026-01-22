'use client';

import { useEffect, useState } from "react";
import ArtistApiService from "../../services/artist_api_service";
import styles from "./adminHomepage.module.css";
import { NavLink } from "react-router";
import type { Artist } from "../../../models/artist";

const AdminHomepage = () => {
  const [artist, setArtist] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      const res = await new ArtistApiService().selectAll();
      setArtist(res.data ?? []); 
    };
	  fetchArtist();
	  

  }, []);
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Gérer les artistes</h2>
			<NavLink
				className={`${styles.btn} ${styles.btnAdd}`}
				to={"/admin/artist-form"}
			>
				Ajouter
			</NavLink>

			<div className={styles.artistList}>
				{artist?.map((item) => {
					return (
						<div className={styles.artistCard} key={item.id}>
							<p className={styles.artistCardName}>{item.name}</p>
							<div className={styles.buttons}>
								<NavLink
									className={`${styles.btn} ${styles.btnEdit}`}
									to={`/admin/artist-form/${item.id}`}
								>
									Modifier
								</NavLink>
								<NavLink
									className={`${styles.btn} ${styles.btnDelete}`}
									to={`/admin/artist-form-delete/${item.id}`}
								>
									Supprimer
								</NavLink>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default AdminHomepage;
