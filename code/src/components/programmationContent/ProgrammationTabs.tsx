import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ApiArtistService from "../../services/artist_api_service";
import type { Artist } from "../../../models/artist";
import styles from "./ProgrammationTabs.module.css";

const ProgrammationTabs = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Programmation");

  useEffect(() => {
    const fetchArtists = async () => {
      const api = new ApiArtistService();
      const response = await api.selectAll();
      if (response.data) {
        setArtists(response.data);
      }
    };
    fetchArtists();
  }, []);

  // Récupérer le concertday depuis la DB
  const uniqueDays = Array.from(
    new Set(artists.map((a) => a.concertday).filter(Boolean))
  );

  const tabs = ["Programmation", ...uniqueDays];

  // Filtrage en fonction de tab
  const filteredArtists =
    activeTab === "Programmation"
      ? artists
      : artists.filter((a) => a.concertday === activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filteredArtists.map((artist) => (
          <NavLink key={artist.id} to={`/artist/${artist.id}`}>
            <img
              src={`/img/programmation/${artist.image}`}
              alt={artist.name}
              className={styles.artistImage}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProgrammationTabs;