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

    const titreInput = document.querySelector<HTMLInputElement>('#titre');
    const montantInput = document.querySelector<HTMLInputElement>('#montant');
    const typeSelect = document.querySelector<HTMLSelectElement>('#type');
    const categorieSelect = document.querySelector<HTMLSelectElement>('#categorie');
    const dateInput = document.querySelector<HTMLInputElement>('#date');

    if(!titreInput || !montantInput || !typeSelect || !categorieSelect || !dateInput){
        return
    }
  });
}
