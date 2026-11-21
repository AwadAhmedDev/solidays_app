import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import type { Artist } from "../../../models/artist";
import ApiArtistService from "../../services/artist_api_service";
import usePageMeta from "../../hooks/usePageMeta";
import styles from "../artist/artist.module.css";

type State = { status: "loading" } | { status: "ok"; artist: Artist } | { status: "notfound" } | { status: "error" };

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!id) return;
    new ApiArtistService().selectOne(Number(id)).then((res) => {
      if (res.status === 200 && res.data) setState({ status: "ok", artist: res.data });
      else if (res.status === 404 || res.status === 400) setState({ status: "notfound" });
      else setState({ status: "error" });
    });
  }, [id]);

  const artist = state.status === "ok" ? state.artist : null;
  usePageMeta(artist?.name ?? (state.status === "notfound" ? "Artiste introuvable" : "Artiste"), artist?.description.slice(0, 155));

  const back = (
    <NavLink to="/programmation" className={styles.back}>
      ← Toute la programmation
    </NavLink>
  );

  if (state.status === "loading") return <p className="sd-status">Chargement…</p>;
  if (state.status !== "ok" || !artist) {
    return (
      <section className="sd-status">
        <h1 className="sd-section-title">{state.status === "notfound" ? "Artiste introuvable" : "Oups"}</h1>
        <p style={{ margin: "16px 0 28px" }}>
          {state.status === "notfound"
            ? "Cet artiste ne fait pas (ou plus) partie de la programmation."
            : "La fiche est momentanément indisponible. Réessayez dans un instant."}
        </p>
        {back}
      </section>
    );
  }

  return (
    <article className={styles.artistPage}>
      {/* HERO */}
      <div className={styles.hero}>
        <img className={styles.Img} src={`/img/programmation/${artist.image}`} alt={artist.name} />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        {back}
        <h1 className={styles.artistName}>{artist.name}</h1>
        <p className={styles.concertDay}>{artist.concertday} · Paris-Longchamp</p>

        <p className={styles.description}>{artist.description}</p>

        <a href={artist.youtubeurl} target="_blank" rel="noopener noreferrer" className="sd-btn sd-btn--solid">
          Écouter sur YouTube
        </a>
      </div>
    </article>
  );
};

export default ArtistPage;
