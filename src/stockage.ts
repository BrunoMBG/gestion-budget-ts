import type { Transaction } from "./types";

const TRANSACTIONS_KEY = "budget_transactions";

/**
 * Récupère les transactions depuis le localStorage,
 * ou retourne un tableau vide si rien n'est trouvé.
 */
export const chargerTransactions = (): Transaction[] => {
  const donneesStockees = localStorage.getItem(TRANSACTIONS_KEY);
  if (donneesStockees) {
    try {
      return JSON.parse(donneesStockees);
    } catch (e) {
      console.error("Erreur lors de la lecture du localStorage", e);
    }
  }
  return [];
};

/**
 * Sauvegarde le tableau des transactions dans le localStorage.
 */
export const sauvegarderTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};
