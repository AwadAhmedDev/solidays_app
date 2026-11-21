import styles from "./DemoBanner.module.css";

// Bandeau toujours visible : ce site est une reproduction réalisée en formation,
// pas le site officiel du festival.
export default function DemoBanner() {
	return (
		<div className={styles.banner} role="note">
			<p>
				Projet de formation (Simplon) — reproduction non officielle de{" "}
				<a href="https://www.solidays.org" target="_blank" rel="noopener noreferrer">
					solidays.org
				</a>
				. Billets et informations officiels : site du festival.
			</p>
		</div>
	);
}
