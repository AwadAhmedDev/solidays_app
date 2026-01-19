import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer
      className={styles.footer}>
      <div className={styles.footerGradient}>
        <div className={styles.footerTop}>
          <nav className={styles.footerNav}>
            <NavLink to="#">Faire un don</NavLink>
            <NavLink to="#">Médias</NavLink>
            <NavLink to="#">Archives</NavLink>
            <NavLink to="#">Contact</NavLink>
            <NavLink to="../../pages/mention_legale">Mentions légales</NavLink>
            <NavLink to="#">Données personnelles & cookies</NavLink>
          </nav>

          <div className={styles.footerSocials}>
            <NavLink to="#" aria-label="Instagram">IG</NavLink>
            <NavLink to="#" aria-label="TikTok">TT</NavLink>
            <NavLink to="#" aria-label="YouTube">YT</NavLink>
            <NavLink to="#" aria-label="Facebook">FB</NavLink>
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
