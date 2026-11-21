import styles from "./artist.banner.module.css"
import { NavLink } from "react-router"
import ApiArtistService from "../../services/artist_api_service";
import { useEffect, useState } from "react";
import type { Artist } from "../../../models/artist";
import ArtistListItem from "../artistListItem/ArtistListItem"

// Bannière des artistes : la photo de fond change au survol de chaque nom.
const ArtistBanner = () => {

    const [artists, setArtists] = useState<Artist[]>([])
    const [error, setError] = useState(false)

    // photo affichée par défaut : Orelsan
    const [bg, setBg] = useState<string>("orelsan.webp");

    useEffect(() => {
        new ApiArtistService().selectAll().then((response) => {
            if (response.status === 200 && response.data) setArtists(response.data);
            else setError(true);
        });
    }, []);

    return (
        <section className={styles.artistbanner} aria-labelledby="artistes-titre">
            <img key={bg} className={styles.bg} src={`/img/programmation/${bg}`} alt="" loading="lazy" />

            <div className={styles.inner}>
                <h2 id="artistes-titre" className={styles.kicker}>À l'affiche</h2>

                {error && <p className={styles.error}>La liste des artistes est momentanément indisponible.</p>}

                <ul className={styles.artistlist}>
                    {artists.map((artist) => (
                        <li key={artist.id}>
                            <ArtistListItem artist={artist} setBg={setBg} />
                        </li>
                    ))}
                </ul>

                <NavLink className={styles.more} to="/programmation">
                    Et bien d'autres →
                </NavLink>
            </div>
        </section>
    );
};

export default ArtistBanner;
