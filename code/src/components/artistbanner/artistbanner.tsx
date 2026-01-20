import styles from "./artistbanner.module.css"
import { NavLink } from "react-router"
import bigflo from "../../assets/bigflo_oli.jpg"
import gims from "../../assets/gims.jpg"
import l2b from "../../assets/l2b.jpg"
import inocasablanca from "../../assets/inocasablanca.jpg"
import lamano from "../../assets/lamano.jpg"
import mosimann from "../../assets/mosimann.jpg"
import nicomoreno from "../../assets/nicomoreno.jpg"
import orelsan from "../../assets/orelsan.jpg"
import rvfleuse from "../../assets/rvfleuse.jpg"
import zaralarsson from "../../assets/zaralarsson.jpg"
import { useState } from "react"


  

const ArtistBanner = () => {
    // default background = orelsan
    const [bg, setBg] = useState(orelsan);

    return (
        <div className={styles.artistbanner}
            style={{backgroundImage:`url(${bg})`}}>
         
            <ul className={styles.artistlist}>
                {artists.map((artist) => (
                      <li key={artist.name}>
                        <NavLink className={styles.link}
                            to="/concert"
                            onMouseEnter={() => setBg(artist.image)}
                            onMouseLeave={() => setBg(orelsan)}
                            onTouchStart={() => setBg(artist.image)} // mobile
                           > {artist.name} </NavLink>
                  </li>
                ))}
              
                {/* <li>
                     <NavLink className={styles.link}  to="/concert">  GIMS </NavLink>
                   </li>
                <li>
                <NavLink className={styles.link}  to="/concert">  INO CASABLANCA </NavLink>
                   
                </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> L2B </NavLink>
                </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> LA MANO 1.9 </NavLink>
                </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> LA RVFLEUSE</NavLink>
                </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> MOSIMANN </NavLink>
                    
                </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> NICO MORENO </NavLink>
                    </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> ORELSAN </NavLink>
                </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> ZARA LARSSON </NavLink>
                </li>
                <li>
                    <NavLink className={styles.link}  to="/concert"> & MANY MORE </NavLink>
                  </li> */}
                 <li>
                    <NavLink className={styles.link}  to="/concert"> & MANY MORE </NavLink>
                  </li> 
                </ul>
            </div>
         
    );
};

export default ArtistBanner;