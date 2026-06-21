import { prisma } from "@/lib/prisma";

// لجعل الصفحة تحدث بياناتها دائماً عند كل زيارة
export const revalidate = 0;

export default async function AdminOrdersPage() {
  // جلب كافة الطلبات من الأحدث للأقدم
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-400">لا يوجد طلبات حالياً 📦</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 border-r-8 border-green-500 pr-4">
          إدارة الطلبات الواردة
        </h1>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
          إجمالي الطلبات: {orders.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            {/* معلومات العميل */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-bold">
                  طلب #{order.id}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                </span>
              </div>
              <h2 className="text-xl font-black text-gray-800">{order.customerName}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">📞 {order.customerPhone}</span>
                <span className="flex items-center gap-1">📧 {order.customerEmail}</span>
                <span className="flex items-center gap-1">📍 {order.address}</span>
              </div>
            </div>

            {/* تفاصيل الملبغ والحالة */}
            <div className="flex flex-col items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              <div className="text-2xl font-black text-green-600">
                {order.totalAmount.toFixed(2)} <span className="text-sm">ريال</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-lg text-sm font-bold">
                  {order.status || "قيد المعالجة"}
                </span>
                <button className="bg-gray-100 hover:bg-black hover:text-white p-2 rounded-lg transition-colors">
                  تعديل الحالة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}