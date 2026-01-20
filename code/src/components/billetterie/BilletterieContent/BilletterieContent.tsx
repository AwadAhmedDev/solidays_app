import styles from "./BilletterieContent.module.css";

const BilletterieContent = () => {
  return (
    <section
      className={styles.section}
      aria-labelledby="passes-heading"
    >
      <header className={styles.header}>
        <h3 id="passes-heading" className={styles.title}>
          Choisissez votre pass
        </h3>
      </header>

      <ul className={styles.grid}>
        
        {/* ---- Carte fantôme gauche (Desktop only) ---- */}
              <li className={`${styles.card} ${styles.phantom}`} aria-hidden="true">
                  <a href="#" tabIndex={-1}>  {/* lien inactif */}
          <img
            src="/assets/img/billetterie/P3J_left.jpg"
            alt=""
            className={styles.img}
                      />
                      </a>
        </li>

        <li className={styles.card}>
          <a
            href="https://www.fnacspectacles.com/event/festival-solidays-solidays-2026-hippodrome-de-longchamp-paris-16-21086197/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acheter un pass 3 jours"
          >
            <img
              src="/assets/img/billetterie/P3J.jpg"
              alt="Pass 3 jours Solidays"
              className={styles.img}
            />
          </a>
        </li>

        {/* ---- Carte fantôme droite (Desktop only) ---- */}
              <li className={`${styles.card} ${styles.phantom}`} aria-hidden="true">
                  <a href="#" tabIndex={-1}>  {/* lien inactif */}
          <img
            src="/assets/img/billetterie/P3J_right.jpg"
            alt=""
            className={styles.img}
                      />
                      </a>
        </li>

        <li className={styles.card}>
          <a
            href="https://www.fnacspectacles.com/event/festival-solidays-solidays-2026-hippodrome-de-longchamp-paris-16-21086078/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acheter un pass Vendredi"
          >
            <img
              src="/assets/img/billetterie/vendredi.jpg"
              alt="Pass Vendredi Solidays"
              className={styles.img}
            />
          </a>
        </li>

        <li className={styles.card}>
          <a href="https://www.fnacspectacles.com/event/festival-solidays-solidays-2026-hippodrome-de-longchamp-paris-16-21086079/" target="_blank" rel="noopener noreferrer" aria-label="Acheter un pass Samedi">
            <img src="/assets/img/billetterie/samedi.jpg" alt="Pass Samedi Solidays" className={styles.img} />
          </a>
        </li>

        <li className={styles.card}>
          <a href="https://www.fnacspectacles.com/event/festival-solidays-solidays-2026-hippodrome-de-longchamp-paris-16-21086080/" target="_blank" rel="noopener noreferrer" aria-label="Acheter un pass Dimanche">
            <img src="/assets/img/billetterie/dimanche.jpg" alt="Pass Dimanche Solidays" className={styles.img} />
          </a>
        </li>

        <li className={styles.card}>
          <a href="https://www.fnacspectacles.com/event/festival-solidays-solidays-2026-hippodrome-de-longchamp-paris-16-21086081/" target="_blank" rel="noopener noreferrer" aria-label="Acheter un pass nuit Vendredi">
            <img src="/assets/img/billetterie/nuit_vendredi.jpg" alt="Pass nuit Vendredi" className={styles.img} />
          </a>
        </li>

        <li className={styles.card}>
          <a href="https://www.fnacspectacles.com/event/festival-solidays-solidays-2026-hippodrome-de-longchamp-paris-16-21086082/" target="_blank" rel="noopener noreferrer" aria-label="Acheter un pass nuit Samedi">
            <img src="/assets/img/billetterie/nuit_samedi.jpg" alt="Pass nuit Samedi" className={styles.img} />
          </a>
        </li>

        <li className={styles.card}>
          <a href="https://passculture.app/lieu/3228" target="_blank" rel="noopener noreferrer" aria-label="Acheter un billet avec le Pass Culture">
            <img src="/assets/img/billetterie/pass_culture.jpg" alt="Billet pass Culture" className={styles.img} />
          </a>
        </li>

      </ul>
    </section>
  );
};

export default BilletterieContent;