export type TypeTransaction = 'revenu' | 'depense';
export type CategorieTransaction = 'alimentation' | 'loyer' | 'loisirs' | 'autre';
export type OptionTri = 'dateDesc' | 'dateAsc' | 'montantDesc' | 'montantAsc' | 'titreAsc';

export interface Transaction {
  id: string;
  titre: string;
  montant: number;
  type: TypeTransaction;
  categorie: CategorieTransaction;
  date: string;
}