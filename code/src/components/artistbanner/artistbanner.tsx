import styles from "./artistbanner.module.css"
import {NavLink} from "react-router"

const ArtistBanner = () => {
    return (
        <div className={styles.artistbanner}>
            <ul className={styles.artistlist}>
                <li>
                    <NavLink to="/concert">  BIGFLO & OLI</NavLink>
                </li>
                <li>
                     <NavLink to="/concert">  GIMS </NavLink>
                   </li>
                <li>
                <NavLink to="/concert">  INO CASABLANCA </NavLink>
                   
                </li>
                <li>
                    <NavLink to="/concert"> L2B </NavLink>
                </li>
                <li>
                    <NavLink to="/concert"> LA MANO 1.9 </NavLink>
                </li>
                <li>
                    <NavLink to="/concert"> LA RVFLEUSE</NavLink>
                </li>
                <li>
                    <NavLink to="/concert"> MOSIMANN </NavLink>
                    
                </li>
                <li>
                    <NavLink to="/concert"> NICO MORENO </NavLink>
                    </li>
                <li>
                    <NavLink to="/concert"> ORELSAN </NavLink>
                </li>
                <li>
                    <NavLink to="/concert"> ZARA LARSSON </NavLink>
                </li>
                <li>
                    <NavLink to="/concert"> & MANY MORE </NavLink>
                  </li>
                </ul>
        </div>
    );
};

export default ArtistBanner;