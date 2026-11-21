import styles from "../weekend/weekend.module.css"
import usePageMeta from "../../hooks/usePageMeta"

const Festival = () => {
  usePageMeta("Festival – week-end d'intérêt public", "Né en 1999, Solidays réunit chaque année concerts, débats et 100 associations à Paris-Longchamp.")

  return (
    <article className={styles.weekend}>
      <div className={styles.hero}>
        <img className={styles.heroImg} src="/assets/img/concert.webp" alt="" width="900" height="450" />
        <h1 className={styles.heroTitle}>
          Week-end <span>d'intérêt public</span>
        </h1>
      </div>

      <div className={styles.box}>
        <p className={styles.content}>
          Né dans une chambre de bonne de 14 m², dans la tête de deux étudiants prêts à changer le monde, le festival
          Solidays n'est pas un festival comme les autres. Construit sur des valeurs de partage et d'entraide, il nourrit
          les esprits, réveille les consciences et rapproche les gens. Solidays est un lieu unique de circulation des
          idées. Année après année, il permet de cultiver le meilleur de chacun. Les jeunes, les militants, les artistes
          y viennent pour assouvir leur « quête de sens » et partager le plaisir « d'être utile », le plaisir « d'être
          ensemble ». Il suffit de fouler les pelouses de Longchamp pour mieux comprendre les nombreuses vocations
          citoyennes et solidaires que cette initiative un peu folle continue de susciter au fil des ans.
        </p>

        <p className={styles.content}>
          Chaque année, outre des rendez-vous musicaux d'exception, le festival propose des temps forts, des conférences
          et des temps d'échange autour de grandes questions de société et d'actualité. Sans oublier la rencontre avec
          les 100 associations françaises et internationales du Village Solidarité qui agissent au quotidien sur des
          thèmes aussi variés que les droits humains, la santé, la pauvreté, l'environnement, le handicap ou l'exclusion.
          Solidays est aussi un outil performant contre le sida et la détresse humaine. Grâce à son succès, de nombreux
          programmes d'aide aux malades et de prévention ont pu être financés, ici et ailleurs.
        </p>

        <p className={styles.content}>
          Près de 4 millions de festivaliers ont déjà foulé les pelouses de Longchamp depuis ce jour de 1999 où Robbie
          Williams, Youssou N'Dour ou encore Jean-Jacques Goldman ont inauguré la scène principale. Plus de 25 ans plus
          tard, Solidays est plus que jamais « d'intérêt public ». Il démontre avec force à quel point les jeunes sont
          intimement convaincus que le bonheur, le progrès, le sens que chacun veut donner à son existence, ne peuvent
          naître de l'individualisme, du repli sur soi ou de l'indifférence à l'égard du monde.
        </p>

        <figure className={styles.planbox}>
          <img
            className={styles.planning}
            src="/assets/img/weekend.webp"
            alt="Déroulé du week-end : concerts, talks, associations et expositions sur les trois jours"
            width="1400"
            height="990"
            loading="lazy"
          />
        </figure>
      </div>
    </article>
  );
}

export default Festival
