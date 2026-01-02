import styles from "./Hero.module.css"
import heroImage from "../../assets/heroSection.png"
import { NavLink } from "react-router-dom"

export default function Hero() {
  return (
      <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>POUR NOEL </h1>
                <p className={styles.heroSubtitle}>Offrez (vous) <br /> UN PASS <br />SOLIDAYS</p>

                <div className={styles.heroButtonContainer}>
                   <NavLink to="/" className={styles.heroButton}>
                   Get Started
                   </NavLink>
                </div>
              </div>
              <div className={styles.heroImage}>
                {/* Image or graphic can be placed here */}
                <img src={heroImage} alt="hero Image" />
              </div>
        </div>
    </section>
  )
}
