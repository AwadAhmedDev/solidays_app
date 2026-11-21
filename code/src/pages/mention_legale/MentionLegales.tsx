import styles from "./MentionLegales.module.css"
import usePageMeta from "../../hooks/usePageMeta"

// Mentions légales de CE site (projet de formation), et non celles du site officiel :
// le site reproduit solidays.org mais n'est pas édité par Solidarité Sida.
export default function MentionLegales() {
  usePageMeta("Mentions légales")

  return (
    <div className={styles.mentionLegalesPage}>
      <div className={styles.mentionLegales}>
        <h1 className="sd-section-title">Mentions légales</h1>

        <p className={styles.notice}>
          Ce site est un <strong>projet de formation</strong> : une reproduction du site officiel{" "}
          <a href="https://www.solidays.org" target="_blank" rel="noopener noreferrer">solidays.org</a>, réalisée en
          équipe de 3 pendant la formation Développeur web et web mobile (Simplon), à des fins pédagogiques et de
          démonstration. Il n'a <strong>aucun lien officiel</strong> avec le festival Solidays ni avec l'association
          Solidarité Sida, et ne vend aucun billet.
        </p>

        <h2>Éditeur</h2>
        <p>
          Awad Ahmed, développeur web, à titre personnel et non commercial.<br />
          Contact : <a href="https://www.linkedin.com/in/awad-dev" target="_blank" rel="noopener noreferrer">LinkedIn</a>{" "}
          · <a href="https://github.com/AwadRoubahAhmed" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>

        <h2>Réalisation</h2>
        <p>
          Projet réalisé en équipe de trois développeurs (branches, pull requests et revues de code sur GitHub) :
          React, TypeScript, Express, MySQL.
        </p>

        <h2>Hébergement</h2>
        <p>Hostinger International Ltd, 61 Lordou Vironos Street, 6023 Larnaca, Chypre — hostinger.com</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Le nom et les logos Solidays et Solidarité Sida, les visuels, les photographies et les textes repris du site
          d'origine appartiennent à l'association Solidarité Sida et à leurs auteurs respectifs (photographes,
          artistes, agences). Ils sont reproduits ici uniquement dans le cadre de cet exercice pédagogique, sans
          usage commercial. Tout ayant droit peut demander leur retrait via les liens de contact ci-dessus ; il sera
          effectué sans délai.
        </p>

        <h2>Billetterie</h2>
        <p>
          Ce site ne vend rien. Les liens de la page Billetterie mènent aux vendeurs officiels du festival ; les
          achats se font entièrement sur leurs sites, selon leurs propres conditions.
        </p>

        <h2>Données personnelles et cookies</h2>
        <p>
          Aucune donnée personnelle n'est collectée auprès des visiteurs et aucun cookie de mesure d'audience ou de
          publicité n'est utilisé. Seul l'espace d'administration dépose un cookie technique de session, strictement
          nécessaire à la connexion de l'administrateur.
        </p>
      </div>

      <aside className={styles.mentionLegales} aria-labelledby="decouvrir">
        <h2 id="decouvrir" className={styles.asideTitle}>À découvrir</h2>
        <a
          className={styles.imageContainer}
          href="https://www.solidarite-sida.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/img/mention_legales_img.webp" alt="" className={styles.image} width="1000" height="500" loading="lazy" />
          <span className={styles.overlayCaption}>
            <strong>Solidarité Sida</strong>
            <span>En savoir plus sur l'association (site officiel)</span>
          </span>
        </a>
      </aside>
    </div>
  )
}
