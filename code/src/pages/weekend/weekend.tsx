import React from 'react'
import styles from "../weekend/weekend.module.css"

const Festival = () => {
  return (
    
    <div className={styles.weekend}>
        <img src="../../../assets/img/concert.jpg" alt="" />
    
      
      <div className={styles.box}>
        <h3 className={styles.title}>Week-end d’intérêt public</h3>
      
        <p className={styles.content}>Né dans une chambre de bonne de 14m2, dans la tête de deux étudiants prêts à changer le monde, le festival Solidays n’est pas un festival comme les autres. Construit sur des valeurs de partage et d’entraide, il nourrit les esprits, réveille les consciences et rapproche les gens. Solidays est un lieu unique de circulation des idées. Année après année, il permet de cultiver le meilleur de chacun. Les jeunes, les militants, les artistes y viennent pour assouvir leur « quête de sens » et partager le plaisir « d’être utile », le plaisir « d’être ensemble ». Il suffit de fouler les pelouses de Longchamp pour mieux comprendre les nombreuses vocations citoyennes et solidaires que cette initiative un peu folle continue de susciter au fil des ans.</p>

        <p className={styles.content}>Chaque année, outre des rendez-vous musicaux d’exception, le festival propose des temps forts, des conférences et des temps d’échange autour de grandes questions de société et d’actualité. Sans oublier la rencontre avec les 100 associations françaises et internationales du Village Solidarité qui agissent au quotidien sur des thèmes aussi variés que les droits humains, la santé, la pauvreté, l’environnement, le handicap ou l’exclusion. Solidays est aussi un outil performant contre le sida et la détresse humaine. Grâce à son succès, de nombreux programmes d’aide aux malades et de prévention ont pu être financés, ici et ailleurs.</p>

        <p className={styles.content}>Près de 4 millions de festivaliers ont déjà foulé les pelouses de Longchamp depuis ce jour de 1999 où Robbie Williams, Youssou N’Dour ou encore Jean-Jacques Goldman ont inauguré la scène principale. Plus de 25 ans plus tard, Solidays est plus que jamais « d’intérêt public ». Il démontre avec force à quel point les jeunes sont intimement convaincus que le bonheur, le progrès, le sens que chacun veut donner à son existence, ne peuvent naître de l’individualisme, du repli sur soi ou de l’indifférence à l’égard du monde.</p>

        <div className={styles.planbox}>
          <img className={styles.planning} src=".../../../../../assets/img/weekend.png" alt="planning" />
        </div>
       
        
      </div>
    </div>
       
  
  );

}

export default Festival
