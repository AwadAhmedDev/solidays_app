import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Artist } from "../../../models/artist";
import styles from "../artist/artist.module.css"
;

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/artist/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setArtist(json.data ?? null);
      });
  }, [id]);

  if (!artist) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.artistPage}>
    {/* HERO */}
    <div
        className={styles.hero} >
        
        <img className={styles.Img} src={`/assets/img/programmation/${artist.image}`} alt="" />
      <h2 className={styles.artistName}>{artist.name}</h2>
    </div>

    {/* CONTENT */}
    <div className={styles.content}>
      {/* LEFT */}
      <div className={styles.left}>
       
    
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <span className={styles.genre}>RAP — FRANCE</span>

        <p className={styles.description}>{artist.description}</p>

        <p className={styles.concertDay}>
          <strong>Concert day:</strong> {artist.concertday}
        </p>

        <a
          href={artist.youtubeurl}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
          
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  </div>
  );
};
console.log("artist.image:");

export default ArtistPage;

