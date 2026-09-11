import "./scss/style.scss";
import type { Transaction } from "./types";
import { calculer, resultat } from "./dom";
import { chargerTransactions, sauvegarderTransactions } from "./stockage";

const transactions: Transaction[] = chargerTransactions();
resultat(transactions);
calculer(transactions);

const form = document.querySelector<HTMLFormElement>("#formTransaction");

if (form) {
  const typeSelect = document.querySelector<HTMLSelectElement>("#type");
  const categorieSelect =
    document.querySelector<HTMLSelectElement>("#categorie");

  /**
   * Gère l'état dynamique du champ "Catégorie" en fonction du type de transaction sélectionné.
   * - Si le type est "revenu" : réinitialise la catégorie et désactive le champ.
   * - Si le type est "dépense" : active le champ
   */
  const verifierTypeRevenu = () => {
    if (typeSelect && categorieSelect) {
      if (typeSelect.value === "revenu") {
        categorieSelect.value = "";
        categorieSelect.disabled = true;
      } else {
        categorieSelect.disabled = false;
        if (!categorieSelect.value) {
          categorieSelect.value = "alimentation";
        }
      }
    }
  };

  if (typeSelect && categorieSelect) {
    verifierTypeRevenu();
    typeSelect.addEventListener("change", verifierTypeRevenu);
  }

  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    const titreInput = document.querySelector<HTMLInputElement>("#titre");
    const montantInput = document.querySelector<HTMLInputElement>("#montant");
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

    const montant = parseFloat(montantInput.value);
    if (isNaN(montant) || montant <= 0 || montant > 10000000) {
      alert("Veuillez entrer un montant valide (entre 0 et 10 000 000 €).");
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
      montant: montant,
      type: typeSelect.value as "revenu" | "depense",
      categorie: categorieSelect.value as Transaction["categorie"],
      date: dateInput.value,
    };

    // Ajout de la transaction dans le tableau
    transactions.push(nouvelleTransaction);

    // Sauvegarde dans le localStorage
    sauvegarderTransactions(transactions);

    // Rafraîchissement de l'affichage de la liste et des calculs
    resultat(transactions);
    calculer(transactions);

    form.reset();
    verifierTypeRevenu();
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

    sauvegarderTransactions(transactions);

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
