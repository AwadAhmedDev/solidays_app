import { NavLink } from "react-router"
import styles from "./ArtistListItem.module.css"
import type { ArtistListItemProps } from "../../models/props/ArtistListItemProps"


const ArtistListItem = ({ artist, setBg }: ArtistListItemProps) => {
    return (
        <NavLink className={styles.link}
            to={`/artist/${artist.id}`}
            onMouseEnter={() => setBg(artist.image)}
            onMouseLeave={() => setBg(artist.name === "ORELSAN" ? artist.image : artist.image)}
            onTouchStart={() => setBg(artist.image)} // mobile
        > {artist.name} </NavLink>
    )
}

export default ArtistListItem