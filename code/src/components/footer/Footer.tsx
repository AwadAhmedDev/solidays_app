import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGradient}>
        <div className={styles.footerTop}>
          <Link to="/" className={styles.footerLogo} aria-label="Solidays – accueil">
            <img src="/assets/img/logo-solidays.png" alt="Solidays" width="448" height="144" loading="lazy" />
          </Link>

          <nav className={styles.footerNav} aria-label="Pied de page">
            <Link to="/festival">Festival</Link>
            <Link to="/programmation">Programmation</Link>
            <Link to="/billetterie">Billetterie</Link>
            <Link to="/mention_legale">Mentions légales</Link>
            <Link to="/admin">Espace admin</Link>
          </nav>
        </div>

        <p className={styles.footerText}>
          Chaque année à l'approche de l'été, le festival célèbre la solidarité en musique.
          Concerts, talks, expositions et associations se succèdent pour le plaisir de tous.
        </p>

        <div className={styles.credits}>
          <p>
            <strong>Projet de formation</strong> — reproduction du site{" "}
            <a href="https://www.solidays.org" target="_blank" rel="noopener noreferrer">solidays.org</a>{" "}
            réalisée en équipe de 3 (Simplon, développeur web et web mobile), sans lien officiel avec le festival.
          </p>
          <p>
            React · TypeScript · Express · MySQL — Développé par{" "}
            <a href="https://github.com/AwadRoubahAhmed" target="_blank" rel="noopener noreferrer">Awad</a>,{" "}
            <a href="https://github.com/manonjarzabeck" target="_blank" rel="noopener noreferrer">Manon</a> et{" "}
            <a href="https://github.com/prativa-k" target="_blank" rel="noopener noreferrer">Prativa</a>.
          </p>
        </div>
      </div>
    </footer>
  )
}
