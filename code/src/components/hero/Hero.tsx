import styles from "./Hero.module.css"
import { NavLink } from "react-router-dom"

export default function Hero() {
  return (
      <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>POUR NOEL </h1>
          <span className={styles.heroSubtitle}>Offrez (vous) <br /> UN PASS <br />SOLIDAYS</span>
          {/* <span>
            Solidays c'est le festival. <br />En achetant un pass Solidays, <br /> vous aurez accès à tous les événements du festival.
          </span> */}

                <div className={styles.heroButtonContainer}>
                   <NavLink to="/billetterie" className={styles.heroButton}>
                   Get Started
                   </NavLink>
                </div>
              </div>
              <div className={styles.heroImage}>
                {/* Image or graphic can be placed here */}
                <img src="../../../assets/img/heroSection.png" alt="hero Image" />
              </div>
        </div>
    </section>
  )
}
