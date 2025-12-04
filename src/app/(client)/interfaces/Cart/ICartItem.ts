export interface ICartItem {
  title: string;
  description: string;
  image: string;
  price: number; // Giá gốc (chưa tính discount_percent)
  originalPrice: number; // Giá sau khi giảm (đã tính discount_percent)
}

