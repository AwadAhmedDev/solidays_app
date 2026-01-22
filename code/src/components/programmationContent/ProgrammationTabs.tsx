import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProgrammationTabs.module.css";

type ArtistImage = {
  id: number;
  name: string;
  image: string;
  concertday: string;
};

const artistImages: ArtistImage[] = [
  { id: 1, name: "Bigflo & Oli", image: "/assets/img/programmation/bigfloOli.png", concertday: "Samedi" },
  { id: 2, name: "Gims", image: "/assets/img/programmation/gims.png", concertday: "Vendredi" },
  { id: 3, name: "Ino Casablanca", image: "/assets/img/programmation/inoCasablanca.png", concertday: "Vendredi" },
  { id: 4, name: "L2B", image: "/assets/img/programmation/L2B.png", concertday: "Dimanche" },
  { id: 5, name: "La Mano 1.9", image: "/assets/img/programmation/laMano.png", concertday: "Vendredi" },
  { id: 6, name: "Luiza", image: "/assets/img/programmation/luiza.png", concertday: "Samedi" },
  { id: 7, name: "Mosimann", image: "/assets/img/programmation/mosiman.png", concertday: "Dimanche" },
  { id: 8, name: "Nico Moreno", image: "/assets/img/programmation/nicoMoreno.png", concertday: "Vendredi" },
  { id: 9, name: "Orelsan", image: "/assets/img/programmation/orelsan.png", concertday: "Dimanche" },
  { id: 10, name: "La Rvfleuze", image: "/assets/img/programmation/rvfleuze.png", concertday: "Samedi" },
  { id: 11, name: "Zara Larsson", image: "/assets/img/programmation/zaraLarson.png", concertday: "Samedi" },
];

const tabs = ["Programmation", "Vendredi", "Samedi", "Dimanche"];

const ProgrammationTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("Programmation");

  // Filtrage by ConcertDay
  const filteredArtists =
    activeTab === "Programmation"
      ? artistImages
      : artistImages.filter((a) => a.concertday === activeTab);

  return (
    <div className={styles.container}>

      {/* Onglets */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Grille d’images */}
      <div className={styles.grid}>
        {filteredArtists.map((artist) => (
          <NavLink key={artist.id} to={`/artist/${artist.id}`}>
          <img
             src={artist.image}
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