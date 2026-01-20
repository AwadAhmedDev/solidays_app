import styles from "./artistbanner.module.css"
import { NavLink } from "react-router"

import { useState } from "react"


  

const ArtistBanner = () => {
    // default background = orelsan
    

    return (
        <div className={styles.artistbanner}>
         
              <ul>
                <li>
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
                  </li>
                 <li>
                    <NavLink className={styles.link}  to="/concert"> & MANY MORE </NavLink>
                  </li> 
                </ul>
            </div>
         
    );
};

export default ArtistBanner;