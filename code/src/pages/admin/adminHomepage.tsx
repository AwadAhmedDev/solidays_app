import { useEffect, useState } from "react";
import ArtistApiService from "../../services/artist_api_service";
import AuthApiService from "../../services/auth_api_service";
import styles from "./adminHomepage.module.css";
import { NavLink, useNavigate } from "react-router";
import type { Artist } from "../../../models/artist";
import usePageMeta from "../../hooks/usePageMeta";

const AdminHomepage = () => {
	usePageMeta("Administration – artistes");
	const [artist, setArtist] = useState<Artist[]>([]);
	const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
	const navigate = useNavigate();

	useEffect(() => {
		new ArtistApiService().selectAll().then((res) => {
			setArtist(res.data ?? []);
			setStatus(res.status === 200 ? "ok" : "error");
		});
	}, []);

	const logout = async () => {
		await new AuthApiService().logout();
		navigate("/admin/login");
	};

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1 className={styles.title}>Gérer les artistes</h1>
					<p className={styles.count}>{status === "ok" && `${artist.length} artiste${artist.length > 1 ? "s" : ""} à l'affiche`}</p>
				</div>
				<div className={styles.actions}>
					<NavLink className="sd-btn sd-btn--solid" to={"/admin/artist-form"}>
						+ Ajouter un artiste
					</NavLink>
					<button type="button" className={`sd-btn ${styles.logout}`} onClick={logout}>
						Se déconnecter
					</button>
				</div>
			</header>

			{status === "loading" && <p className="sd-status">Chargement…</p>}
			{status === "error" && <p className="sd-status sd-status--error">Impossible de charger les artistes.</p>}
			{status === "ok" && artist.length === 0 && <p className="sd-status">Aucun artiste pour le moment.</p>}

			<ul className={styles.artistList}>
				{artist.map((item) => (
					<li className={styles.artistCard} key={item.id}>
						<img src={`/img/programmation/${item.image}`} alt="" className={styles.thumb} loading="lazy" />
						<div className={styles.info}>
							<p className={styles.artistCardName}>{item.name}</p>
							<p className={styles.day}>{item.concertday}</p>
						</div>
						<div className={styles.buttons}>
							<NavLink className={`${styles.btn} ${styles.btnEdit}`} to={`/admin/artist-form/${item.id}`}>
								Modifier<span className="sd-sr-only"> {item.name}</span>
							</NavLink>
							<NavLink className={`${styles.btn} ${styles.btnDelete}`} to={`/admin/artist-form-delete/${item.id}`}>
								Supprimer<span className="sd-sr-only"> {item.name}</span>
							</NavLink>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};

export default AdminHomepage;
