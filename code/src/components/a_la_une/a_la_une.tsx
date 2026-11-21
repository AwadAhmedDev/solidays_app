import { NavLink } from 'react-router';
import styles from './a_la_une.module.css';

// Actualités reprises du site d'origine (édition 2026, décembre 2025)
const NEWS = [
  {
    img: "11artistes",
    alt: "Annonce des premiers noms à l'affiche",
    title: "11 premiers noms à l'affiche",
    text: "11.12 – Annonce : Orelsan, Gims, Bigflo & Oli, Zara Larsson, Luiza, L2B, La Rvfleuze, La Mano 1.9, Ino Casablanca, Mosimann et Nico Moreno seront présents.",
    link: { to: "/programmation", label: "La programmation" },
  },
  {
    img: "departBilletterie",
    alt: "Ouverture de la billetterie",
    title: "Le 13 à 13 h, top départ billetterie",
    text: "19.11 – 25 000 pass 3 jours mis en vente à partir de 39 €. Be ready !",
    link: { to: "/billetterie", label: "Billetterie" },
  },
  {
    img: "fondateurSolidariteSida",
    alt: "Rencontre avec le fondateur de Solidarité Sida",
    title: "Solidays, secrets de fabrication",
    text: "26.06 – Rencontre avec Luc Barruet, directeur-fondateur de Solidarité Sida. Il nous livre son regard sur le phénomène Solidays.",
    link: { to: "/festival", label: "En savoir +" },
  },
]

const ALaUne = () => {
  return (
    <section className={styles.aLaUne__section} aria-labelledby="une-titre">
      <header className={styles.aLaUne__header}>
        <h2 id="une-titre" className="sd-section-title">À la une</h2>
      </header>

      <div className={styles.aLaUne__grid}>
        {NEWS.map((item) => (
          <article key={item.img} className={styles.aLaUne__card}>
            <img
              src={`/assets/img/a_la_une/${item.img}.webp`}
              alt={item.alt}
              className={styles.aLaUne__image}
              width="600"
              height="600"
              loading="lazy"
            />
            <h3 className={styles.aLaUne__cardTitle}>{item.title}</h3>
            <p className={styles.aLaUne__cardText}>{item.text}</p>
            <NavLink to={item.link.to} className="sd-btn">{item.link.label}</NavLink>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ALaUne;
