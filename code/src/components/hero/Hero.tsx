import styles from "./Hero.module.css"
import { NavLink } from "react-router-dom"

export default function Hero() {
  return (
    <section className={styles.heroSection} aria-labelledby="hero-title">
      <img
        className={styles.heroImage}
        src="/assets/img/heroSection.webp"
        alt=""
        width="1528"
        height="695"
        fetchPriority="high"
      />
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>26-28 juin 2026 · Paris-Longchamp</p>
        <h1 id="hero-title" className={styles.heroTitle}>Pour Noël</h1>
        <p className={styles.heroSubtitle}>
          Offrez(-vous) <strong>un pass Solidays</strong>
        </p>
        <p className={styles.heroNote}>25 000 pass 3 jours à partir de 39 €</p>

        <div className={styles.heroButtonContainer}>
          <NavLink to="/billetterie" className="sd-btn sd-btn--solid">
            Je prends mon pass
          </NavLink>
          <NavLink to="/programmation" className={`sd-btn ${styles.heroGhost}`}>
            La programmation
          </NavLink>
        </div>
      </div>
    </section>
  )
}
