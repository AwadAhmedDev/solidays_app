import { NavLink } from "react-router";
import usePageMeta from "../../hooks/usePageMeta";

const NotFound = () => {
	usePageMeta("Page introuvable");
	return (
		<section className="sd-status" style={{ minHeight: "60vh", display: "grid", placeContent: "center", gap: 24 }}>
			<h1 className="sd-section-title">Page introuvable</h1>
			<p>Cette page n'existe pas ou a été déplacée.</p>
			<p>
				<NavLink to="/" className="sd-btn">
					Retour à l'accueil
				</NavLink>
			</p>
		</section>
	);
};

export default NotFound;
