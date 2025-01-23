import { paymentMethods } from "@prisma/client";

export interface SalesProps {
  id: number;
  day: Date;
  month: number;
  items: {
    productId: number;
    unit: number;
  }[];
  paymentMethod: paymentMethods;
}
