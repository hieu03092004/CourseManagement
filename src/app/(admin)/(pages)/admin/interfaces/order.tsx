export interface Order {
  id: string;
  orderCode: string;
  amount: number;
  orderDate: string;
  status: "pending" | "completed" | "cancelled";
}