import styles from "./BilletterieBanner.module.css";

const BilletterieBanner = () => {
  return (
    <section className={styles.banner} aria-labelledby="billetterie-titre">
      <h1 id="billetterie-titre" className="sd-section-title">Billetterie</h1>

      <img
        src="/assets/img/billetterie/banner.webp"
        alt="Foule du festival Solidays pendant un concert"
        className={styles.banner__image}
        width="1030"
        height="300"
      />

      <p className={styles.banner__text}>
        Solidays n'est pas un festival comme les autres. Construit sur des valeurs de partage et d'entraide,
        il (ré)enchante le monde à sa manière en donnant du sens à la fête et des couleurs à la solidarité.
        C'est un lieu unique de circulation des idées et d'éveil des consciences. Chaque année, les vocations
        sociales et solidaires y naissent par milliers.
      </p>
      <p className={styles.banner__note}>
        Retrouvez ici l'ensemble des pass disponibles. Les billets sont vendus par des plateformes externes
        agréées ; les stocks et tarifs peuvent varier selon les partenaires.
      </p>
    </section>
  );
};

export default BilletterieBanner;
