import styles from "./BilletterieBanner.module.css";

const BilletterieBanner = () => {
  return (
    <section
      className={styles.banner} aria-label="Page de la Billetterie du festival"
    >
      <img
        src="/src/assets/img/billetterie/banner.jpg"
        alt="Foule du festival Solidays pendant un concert"
        className={styles.banner__image}
      />

          <p className={styles.banner__text}>
              Solidays n’est pas un festival comme les autres. Construit sur des valeurs de partage et d’entraide, il (ré)enchante le monde à sa manière en donnant du sens à la fête et des couleurs à la solidarité. C’est un lieu unique de circulation des idées et d’éveil des consciences. Chaque année, les vocations sociales et solidaires y naissent par milliers. <br />
              <span>Retrouvez ici l’ensemble des pass disponibles pour participer au festival Solidays. Les billets sont vendus via des plateformes externes agréées. <br />
              Les stocks et tarifs peuvent varier selon les partenaires.</span>
      </p>
    </section>
  );
};

export default BilletterieBanner;