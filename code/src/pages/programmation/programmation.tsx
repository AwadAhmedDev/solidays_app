import ProgrammationTabs from "../../components/programmationContent/ProgrammationTabs";
import usePageMeta from "../../hooks/usePageMeta";

const ProgrammationPage = () => {
  usePageMeta("Programmation", "Les artistes de l'édition 2026 du festival, jour par jour : Orelsan, Gims, Bigflo & Oli, Zara Larsson…");

  return (
    <section>
      <ProgrammationTabs />
    </section>
  );
};

export default ProgrammationPage;
