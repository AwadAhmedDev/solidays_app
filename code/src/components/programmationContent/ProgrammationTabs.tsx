<<<<<<< HEAD
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
=======
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
>>>>>>> refs/remotes/origin/master
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
<<<<<<< HEAD
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
=======
            {tab}
>>>>>>> refs/remotes/origin/master
          </button>
        ))}
      </div>

<<<<<<< HEAD
      {/* Grille d’images */}
      <div className={styles.grid}>
        {filteredArtists.map((artist) => (
          <NavLink key={artist.id} to={`/artist/${artist.id}`}>
          <img
             src={artist.image}
             alt={artist.name}
             className={styles.artistImage}
/>
=======
      {/* Grid */}
      <div className={styles.grid}>
        {filteredArtists.map((artist) => (
          <NavLink key={artist.id} to={`/artist/${artist.id}`}>
            <img
              src={`/img/programmation/${artist.image}`}
              alt={artist.name}
              className={styles.artistImage}
            />
>>>>>>> refs/remotes/origin/master
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProgrammationTabs;