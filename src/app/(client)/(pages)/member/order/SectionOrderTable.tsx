import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

interface Order {
  orderCode: string;
  amount: string;
  orderDate: string;
  status: string;
}

interface SectionOrderTableProps {
  orders: Order[];
}

export default function SectionOrderTable({ orders }: SectionOrderTableProps) {

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-dark1 text-white">
          <tr>
            <th className="text-left px-4 py-3 font-semibold">Mã đơn hàng</th>
            <th className="text-left px-4 py-3 font-semibold">Tiền</th>
            <th className="text-left px-4 py-3 font-semibold">Ngày đặt hàng</th>
            <th className="text-left px-4 py-3 font-semibold">Trạng thái</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ width: "75px" }}></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.orderCode}
              className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-4 py-3">
                <Link
                  href={`/member/order/detail/${order.orderCode}`}
                  className="text-primary hover:text-hightlight font-medium"
                >
                  {order.orderCode}
                </Link>
              </td>
              <td className="px-4 py-3">{order.amount}</td>
              <td className="px-4 py-3">{order.orderDate}</td>
              <td className="px-4 py-3">
                <span
                  className={`font-semibold ${order.status === "Đã hủy" ? "text-gray-600" : "text-dark1"}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  {order.status === "Chờ thanh toán" && (
                    <>
                      <Link
                        href={`/order/checkout?code=${order.orderCode}`}
                        className="text-primary hover:text-hightlight"
                        title="Xác nhận"
                      >
                        <FaRegEdit size={20} />
                      </Link>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

