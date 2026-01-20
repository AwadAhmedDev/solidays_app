
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">
          <img src="/assets/img/logo-solidays.png" alt="Solidays" className={styles.logoSolidays} />
        </NavLink>
        <NavLink to="/">
          <img src="/assets/img/bare.jpeg" alt="Bare" className={styles.bare} />
        </NavLink>
        <NavLink to="/">
          <img src="/assets/img/Logo_Solidaritesida2.png" alt="Solidarité Sida" className={styles.logoSolidays2} />
        </NavLink>
      </div>

      <div className={styles.navContainer}>
        <nav>
          <ul className={isMenuOpen ? styles.navActive : styles.navLinks}>
            <li>
              <NavLink to="/festival" className={({ isActive }) => isActive ? styles.activeLink : undefined}>
                Festival
              </NavLink>
            </li>
            <li>
              <NavLink to="/programmation" className={({ isActive }) => isActive ? styles.activeLink : undefined}>
                Programmation
              </NavLink>
            </li>
            <li>
              <NavLink to="/billetterie" className={({ isActive }) => isActive ? styles.activeLink : undefined}>
                Billetterie
              </NavLink>
            </li>
            <li>
              <NavLink to="/mention_legale" className={({ isActive }) => isActive ? styles.activeLink : undefined}>
                Mentions Légales
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className={({ isActive }) => isActive ? styles.activeLink : undefined}>
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>

        <button onClick={toggleMenu} className={styles.hamburgerMenu}>
          {isMenuOpen ? <IoCloseSharp size={25} /> : <GiHamburgerMenu size={25} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul>
            <li><NavLink to="/festival">Festival</NavLink></li>
            <li><NavLink to="/programmation">Programmation</NavLink></li>
            <li><NavLink to="/billetterie">Billetterie</NavLink></li>
            <li><NavLink to="/mention_legale">Mentions Légales</NavLink></li>
          </ul>
        </div>
      )}
    </header>
  )
}