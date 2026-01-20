import { NavLink } from "react-router";
import styles from "../intro_programmation/intro_programmation.module.css";

const Intro_Programmation = () => {
  return (
    <section
      className={styles.intro_programmation}
      aria-label="Introduction à la page de la programmation du festival Solidays"
    >
      <div className={styles.IntroProgrammation__container}>

        <div className={styles.IntroProgrammation__visual}>
          <img
            src="/assets/img/YesWeLove/yeswelove.webp"
            alt="Yes We Love – Message du festival Solidays"
            className={styles.IntroProgrammation__image}
          />
        </div>

        <div className={styles.IntroProgrammation__content}>
          <h2 className={styles.IntroProgrammation__lead}>
            C’est vrai,<br />
            le monde aime diviser.
          </h2>

          <p className={styles.IntroProgrammation__text}>
            Séparer. Classer. Opposer.<br />
            Générations, genres, croyances, idées.<br />
            Comme si tout devait être binaire.<br />
            Pour ou contre. Nous ou eux.
          </p>

          <p className={styles.IntroProgrammation__closing}>
            À Solidays on essaye autre chose.
          </p>

          <NavLink to="/programmation" className={styles.IntroProgrammation__button}
            aria-label="Voir la programmation Solidays">
            VOIR LA PROGRAMMATION
          </NavLink>
        </div>

      </div>
    </section>
  );
};

export default Intro_Programmation;