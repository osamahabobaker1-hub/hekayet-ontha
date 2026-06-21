import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return notFound();

  // جلب منتجات مشابهة من نفس الفئة
  const related = await prisma.product.findMany({
    where: { category: product.category, id: { not: productId } },
    take: 4,
  });

  return (
    <div style={{ backgroundColor: "#fdf9f8", minHeight: "100vh", direction: "rtl" }}>

      {/* مسار التنقل */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e8d0ca", padding: "12px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", fontSize: "13px", color: "#888", display: "flex", gap: "8px", alignItems: "center" }}>
          <Link href="/" style={{ color: "#3a4b63", textDecoration: "none", fontWeight: "600" }}>الرئيسية</Link>
          <span>←</span>
          <Link href="/all" style={{ color: "#3a4b63", textDecoration: "none", fontWeight: "600" }}>المنتجات</Link>
          <span>←</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "start",
          backgroundColor: "white",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 4px 20px rgba(58,75,99,0.06)",
          border: "1px solid #e8d0ca",
        }}>

          {/* الصورة */}
          <div style={{
            backgroundColor: "#fdf9f8",
            borderRadius: "20px",
            overflow: "hidden",
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #e8d0ca",
            padding: "20px",
          }}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                }}
              />
            ) : (
              <span style={{ fontSize: "80px" }}>🌸</span>
            )}
          </div>

          {/* التفاصيل */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* الفئة */}
            <span style={{
              backgroundColor: "#e8d0ca",
              color: "#3a4b63",
              fontSize: "12px",
              fontWeight: "700",
              padding: "4px 14px",
              borderRadius: "20px",
              display: "inline-block",
              width: "fit-content",
              letterSpacing: "1px",
            }}>
              {product.category || "منتج مميز"}
            </span>

            {/* الاسم */}
            <h1 style={{
              fontSize: "32px",
              fontWeight: "900",
              color: "#3a4b63",
              lineHeight: "1.3",
              fontFamily: "serif",
              margin: 0,
            }}>
              {product.name}
            </h1>

            {/* السعر */}
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              padding: "16px 20px",
              backgroundColor: "#fdf9f8",
              borderRadius: "14px",
              border: "1px solid #e8d0ca",
            }}>
              <span style={{ fontSize: "36px", fontWeight: "900", color: "#3a4b63" }}>
                {product.price}
              </span>
              <span style={{ fontSize: "16px", color: "#888", fontWeight: "600" }}>ريال سعودي</span>
            </div>

            {/* الوصف */}
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#3a4b63", marginBottom: "10px" }}>
                عن هذا المنتج
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.9",
                backgroundColor: "#fdf9f8",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #f0e8e5",
              }}>
                {product.description || "منتج مميز من حكاية أنثى"}
              </p>
            </div>

            {/* المميزات */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { icon: "🎁", text: "تغليف فاخر مجاناً مع كل طلب" },
                { icon: "🚚", text: "شحن سريع خلال 2-3 أيام عمل" },
                { icon: "✨", text: "جودة مضمونة 100%" },
              ].map((item) => (
                <div key={item.text} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  color: "#3a4b63",
                  padding: "8px 12px",
                  backgroundColor: "#fdf9f8",
                  borderRadius: "10px",
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* زر الإضافة للسلة */}
            <div style={{ marginTop: "8px" }}>
              <AddToCartButton product={product} />
            </div>

            {/* رابط العودة */}
            <Link href="/all" style={{ textDecoration: "none", textAlign: "center" }}>
              <span style={{ fontSize: "13px", color: "#888", borderBottom: "1px solid #e8d0ca", paddingBottom: "2px" }}>
                ← العودة للمنتجات
              </span>
            </Link>

          </div>
        </div>

        {/* منتجات مشابهة */}
        {related.length > 0 && (
          <div style={{ marginTop: "60px" }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: "900",
              color: "#3a4b63",
              marginBottom: "24px",
              borderRight: "5px solid #3a4b63",
              paddingRight: "14px",
              fontFamily: "Cairo, sans-serif",
            }}>
              منتجات مشابهة
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}>
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid #e8d0ca",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 24px rgba(58,75,99,0.12)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fdf9f8", padding: "16px" }}>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                      ) : (
                        <span style={{ fontSize: "40px" }}>🌸</span>
                      )}
                    </div>
                    <div style={{ padding: "14px", textAlign: "center" }}>
                      <p style={{ fontWeight: "700", color: "#3a4b63", fontSize: "14px", marginBottom: "6px" }}>{p.name}</p>
                      <p style={{ fontWeight: "900", color: "#3a4b63", fontSize: "16px" }}>{p.price} ريال</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}