import styles from './a_la_une.module.css';

const ALaUne = () => {
  return (
    <section className={styles.aLaUne__section} aria-label="Annonces récentes du festival Solidays">
      <header className={styles.aLaUne__header}>
        <h2 className={styles.aLaUne__title}>
          À LA UNE
        </h2>
      </header>

      <div className={styles.aLaUne__grid}>
        <article className={styles.aLaUne__card}>
          <img
            src="/src/assets/img/a_la_une/11artistes.webp"
            alt="Annonce des premiers noms à l’affiche"
            className={styles.aLaUne__image}
          />
          <h3 className={styles.aLaUne__cardTitle}>
            11 premiers noms <br />à l’affiche
          </h3>
          <p className={styles.aLaUne__cardText}>
            11.12 - Annonce : ORELSAN, GIMS, BIGFLO&OLI, ZARA LARSSON, LUIZA, L2B, LA RVFLEUZE, LA MANO 1.9, INO CASABLANCA, MOSIMANN, NICO MORENO seront présents.
          </p>
        </article>

        <article className={styles.aLaUne__card}>
          <img
            src="/src/assets/img/a_la_une/departBilletterie.jpg"
            alt="Ouverture de la billetterie"
            className={styles.aLaUne__image}
          />
          <h3 className={styles.aLaUne__cardTitle}>
            Le 13 à 13H <br/>Top départ billetterie
          </h3>
          <p className={styles.aLaUne__cardText}>
            19.11 - 25 000 Pass 3 jours mis en vente à partir de 39€. Be Ready !
          </p>
        </article>

        <article className={styles.aLaUne__card}>
          <img
            src="/src/assets/img/a_la_une/fondateurSolidariteSida.webp"
            alt="Interview autour du festival Solidays"
            className={styles.aLaUne__image}
          />
          <h3 className={styles.aLaUne__cardTitle}>
            Solidays, secrets de fabrication
          </h3>
          <p className={styles.aLaUne__cardText}>
            26.06 - Rencontre avec Luc Barruet, directeur-fondateur de Solidarité Sida. Il nous livrera son regard sur le phénomène Solidays.
          </p>
        </article>
      </div>
    </section>
  );
}

export default ALaUne; 