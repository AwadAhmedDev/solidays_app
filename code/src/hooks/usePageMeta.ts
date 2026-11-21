import { useEffect } from "react";

const SITE = "Solidays – clone pédagogique";
const DEFAULT_DESCRIPTION =
	"Reproduction du site du festival Solidays réalisée en équipe de 3 pendant la formation Développeur web et web mobile (Simplon) : React, TypeScript, Express et MySQL.";

// Titre et description propres à chaque page (le site est rendu côté navigateur).
export default function usePageMeta(title?: string, description = DEFAULT_DESCRIPTION) {
	useEffect(() => {
		document.title = title ? `${title} | ${SITE}` : SITE;
		document.querySelector('meta[name="description"]')?.setAttribute("content", description);
	}, [title, description]);
}
