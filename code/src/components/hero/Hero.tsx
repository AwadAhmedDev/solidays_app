import styles from './Hero.module.css';
import heroImage from "../../assets/heroSection.png"
// import { FaFacebookF } from "react-icons/fa";
// import { FaMusic } from "react-icons/fa";



export default function Hero() {
  return (
      <section className={styles.hero}>
      {/* TEXTE */}
      <div className={styles.heroLeft}>
        <span className="tag">POUR NOËL</span>

        <h1 className="title">
          OFFREZ <span>(VOUS)</span>
          <br />
          <strong>UN PASS</strong>
        </h1>

        <p className="subtitle">SOLIDAYS</p>
      </div>

      {/* IMAGE */}
      {/* <div className={styles.heroRight}>
        <img src={heroImage} alt="Solidays artwork" />
      </div> */}

      {/* SOCIALS */}
      {/* <div className={styles.socials}>
        <span>📷</span>
        <span>🎵</span>
        <span>▶</span>
        <span>f</span>
      </div> */}
    </section>
  );
}
