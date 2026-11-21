import styles from "../intro_billetterie/intro_billetterie.module.css";
import { NavLink } from 'react-router';

const PASSES = [
  { img: "pass3jours", label: "Pass 3 jours" },
  { img: "passVendredi", label: "Pass vendredi" },
  { img: "passSamedi", label: "Pass samedi" },
  { img: "passDimanche", label: "Pass dimanche" },
]

const Intro_Billetterie = () => {
  return (
    <section className={styles.intro_billetterie} aria-labelledby="choisir-titre">
      <header className={styles.IntroBilleterie__header}>
        <h2 id="choisir-titre" className={styles.IntroBilleterie__title}>
          À vous de <span>choisir</span>
        </h2>
      </header>

      <ul className={styles.IntroBilleterie__list}>
        {PASSES.map((pass) => (
          <li key={pass.img} className={styles.IntroBilleterie__item}>
            <NavLink to="/billetterie" aria-label={`${pass.label} – voir la billetterie`}>
              <img
                src={`/assets/img/intro_billetterie/${pass.img}.webp`}
                alt={pass.label}
                className={styles.IntroBilleterie__image}
                width="600"
                height="600"
                loading="lazy"
              />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.IntroBilleterie__cta}>
        <NavLink to="/billetterie" className="sd-btn">
          Billetterie
        </NavLink>
      </div>
    </section>
  );
}

export default Intro_Billetterie;
