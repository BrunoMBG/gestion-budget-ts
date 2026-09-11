import "./scss/style.scss";
import type { Transaction } from "./types";
import { calculer, resultat } from "./dom";

const transactions: Transaction[] = [
  {
    id: "1",
    titre: "Salaire de septembre",
    montant: 2200,
    type: "revenu",
    categorie: "loisirs",
    date: "2026-09-03",
  },
  {
    id: "2",
    titre: "Courses alimentaires",
    montant: 836.4,
    type: "depense",
    categorie: "alimentation",
    date: "2026-09-05",
  },
];

resultat(transactions);
calculer(transactions);

const form = document.querySelector<HTMLFormElement>("#formTransaction");

if (form) {
  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const titreInput = document.querySelector<HTMLInputElement>("#titre");
    const montantInput = document.querySelector<HTMLInputElement>("#montant");
    const typeSelect = document.querySelector<HTMLSelectElement>("#type");
    const categorieSelect = document.querySelector<HTMLSelectElement>("#categorie");
    const dateInput = document.querySelector<HTMLInputElement>("#date");

    // Arrête l'exécution si l'un des champs est introuvable
    if (
      !titreInput ||
      !montantInput ||
      !typeSelect ||
      !categorieSelect ||
      !dateInput
    ) {
      return;
    }

    // Récupère la date du jour
    const dateAujourdHui = new Date().toISOString().split("T")[0];
    // Définit la date minimale à 5 ans avant l'année actuelle
    const anneeActuelle = new Date().getFullYear();
    const dateMinimale = `${anneeActuelle - 5}-01-01`;

    if (
      !dateInput.value ||
      dateInput.value > dateAujourdHui ||
      dateInput.value < dateMinimale
    ) {
      alert(
        "Veuillez choisir une date comprise entre aujourd'hui et il y a 5 ans maximum.",
      );
      return;
    }

    const nouvelleTransaction: Transaction = {
      id: crypto.randomUUID(),
      titre: titreInput.value.trim(),
      montant: parseFloat(montantInput.value),
      type: typeSelect.value as "revenu" | "depense",
      categorie: categorieSelect.value as Transaction["categorie"],
      date: dateInput.value,
    };

    // Ajout de la transaction dans le tableau
    transactions.push(nouvelleTransaction);

    // Rafraîchissement de l'affichage de la liste et des calculs
    resultat(transactions);
    calculer(transactions);

    form.reset();
  });
}

/**
 * Supprime une transaction du tableau selon son identifiant unique
 * et rafraîchit l'affichage du DOM ainsi que les totaux.
 *
 * @param id - Identifiant UUID de la transaction à retirer
 */
const supprimerTransaction = (id: string): void => {
  const index = transactions.findIndex((t) => t.id === id);

  if (index !== -1) {
    transactions.splice(index, 1);
    resultat(transactions);
    calculer(transactions);
  }
};

const liste = document.querySelector<HTMLElement>("#listeTransactions");

if (liste) {
  liste.addEventListener("click", (e: MouseEvent) => {
    const cible = e.target as HTMLElement;

    const btnSupprimer = cible.closest<HTMLButtonElement>(
      ".transaction__bouton-supprimer",
    );

    if (btnSupprimer && btnSupprimer.dataset.id) {
      supprimerTransaction(btnSupprimer.dataset.id);
    }
  });
}
