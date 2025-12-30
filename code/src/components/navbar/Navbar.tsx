import styles from './Navbar.module.css'
import logoSolidays from '../../assets/logo-solidays.png'
import bare from '../../assets/bare.jpeg'
import logoSolidays2 from '../../assets/Logo_Solidaritesida2.png'
import { NavLink } from 'react-router'
import { GiHamburgerMenu } from "react-icons/gi";




export default function Navbar() {
  return (
      <header className={styles.header}>
          <div className={styles.logo}>
              <div>
                  <NavLink to="/">
                      
                      <img src={logoSolidays} alt="Logo" className={styles.logoSolidays} />
                  </NavLink>
              </div>
              <div>
                   <NavLink to="/bare">
                      <img src={bare} alt="Logo" className={styles.bare} />
                      {/* <span  className={styles.bare}>|</span> */}
                   </NavLink>
              </div>
              <div>
                    <NavLink to="/logoSolidays2">
                        <img src={logoSolidays2} alt="Logo" className={styles.logoSolidays2} />
                    </NavLink>
              </div>
          </div>
          <nav className={styles.navigation}>
              <ul className={styles.navLinks}>
                  <li>
                      <NavLink to="/evenement">Events</NavLink>
                  </li>
                  <li><NavLink to="/festival">Festival</NavLink></li>
                   <li><NavLink to="/billeterie">Billeterie</NavLink></li>
              </ul>
              <div className={styles.hamburgerMenu}>
                    <GiHamburgerMenu size={25} />

              </div>
          </nav>
    </header>
  )
}
