import styles from './Navbar.module.css'
import { NavLink, useLocation } from 'react-router'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

import { useEffect, useState } from 'react'

// Liens du menu (repris de solidays.org)
const LINKS = [
  { to: "/festival", label: "Festival" },
  { to: "/programmation", label: "Programmation" },
  { to: "/billetterie", label: "Billetterie" },
]

export default function Navbar() {
  // States;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Comportements;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Le menu mobile se referme quand on change de page
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setIsMenuOpen(false);
  }

  // Échap ferme le menu mobile
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

  //Affichage;
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo} aria-label="Solidays – accueil">
          <img src="/assets/img/logo-solidays.png" alt="Solidays" className={styles.logoSolidays} width="448" height="144" />
          <span className={styles.bare} aria-hidden="true" />
          <img src="/assets/img/Logo_Solidaritesida2.png" alt="Solidarité Sida" className={styles.logoSolidays2} width="285" height="200" />
        </NavLink>

        <nav className={styles.navigation} aria-label="Menu principal">
          <span className={styles.dates}>26-28 juin 26</span>
          <ul className={styles.navLinks}>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          className={styles.hamburgerMenu}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <IoCloseSharp size={28} /> : <GiHamburgerMenu size={26} />}
        </button>
      </div>

      {/* menu mobile */}
      {isMenuOpen && (
        <nav id="menu-mobile" className={styles.mobileMenu} aria-label="Menu mobile">
          <ul>
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkClass}>{link.label}</NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/mention_legale" className={linkClass}>Mentions légales</NavLink>
            </li>
          </ul>
          <p className={styles.mobileDates}>26-28 juin 26 · Paris-Longchamp</p>
        </nav>
      )}
    </header>
  );
};
