import styles from "./BilletterieContent.module.css";

const FNAC = "https://www.fnacspectacles.com/event/festival-solidays-solidays-2026-hippodrome-de-longchamp-paris-16-";

// Pass repris du site d'origine ; les liens mènent aux vendeurs officiels.
const PASSES = [
  { img: "vendredi", label: "Pass vendredi", href: `${FNAC}21086078/` },
  { img: "samedi", label: "Pass samedi", href: `${FNAC}21086079/` },
  { img: "dimanche", label: "Pass dimanche", href: `${FNAC}21086080/` },
  { img: "nuit_vendredi", label: "Pass nuit de vendredi", href: `${FNAC}21086081/` },
  { img: "nuit_samedi", label: "Pass nuit de samedi", href: `${FNAC}21086082/` },
  { img: "pass_culture", label: "Billet avec le pass Culture", href: "https://passculture.app/lieu/3228" },
]

const BilletterieContent = () => {
  return (
    <section className={styles.section} aria-labelledby="passes-heading">
      <header className={styles.header}>
        <h2 id="passes-heading" className={styles.title}>
          Choisissez votre pass
        </h2>
      </header>

      {/* Pass 3 jours mis en avant, encadré par ses deux visuels décoratifs (comme sur le site d'origine) */}
      <div className={styles.featured}>
        <img src="/assets/img/billetterie/P3J_left.webp" alt="" className={styles.phantom} width="250" height="250" aria-hidden="true" />
        <a href={`${FNAC}21086197/`} target="_blank" rel="noopener noreferrer" className={styles.card}>
          <img src="/assets/img/billetterie/P3J.webp" alt="Pass 3 jours" className={styles.img} width="600" height="600" />
          <span className="sd-sr-only">(ouvre le site du vendeur dans un nouvel onglet)</span>
        </a>
        <img src="/assets/img/billetterie/P3J_right.webp" alt="" className={styles.phantom} width="250" height="250" aria-hidden="true" />
      </div>

      <ul className={styles.grid}>
        {PASSES.map((pass) => (
          <li key={pass.img}>
            <a href={pass.href} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <img
                src={`/assets/img/billetterie/${pass.img}.webp`}
                alt={pass.label}
                className={styles.img}
                width="600"
                height="600"
                loading="lazy"
              />
              <span className="sd-sr-only">(ouvre le site du vendeur dans un nouvel onglet)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BilletterieContent;
