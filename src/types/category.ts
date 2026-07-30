export type CategoryId =
  | "bolos"
  | "brigadeiros-docinhos"
  | "kits-festa"
  | "caixas-produtos-individuais";

export interface CatalogCategory {
  readonly id: CategoryId;
  readonly slug: string;
  readonly name: string;
  readonly order: number;
}
