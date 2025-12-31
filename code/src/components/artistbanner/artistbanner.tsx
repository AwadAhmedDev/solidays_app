import styles from "./artistbanner.module.css";
import {NavLink} from "react-router"

const ArtistBanner = () => {
    return (
        <div className={styles.artistbanner}>
            <ul className={styles.artistlist}>
                <li>
                    <NavLink to={"/"}>  BIGFLO & OLI</NavLink>
                </li>
                <li>
                     <NavLink to={"/"}>  GIMS </NavLink>
                   </li>
                <li>INO CASABLANCA</li>
                <li>L2B</li>
                <li>LA MANO 1.9</li>
                <li>LA RVFLEUSE</li>
                <li>MOSIMANN</li>
                <li>NICO MORENO</li>
                <li>ORELSAN</li>
                <li>ZARA LARSSON</li>
                <li> & MANY MORE</li>
                </ul>
        </div>
    );
};

export default ArtistBanner;