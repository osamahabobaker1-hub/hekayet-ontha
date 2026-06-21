import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function deleteProduct(formData: FormData) {
  "use server";
  const id = parseInt(formData.get("id") as string);
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin");
}

async function updateOrderStatus(formData: FormData) {
  "use server";
  const id = parseInt(formData.get("id") as string);
  const status = formData.get("status") as string;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}

export default async function AdminPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  const totalRevenue = orders
    .filter(o => o.status !== "ملغي")
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const statusColor: Record<string, string> = {
    "قيد التنفيذ": "#f59e0b",
    "تم الشحن": "#3b82f6",
    "مكتمل": "#22c55e",
    "ملغي": "#ef4444",
  };

  return (
    <div style={{ backgroundColor: "#fdf9f8", minHeight: "100vh", direction: "rtl", padding: "30px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* العنوان */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: "900", color: "#3a4b63", borderRight: "5px solid #3a4b63", paddingRight: "14px", fontFamily: "Cairo, sans-serif" }}>
            لوحة الإدارة
          </h1>
          <Link href="/admin/add-product">
            <button style={{ backgroundColor: "#3a4b63", color: "white", border: "none", borderRadius: "25px", padding: "12px 24px", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "Cairo, sans-serif" }}>
              + إضافة منتج جديد
            </button>
          </Link>
        </div>

        {/* الإحصائيات */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "36px" }}>
          {[
            { label: "إجمالي المنتجات", value: products.length, icon: "🛍️", color: "#e8d0ca" },
            { label: "إجمالي الطلبات", value: orders.length, icon: "📦", color: "#dbeafe" },
            { label: "طلبات قيد التنفيذ", value: orders.filter(o => o.status === "قيد التنفيذ").length, icon: "⏳", color: "#fef3c7" },
            { label: "إجمالي الإيرادات", value: `${totalRevenue.toFixed(0)} ر`, icon: "💰", color: "#dcfce7" },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8d0ca", padding: "20px", boxShadow: "0 2px 8px rgba(58,75,99,0.04)" }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{stat.icon}</div>
              <p style={{ fontSize: "24px", fontWeight: "900", color: "#3a4b63", margin: "0 0 4px" }}>{stat.value}</p>
              <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* جدول المنتجات */}
        <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8d0ca", padding: "24px", marginBottom: "30px", boxShadow: "0 2px 8px rgba(58,75,99,0.04)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "900", color: "#3a4b63", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid #e8d0ca" }}>
            🛍️ المنتجات ({products.length})
          </h2>

          {products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", padding: "30px" }}>لا توجد منتجات بعد</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#fdf9f8" }}>
                    {["الصورة", "الاسم", "الفئة", "السعر", "المخزون", "الإجراءات"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "right", fontWeight: "700", color: "#3a4b63", borderBottom: "1px solid #e8d0ca" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} style={{ borderBottom: "1px solid #f5ebe8" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ width: "50px", height: "50px", borderRadius: "10px", backgroundColor: "#fdf9f8", border: "1px solid #e8d0ca", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                          ) : <span>🌸</span>}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: "600", color: "#3a4b63" }}>{product.name}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ backgroundColor: "#e8d0ca", color: "#3a4b63", fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" }}>
                          {product.category || "عام"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: "700", color: "#3a4b63" }}>{product.price} ريال</td>
                      <td style={{ padding: "12px 16px", color: product.stock > 0 ? "#22c55e" : "#ef4444", fontWeight: "700" }}>
                        {product.stock > 0 ? `${product.stock} قطعة` : "نفد"}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Link href={`/product/${product.id}`}>
                            <button style={{ backgroundColor: "#fdf9f8", color: "#3a4b63", border: "1px solid #e8d0ca", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "Cairo, sans-serif" }}>
                              عرض
                            </button>
                          </Link>
                          <form action={deleteProduct}>
                            <input type="hidden" name="id" value={product.id} />
                            <button
                              type="submit"
                              
                              style={{ backgroundColor: "#fff5f5", color: "#ef4444", border: "1px solid #ffcdd2", borderRadius: "8px", padding: "6px 12px", fontSize: "12px", cursor: "pointer", fontFamily: "Cairo, sans-serif" }}
                            >
                              حذف
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* جدول الطلبات */}
        <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8d0ca", padding: "24px", boxShadow: "0 2px 8px rgba(58,75,99,0.04)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "900", color: "#3a4b63", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid #e8d0ca" }}>
            📦 الطلبات ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", padding: "30px" }}>لا توجد طلبات بعد</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {orders.map((order) => (
                <div key={order.id} style={{ border: "1px solid #e8d0ca", borderRadius: "14px", padding: "18px", backgroundColor: "#fdf9f8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                    <div>
                      <p style={{ fontWeight: "900", color: "#3a4b63", fontSize: "15px", margin: "0 0 4px" }}>
                        طلب #{order.id} — {order.customerName}
                      </p>
                      <p style={{ fontSize: "12px", color: "#888", margin: "0 0 2px" }}>📞 {order.customerPhone}</p>
                      <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>📍 {order.address}</p>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontSize: "18px", fontWeight: "900", color: "#3a4b63", margin: "0 0 6px" }}>{order.totalAmount} ريال</p>
                      <span style={{
                        backgroundColor: statusColor[order.status] + "20",
                        color: statusColor[order.status] || "#888",
                        fontSize: "11px", fontWeight: "700",
                        padding: "3px 10px", borderRadius: "20px",
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* المنتجات في الطلب */}
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "12px", padding: "8px 12px", backgroundColor: "white", borderRadius: "8px", border: "1px solid #f0e8e5" }}>
                    {order.items.map(item => `${item.productName} × ${item.quantity}`).join(" • ")}
                  </div>

                  {/* تغيير الحالة */}
                  <form action={updateOrderStatus} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status} style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e8d0ca", fontSize: "13px", color: "#3a4b63", backgroundColor: "white", fontFamily: "Cairo, sans-serif", flex: 1 }}>
                      <option value="قيد التنفيذ">⏳ قيد التنفيذ</option>
                      <option value="تم الشحن">🚚 تم الشحن</option>
                      <option value="مكتمل">✅ مكتمل</option>
                      <option value="ملغي">❌ ملغي</option>
                    </select>
                    <button type="submit" style={{ backgroundColor: "#3a4b63", color: "white", border: "none", borderRadius: "8px", padding: "6px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "Cairo, sans-serif", fontWeight: "700" }}>
                      تحديث
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}