export interface ProductProps {
  id: number;
  name: string;
  value: number;
  composition: { quantity: number; rawMaterialId: number }[];
}
