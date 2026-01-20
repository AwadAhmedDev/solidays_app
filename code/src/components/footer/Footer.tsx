import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer
      className={styles.footer}>
      <div className={styles.footerGradient}>
        <div className={styles.footerTop}> 
          <nav className={styles.footerNav}>
            <Link to="#">Faire un don</Link>
            <Link to="#">Médias</Link>
            <Link to="#">Archives</Link>
            <Link to="#">Contact</Link>
            <Link to="../../pages/mention_legale">Mentions légales</Link>
            <Link to="#">Données personnelles & cookies</Link>
          </nav>

          <div className={styles.footerSocials}>
            <Link to="#" aria-label="Instagram">IG</Link>
            <Link to="#" aria-label="TikTok">TT</Link>
            <Link to="#" aria-label="YouTube">YT</Link>
            <Link to="#" aria-label="Facebook">FB</Link>
          </div>
        </div>

        <div className={styles.footerNewsletter}>
          <h3>Newsletter</h3>
          <form>
            <input type="email" placeholder="votre@email.com" />
            <button className={styles.footerNewsletterButton} type="submit">OK</button>
          </form>
        </div>

        <p className={styles.footerText}>
          Chaque année à l’approche de l’été, le festival célèbre la solidarité
          en musique. Concerts, talks, expositions et associations se succèdent
          pour le plaisir de tous.
        </p>
      </div>
    </footer>
  )
}
