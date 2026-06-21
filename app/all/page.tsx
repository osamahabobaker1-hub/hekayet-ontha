// استيراد prisma ومكون البطاقة
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const categories = [
  { label: "الكل", value: "all", emoji: "✨" },
  { label: "مواليد", value: "مواليد", emoji: "👶" },
  { label: "زفاف", value: "زفاف", emoji: "💍" },
  { label: "تخرج", value: "تخرج", emoji: "🎓" },
  { label: "أعياد ميلاد", value: "أعياد-ميلاد", emoji: "🎂" },
  { label: "خطوبة", value: "خطوبة", emoji: "💝" },
  { label: "عام", value: "عام", emoji: "🎁" },
];

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category || "all";

  const products = await prisma.product.findMany({
    where: activeCategory !== "all" ? { category: activeCategory } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const allCount = await prisma.product.count();

  return (
    <div style={{ backgroundColor: "#fdf9f8", minHeight: "100vh", direction: "rtl" }}>

      {/* هيدر الصفحة */}
      <div style={{
        background: "linear-gradient(135deg, #fdf9f8 0%, #f5ebe8 100%)",
        padding: "40px 20px 30px",
        borderBottom: "1px solid #e8d0ca",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "32px", fontWeight: "900", color: "#3a4b63",
          fontFamily: "serif", marginBottom: "8px",
        }}>
          جميع التوزيعات
        </h1>
        <p style={{ color: "#888", fontSize: "14px" }}>
          اكتشفي تشكيلتنا الكاملة لكل مناسباتك السعيدة 🌸
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>

        {/* فلاتر الفئات */}
        <div style={{
          display: "flex", gap: "10px", flexWrap: "wrap",
          marginBottom: "30px", justifyContent: "center",
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/all" : `/all?category=${cat.value}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: isActive ? "#3a4b63" : "white",
                  color: isActive ? "white" : "#3a4b63",
                  border: `1.5px solid ${isActive ? "#3a4b63" : "#e8d0ca"}`,
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}>
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* شريط المعلومات */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "24px",
          padding: "12px 20px",
          backgroundColor: "white", borderRadius: "12px",
          border: "1px solid #e8d0ca",
        }}>
          <p style={{ fontSize: "14px", color: "#3a4b63", fontWeight: "600", margin: 0 }}>
            {activeCategory === "all" ? "جميع المنتجات" : `فئة: ${activeCategory}`}
            <span style={{
              marginRight: "8px", backgroundColor: "#e8d0ca",
              color: "#3a4b63", fontSize: "12px", fontWeight: "700",
              padding: "2px 10px", borderRadius: "20px",
            }}>
              {products.length} منتج
            </span>
          </p>
          <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
            إجمالي المنتجات: {allCount}
          </p>
        </div>

        {/* شبكة المنتجات */}
        {products.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "80px 20px",
            backgroundColor: "white", borderRadius: "20px",
            border: "2px dashed #e8d0ca",
          }}>
            <p style={{ fontSize: "60px", marginBottom: "16px" }}>🌸</p>
            <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#3a4b63", marginBottom: "8px" }}>
              لا توجد منتجات في هذه الفئة
            </h2>
            <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
              جربي فئة أخرى أو عودي لجميع المنتجات
            </p>
            <Link href="/all">
              <button style={{
                backgroundColor: "#3a4b63", color: "white", border: "none",
                borderRadius: "25px", padding: "12px 28px", fontSize: "14px",
                fontWeight: "700", cursor: "pointer", fontFamily: "Cairo, sans-serif",
              }}>
                عرض الكل ✨
              </button>
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            width: "100%",
          }}
            className="products-grid"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}