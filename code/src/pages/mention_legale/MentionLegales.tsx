import styles from "./MentionLegales.module.css"


export default function MentionLegales() {
  return (
      <div className={styles.mentionLegalesPage}>
          <div className={styles.mentionLegales}>
          <div className={styles.mentionLegaleImages}>
              <img src="../../../assets/mentiion_legales_img" alt="mention Legale Image" />
          </div>
      <h1>Mentions Légales</h1>
      <h2>Éditeur</h2>
      <p>
        Siège social : Association Solidarité Sida<br />
        16bis avenue Parmentier, 75011 Paris<br />
        Tél : +33 1 53 10 22 22<br />
        Email : info@solidarite-sida.org<br />
        RNA : W751107092
      </p>

      <h2>Directeur de la publication</h2>
      <p>Luc Barruet</p>

      <h2>Équipe communication de Solidarité Sida</h2>
      <p>Anna Niesler, Victor Bismuth, Philippe Lecocq</p>

      <h2>Réalisation</h2>
      <p>Agence Colorz, 16bis avenue Parmentier, 75011 Paris</p>

      <h2>Hébergement</h2>
      <p>
        Faaaster – hébergement WordPress, 13 bis avenue de la Motte Picquet, 75007 Paris
      </p>

      <h2>Droits d’auteurs</h2>
      <p>
        Ce site est propriété de l’association Solidarité Sida – la réservation des noms de domaine
        www.solidays.com et solidaysmaj2.faaaster.dev a été effectuée conformément aux dispositions
        de l’AFNIC. L’ensemble de ce site relève de la législation française et internationale sur le
        droit d’auteur et la propriété industrielle. Tous les droits de reproduction sont réservés,
        y compris les représentations iconographiques et photographiques. La reproduction de tout ou
        partie de ce site sur un support quel qu’il soit, est formellement interdite sauf autorisation
        expresse de Solidarité Sida. La reproduction des textes sur un support papier est autorisée
        sous réserve du respect des trois conditions suivantes : – gratuité de la diffusion ; – respect
        de l’intégrité des documents reproduits (pas de modification ni altération) ; – la citation
        claire et lisible de la source sous la forme suivante : « Document issu du site Internet
        www.solidays.com Solidarité Sida. Les droits de reproduction sont réservés et strictement
        limités.
      </p>

      <h2>Crédits</h2>
      <p>
        Visuel 2022 : Florent Choffel, agence Answer.<br />
        Steve Winn, photographe<br />
        Amudat Hassan, mannequin<br />
        Lauren Duignan, maquilleuse<br />
        Crédits textes : Félix Barres, Audrey Touchard, Thibault Roche, Marion Catrou, Natalia Gallois, Roxane Montaron, Anne A-R, Baudouin Vermeulen, Victor Bismuth, Aurore de Rochambeau.<br />
        Crédits photographies & IMAGES : Laurent Attias • Nicolas Aubin • Raphaël Aupy • ... (et ainsi de suite)
      </p>

      <h2>Photos artistes</h2>
      <p>Droits réservés</p>

      <h2>Merci aux photographes de Solidarité Sida</h2>

      <h2>Informations générales sur les achats en ligne</h2>
      <p>
        Lorsque vous passez commande sur notre site web de billetterie, vous renseignez des
        informations personnelles (Noms, prénoms, adresse email, civilité, pays d’origine, numéros
        de téléphone, code postal, ville, date de naissance). Ces informations sont conservées par AGP
        Système, en toute sécurité. Seuls seetickets ou AGP Système (en fonction de votre provenance),
        le personnel concerné de Solidarité Sida peuvent accéder à ces données, qui ne seront jamais
        cédées à une tierce entreprise.
      </p>

      <h2>Sécurité</h2>
      <p>
        Notre billetterie en ligne utilise la technologie https, qui encrypte toutes les informations
        qui transitent entre vos appareils et le site internet. Nos certificats SSL vous assurent que
        les pages que vous visitez proviennent bien de notre site et permettent ainsi d’éviter la
        fraude.
      </p>
      <p>
        En amont du festival Solidays et pendant son exploitation, des espaces stratégiques aux abords
        de l’hippodrome de Longchamps, sont placés sous vidéosurveillance afin d’identifier les
        véhicules circulants dans la zone et d’assurer la sécurité des personnes et des biens. La
        base légale du traitement de ces données est l’intérêt légitime (cf. article 6.1.f) du
        Règlement européen sur la protection des données. Le public et les visiteurs occasionnels de
        Solidays sont susceptibles d’être filmés par le dispositif. Les images sont conservées pendant
        un temps maximal d’un mois et peuvent être visionnées, en cas d’incident, par le personnel
        habilité de notre prestataire Trombone et par les forces de l’ordre. En cas d’incident lié à
        la sécurité des personnes et des biens, les images de vidéosurveillance peuvent néanmoins être
        extraites du dispositif. Elles sont alors conservées sur un autre support le temps du règlement
        des procédures liées à cet incident et accessibles aux seules personnes habilitées dans ce
        cadre.
      </p>
      <p>
        Vous pouvez accéder aux données vous concernant ou demander leur effacement, notamment votre
        droit d’accès aux images qui vous concernent, ou pour toute information sur ce dispositif,
        vous pouvez nous contacter en écrivant à infoetlib@prodsolidays.fr ou consulter solidays.fr.
      </p>
      <p>
        Vous disposez également d’un droit d’opposition et d’un droit à la limitation du traitement de
        vos données (cf. Cnil.fr pour plus d’informations sur vos droits).
      </p>
      <p>
        Si vous estimez, après nous avoir contactés, que vos droits Informatique et Libertés ne sont
        pas respectés ou que le dispositif vidéo n’est pas conforme aux règles de protection des
        données, vous pouvez adresser une réclamation en ligne à la CNIL ou par courrier postal.
      </p>
    </div>
          <div className={styles.mentionLegales}>
              <h1>À découvrir</h1>

              <div className={styles.imageGrid}>
                  <figure className={styles.imageContainer}>
                      <img src="../../../assets/img/mention_2.jpg" alt="Image de présentation" className={styles.image} />
                      <button className={styles.bottomLeftButton}>En savoir plus</button>
                      <figcaption className={styles.overlayCaption}>
                          <h3>Solidarité Sida</h3>
                          <p>En savoir plus sur l'association</p>
                      </figcaption>
                  </figure>
                  <div className={styles.imageContainer}>
                     <figure className={styles.imageContainer}>
                      <img src="../../../assets/img/mention_2.jpg"  alt="Image de présentation" className={styles.image2} />
                      <button className={styles.bottomLeftButton}>En savoir plus</button>
                      <figcaption className={styles.overlayCaption}>
                          <h3>Solidarité Sida</h3>
                          <p>En savoir plus sur l'association</p>
                      </figcaption>
                  </figure>
                  </div>
              </div>
          </div>
      </div>
  )
}

