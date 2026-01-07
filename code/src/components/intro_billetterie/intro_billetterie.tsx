import styles from "../intro_billetterie/intro_billetterie.module.css";

const Intro_Billetterie = () => {
  return (
    <section
      className={styles.intro_billetterie}
      aria-label="Introduction à la page de la Billetterie du festival Solidays"
    >
      <header className={styles.IntroBilleterie__header}>
        <h2 className={styles.IntroBilleterie__title}>
          À vous de <span>choisir</span>
        </h2>
      </header>

      <ul className={styles.IntroBilleterie__list}>
  <li className={styles.IntroBilleterie__item}>
      <img
        src="/src/assets/img/intro_billetterie/pass3jours.webp"
        alt="Pass 3 jours"
        className={styles.IntroBilleterie__image}
      />
  </li>

  <li className={styles.IntroBilleterie__item}>
      <img
        src="/src/assets/img/intro_billetterie/passVendredi.webp"
        alt="Pass Vendredi"
        className={styles.IntroBilleterie__image}
      />
  </li>

  <li className={styles.IntroBilleterie__item}>
      <img
        src="/src/assets/img/intro_billetterie/passSamedi.webp"
        alt="Pass Samedi"
        className={styles.IntroBilleterie__image}
      />
  </li>

  <li className={styles.IntroBilleterie__item}>
      <img
        src="/src/assets/img/intro_billetterie/passDimanche.webp"
        alt="Pass Dimanche"
        className={styles.IntroBilleterie__image}
      />
  </li>
</ul>

      <div className={styles.IntroBilleterie__cta}>
        <a href="#billetterie" className={styles.IntroBilleterie__button}>
          Billetterie
        </a>
        { /* T0D0 : Ajouter un NavLink après avoir puller */}
      </div>
    </section>
  );
}

export default Intro_Billetterie;