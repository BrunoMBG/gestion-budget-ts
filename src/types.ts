export type TypeTransaction = 'revenu' | 'depense';

export interface Transaction {
  id: string;
  description: string;
  montant: number;
  type: TypeTransaction;
  categorie: string;
  creeLe: string;
}