import styles from './Navbar.module.css'
import logoSolidays from '../../assets/logo-solidays.png'
import bare from '../../assets/bare.jpeg'
import logoSolidays2 from '../../assets/Logo_Solidaritesida2.png'
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
      <header className={styles.header}>
        <div className={styles.logo}>
              <div>
                  <NavLink to="/">
                      
                      <img src={logoSolidays} alt="Logo" className={styles.logoSolidays} />
                  </NavLink>
              </div>
              <div>
                   <NavLink to="/">
                      <img src={bare} alt="Logo" className={styles.bare} />
                   </NavLink>
              </div>
              <div>
                    <NavLink to="/">
                        <img src={logoSolidays2} alt="Logo" className={styles.logoSolidays2} />
                    </NavLink>
              </div>
        </div>
        <div className={styles.navContainer}>
            <nav  className={styles.navigation}>
                <ul
                   className={
                   isMenuOpen
                  ? [styles.navLinks, styles.active].join(" ")
                 : styles.navLinks
                }>
                  <li>
                    <NavLink to="/programmation"
                          className={({ isActive }) =>
                      `${isActive ? styles.activeLink : styles.navLinks}`
                      }>Programmation</NavLink>
                  </li>
                      <li><NavLink to="/festival"
                      className={({ isActive }) =>
                      `${isActive ? styles.activeLink : styles.navLinks}`
                      }>Festival</NavLink></li>

                   <li><NavLink to="/billeterie"
                    className={({ isActive }) =>
                        `${isActive ? styles.activeLink : styles.navLinks}`
                      }>Billeterie</NavLink>
            </li>
            <li><NavLink to="/mention_legale"         
              className={({ isActive }) =>    
                 `${isActive ? styles.activeLink : styles.navLinks}`       
                      }>Mentions Légales</NavLink></li>   
                </ul>
            </nav>
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
          </div>

          {/* meenu mobile */}
          {isMenuOpen && (
            <div className={styles.mobileMenu}>
              <ul className={styles.navLinks}>
                <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/programmation" >Programmation</NavLink></li>
                <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/festival" >Festival</NavLink></li>
            <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/billeterie" >Billeterie</NavLink></li>
            <li><NavLink className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`} to="/mention_legale" >Mentions Légales</NavLink></li>
              </ul>
            </div>
          )}
    </header>
  )
}

// className={({ isActive }) => `${isActive ? styles.activeLink : styles.navLinks}`}