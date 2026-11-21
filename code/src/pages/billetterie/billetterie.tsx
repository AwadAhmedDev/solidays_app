import BilletterieBanner from "../../components/billetterie/BilletterieBanner/BilletterieBanner";
import BilletterieContent from "../../components/billetterie/BilletterieContent/BilletterieContent";
import usePageMeta from "../../hooks/usePageMeta";
import styles from "./billetterie.module.css";

export default function Billetterie() {
    usePageMeta("Billetterie", "Les pass du festival : 3 jours, vendredi, samedi, dimanche, nuits et pass Culture.");

    return (
        <div className={styles.bgColor}>
            <BilletterieBanner />
            <BilletterieContent />
        </div>
    );
};
