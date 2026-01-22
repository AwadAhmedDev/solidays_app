import styles from './Navbar.module.css'
import { NavLink } from 'react-router'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

import { useState } from 'react'

export default function Navbar() {
  // States;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Comportements;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  //Affichage;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div>
            <NavLink to="/">
                      
              <img src="/assets/img/logo-solidays.png" alt="Logo" className={styles.logoSolidays} />
            </NavLink>
          </div>
          <div>
            <NavLink to="/">
              <img src="/assets/img/bare.jpeg" alt="Logo" className={styles.bare} />
            </NavLink>
          </div>
          <div>
            <NavLink to="/">
              <img src="/assets/img/Logo_Solidaritesida2.png" alt="Logo" className={styles.logoSolidays2} />
            </NavLink>
          </div>
        </div>

        <div className={styles.navContainer}>
          <nav className={styles.navigation}>
            <ul
              className={
                isMenuOpen
                  ? [styles.navLinks, styles.active].join(" ")
                  : styles.navLinks
              }>

              <li><NavLink to="/festival"
                className={({ isActive }) =>
                  `${isActive ? styles.activeLink : styles.navLinks}`
                }>Festival</NavLink></li>
              <li>
                <NavLink to="/programmation"
                  className={({ isActive }) =>
                    `${isActive ? styles.activeLink : styles.navLinks}`
                  }>Programmation</NavLink>
              </li>

              <li><NavLink to="/billetterie"
                className={({ isActive }) =>
                  `${isActive ? styles.activeLink : styles.navLinks}`
                }>Billetterie</NavLink>
              </li>
              <li><NavLink to="/mention_legale"
                className={({ isActive }) =>
                  `${isActive ? styles.activeLink : styles.navLinks}`
                }>Mentions Légales</NavLink></li>
<<<<<<< HEAD
              <li><NavLink to="/mention_legale"
=======
              <li><NavLink to="/admin"
>>>>>>> refs/remotes/origin/master
                className={({ isActive }) =>
                  `${isActive ? styles.activeLink : styles.navLinks}`
                }>Admin</NavLink></li>
            </ul>
          </nav >
        </div>
        <div onClick={toggleMenu} className={styles.hamburgerMenu}>
          {/* <GiHamburgerMenu size={25} className={styles.menuIcon} /> */}

          {isMenuOpen ?
            (
              <IoCloseSharp size={25} className={[styles.iconClose, styles.navLinks].join(" ")}
              />
            ) : (
              <GiHamburgerMenu size={25} className={styles.iconBurger} />
            )}

        </div>

        {/* meenu mobile */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.navLinks}>
              <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/festival" >Festival</NavLink></li>
              <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/programmation" >Programmation</NavLink></li>
              <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/billetterie" >Billetterie</NavLink></li>
              <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/mention_legale" >Mentions Légales</NavLink></li>
<<<<<<< HEAD
=======
                <li><NavLink to="/admin"
                className={({ isActive }) =>
                  `${isActive ? styles.activeLink : styles.navLinks}`
                }>Admin</NavLink></li>
>>>>>>> refs/remotes/origin/master
            </ul>
          </div>
          )}
      </header>
    </>
    // className={({ isActive }) => ${isActive ? styles.activeLink : styles.navLinks}}
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> refs/remotes/origin/master
