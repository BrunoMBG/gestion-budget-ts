import type { Transaction } from "./types";

/**
 * Calcule le total des revenus, des dépenses et le solde final,
 * puis met à jour l'affichage des montants dans le résumé du DOM.
 *
 * @param transactions - La liste complète des transactions à calculer.
 */
export function calculer(transactions: Transaction[]): void {
  const solde = document.querySelector<HTMLParagraphElement>("#soldeTotal");
  const revenuTotal =
    document.querySelector<HTMLParagraphElement>("#totalRevenus");
  const depenseTotal =
    document.querySelector<HTMLParagraphElement>("#totalDepenses");

  if (!solde || !revenuTotal || !depenseTotal) return;

  let totalRevenu: number = 0;
  let totalDepense: number = 0;

  for (const t of transactions) {
    if (t.type === "revenu") {
      totalRevenu += t.montant;
    } else if (t.type === "depense") {
      totalDepense += t.montant;
    }
  }

  const soldeTotal: number = totalRevenu - totalDepense;

  solde.textContent = `${soldeTotal.toFixed(2).replace(".", ",")} €`;
  revenuTotal.textContent = `+ ${totalRevenu.toFixed(2).replace(".", ",")} €`;
  depenseTotal.textContent = `- ${totalDepense.toFixed(2).replace(".", ",")} €`;
}

/**
 * Convertit une date au format international en format français
 *
 * @param date - La date au format international.
 * @returns La date au format français.
 */
function formaterDate(date: string): string {
  const nouvelleDate = new Date(date);
  return nouvelleDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Génère et insère la liste des cartes HTML de transactions dans le DOM.
 * Affiche un message si aucune transaction n'est présente.
 *
 * @param transactions - La liste des transactions à afficher.
 */
export function resultat(transactions: Transaction[]): void {
  const liste = document.querySelector<HTMLUListElement>("#listeTransactions");

  if (!liste) return;
  liste.innerHTML = "";

  if (transactions.length === 0) {
    liste.innerHTML =
      '<li class="transactions__vide">Aucune transaction enregistrée</li>';
    return;
  }

  for (const t of transactions) {
    const li = document.createElement("li");
    li.className = `transaction transaction--${t.type}`;
    li.dataset.id = t.id;

    const operateur = t.type === "revenu" ? "+" : "-";
    const dateAffichage = formaterDate(t.date);

    li.innerHTML = `
            <div class="transaction__infos">
                <h3 class="transaction__titre">${t.titre}</h3>
                <div class="transaction__details">
                <span class="transaction__badge">${t.categorie}</span>
                <time datetime="${t.date}" class="transaction__date">${dateAffichage}</time>
                </div>
            </div>
            <div class="transaction__action">
                <span class="transaction__montant transaction__montant--${t.type}">
                ${operateur} ${t.montant.toFixed(2).replace(".", ",")} €
                </span>
                <button
                type="button"
                class="transaction__bouton-supprimer"
                aria-label="Supprimer la transaction ${t.titre}"
                data-id="${t.id}"
                >
                ✕
                </button>
            </div>
            `;

    liste.appendChild(li);
  }
}
