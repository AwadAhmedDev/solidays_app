import { useEffect } from "react";
import BilletterieBanner from "../../components/billetterie/BilletterieBanner/BilletterieBanner";
import BilletterieContent from "../../components/billetterie/BilletterieContent/BilletterieContent";
import styles from "./billetterie.module.css";

export default function Billetterie() {

    useEffect(() => {
    window.scrollTo(0, 0); // scroll en haut de la page
  }, []);

    return (
        <body className={styles.bgColor}>
        <BilletterieBanner />
        <BilletterieContent />
        </body>
    );
};