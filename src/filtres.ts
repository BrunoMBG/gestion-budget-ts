import type { Transaction } from "./types";
import { resultat } from "./dom";

/**
 * Initialise la gestion des filtres par type et par catégorie et du tri des transactions.
 * Met à jour l'affichage en temps selon les sélections de l'utilisateur.
 *
 * @param transactions - Le tableau global des transactions
 */
export const filtresTri = (transactions: Transaction[]) => {
  let filtreTypeActif = "tous";
  let filtreCategorieActive = "toutes";
  let critereTriActif = "dateDesc";

  /**
   * Applique les filtres puis le tri sur le tableau,
   * Filtrage par type et par catégorie
   * et rafraîchit le rendu visuel dans le DOM.
   */
  const mettreAJourAffichage = () => {
    let transactionsFiltrees = transactions.filter((t) => {
      const correspondType =
        filtreTypeActif === "tous" || t.type === filtreTypeActif;
      const correspondCategorie =
        filtreCategorieActive === "toutes" ||
        t.categorie === filtreCategorieActive;
      return correspondType && correspondCategorie;
    });

    // Tri du tableau filtré selon le critère actif
    transactionsFiltrees.sort((a, b) => {
      if (critereTriActif === "dateDesc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (critereTriActif === "dateAsc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (critereTriActif === "montantDesc") {
        return b.montant - a.montant;
      } else if (critereTriActif === "montantAsc") {
        return a.montant - b.montant;
      } else if (critereTriActif === "titreAsc") {
        return a.titre.localeCompare(b.titre);
      }
      return 0;
    });

    resultat(transactionsFiltrees);
  };

  const boutonsType =
    document.querySelectorAll<HTMLButtonElement>("[data-type]");

  boutonsType.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      boutonsType.forEach((b) => b.classList.remove("filtres__bouton--actif"));
      bouton.classList.add("filtres__bouton--actif");

      filtreTypeActif = bouton.dataset.type || "tous";
      mettreAJourAffichage();
    });
  });

  const boutonsCategorie =
    document.querySelectorAll<HTMLButtonElement>("[data-categorie]");

  // Écouteurs pour le filtrage par catégorie
  boutonsCategorie.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      boutonsCategorie.forEach((b) =>
        b.classList.remove("filtres__bouton--actif"),
      );
      bouton.classList.add("filtres__bouton--actif");

      filtreCategorieActive = bouton.dataset.categorie || "toutes";
      mettreAJourAffichage();
    });
  });

  const selectTri =
    document.querySelector<HTMLSelectElement>("#triTransactions");
    
  // Écouteur pour le menu déroulant de tri
  if (selectTri) {
    selectTri.addEventListener("change", () => {
      // Mise à jour du critère de tri et relance de l'affichage
      critereTriActif = selectTri.value;
      mettreAJourAffichage();
    });
  }
};
