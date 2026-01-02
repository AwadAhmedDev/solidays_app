import styles from "./Hero.module.css"
import heroImage from "../../assets/heroSection.png"

export default function Hero() {
  return (
      <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>POUR NOEL </h1>
                <p className={styles.heroSubtitle}>Offrez (vous) <br /> UN PASS <br />SOLIDAYS</p>
                <button className={styles.heroButton}>Get Started</button>
              </div>
              <div className={styles.heroImage}>
                {/* Image or graphic can be placed here */}
                <img src={heroImage} alt="hero Image" />
              </div>
        </div>
    </section>
  )
}
