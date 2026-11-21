import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ApiArtistService from "../../services/artist_api_service";
import type { Artist } from "../../../models/artist";
import styles from "./ProgrammationTabs.module.css";

// Ordre du week-end, quel que soit l'ordre en base
const DAY_ORDER = ["Vendredi", "Samedi", "Dimanche"];
const ALL = "Tous les artistes";

const ProgrammationTabs = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [activeTab, setActiveTab] = useState<string>(ALL);

  useEffect(() => {
    new ApiArtistService().selectAll().then((response) => {
      if (response.status === 200 && response.data) {
        setArtists(response.data);
        setStatus("ok");
      } else {
        setStatus("error");
      }
    });
  }, []);

  // Jours présents en base, dans l'ordre du week-end
  const uniqueDays = Array.from(new Set(artists.map((a) => a.concertday).filter(Boolean))).sort(
    (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b),
  );

  const tabs = [ALL, ...uniqueDays];

  // Filtrage en fonction de tab
  const filteredArtists = activeTab === ALL ? artists : artists.filter((a) => a.concertday === activeTab);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="sd-section-title">Programmation</h1>
        <p className={styles.lead}>26, 27 et 28 juin 2026 · Hippodrome de Paris-Longchamp</p>
      </header>

      {status === "loading" && <p className="sd-status">Chargement de la programmation…</p>}
      {status === "error" && (
        <p className="sd-status sd-status--error">La programmation est momentanément indisponible. Réessayez dans un instant.</p>
      )}

      {status === "ok" && (
        <>
          <div className={styles.tabs} role="group" aria-label="Filtrer par jour">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <ul className={styles.grid}>
            {filteredArtists.map((artist) => (
              <li key={artist.id}>
                <NavLink to={`/artist/${artist.id}`} className={styles.card}>
                  <img
                    src={`/img/programmation/${artist.image}`}
                    alt=""
                    className={styles.artistImage}
                    loading="lazy"
                  />
                  <span className={styles.name}>{artist.name}</span>
                  <span className={styles.day}>{artist.concertday}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProgrammationTabs;
