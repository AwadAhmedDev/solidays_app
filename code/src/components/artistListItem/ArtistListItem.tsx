import { NavLink } from "react-router";
import styles from "./ArtistListItem.module.css";
import type { ArtistListItemProps } from "../../models/props/artist_list_item_props";

// Nom d'artiste de la bannière : au survol (ou au focus clavier), sa photo passe en fond.
const ArtistListItem = ({ artist, setBg }: ArtistListItemProps) => {
  const show = () => setBg(artist.image);

  return (
    <NavLink
      className={styles.link}
      to={`/artist/${artist.id}`}
      onMouseEnter={show}
      onFocus={show}
      onTouchStart={show} // mobile
    >
      {artist.name}
    </NavLink>
  );
};

export default ArtistListItem;
