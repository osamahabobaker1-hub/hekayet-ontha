import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  const occasions = [
    { label: "مواليد", emoji: "👶", href: "/all?category=مواليد", color: "#fce7f3" },
    { label: "زفاف", emoji: "💍", href: "/all?category=زفاف", color: "#fef3c7" },
    { label: "تخرج", emoji: "🎓", href: "/all?category=تخرج", color: "#e0f2fe" },
    { label: "أعياد ميلاد", emoji: "🎂", href: "/all?category=أعياد-ميلاد", color: "#f0fdf4" },
    { label: "خطوبة", emoji: "💝", href: "/all?category=خطوبة", color: "#fdf4ff" },
    { label: "عرض الكل", emoji: "✨", href: "/all", color: "#f8fafc" },
  ];

  return (
     <div style={{ backgroundColor: "#fdf9f8", minHeight: "100vh", direction: "rtl" }}>

      {/* ===== البانر الرئيسي ===== */}
      <section style={{
        background: "linear-gradient(135deg, #3a4b63 0%, #4a5f7a 50%, #3a4b63 100%)",
        padding: "60px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* زخارف خلفية */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "200px", height: "200px", borderRadius: "50%",
          backgroundColor: "rgba(232,208,202,0.1)",
        }} />
        <div style={{
          position: "absolute", bottom: "-40px", left: "-40px",
          width: "150px", height: "150px", borderRadius: "50%",
          backgroundColor: "rgba(232,208,202,0.08)",
        }} />

        <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
          <span style={{
            backgroundColor: "rgba(232,208,202,0.2)",
            color: "#e8d0ca",
            fontSize: "12px",
            fontWeight: "700",
            padding: "6px 16px",
            borderRadius: "20px",
            letterSpacing: "2px",
            display: "inline-block",
            marginBottom: "16px",
          }}>
            🌸 متجر هدايا المناسبات
          </span>

          <h1 style={{
            color: "white",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: "900",
            marginBottom: "16px",
            lineHeight: "1.3",
            fontFamily: "serif",
          }}>
            حكاية أنثى
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "16px",
            marginBottom: "32px",
            lineHeight: "1.8",
          }}>
            توزيعات فاخرة وهدايا مميزة لكل مناسباتك<br />
            مواليد • زفاف • تخرج • أعياد ميلاد
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/all">
              <button style={{
                backgroundColor: "#e8d0ca",
                color: "#3a4b63",
                border: "none",
                borderRadius: "30px",
                padding: "14px 36px",
                fontSize: "15px",
                fontWeight: "900",
                cursor: "pointer",
                fontFamily: "Cairo, sans-serif",
                transition: "all 0.2s",
              }}>
                تسوقي الآن ✨
              </button>
            </Link>
            <Link href="/all">
              <button style={{
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.4)",
                borderRadius: "30px",
                padding: "14px 36px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "Cairo, sans-serif",
              }}>
                عرض الكتالوج
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== شريط المميزات ===== */}
      <section style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e8d0ca",
        padding: "16px 20px",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}>
          {[
            { icon: "🚚", text: "شحن مجاني فوق 199 ريال" },
            { icon: "🎁", text: "تغليف فاخر مجاناً" },
            { icon: "⭐", text: "جودة مضمونة 100%" },
            { icon: "📞", text: "دعم على مدار الساعة" },
          ].map((item) => (
            <div key={item.text} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#3a4b63",
              fontWeight: "600",
            }}>
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== أقسام المناسبات ===== */}
      <section style={{ padding: "50px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 className="section-title">تسوقي حسب المناسبة</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "16px",
        }}>
          {occasions.map((occ) => (
            <Link key={occ.label} href={occ.href} style={{ textDecoration: "none" }}>
              <div className="occasion-circle" style={{ padding: "10px" }}>
                <div className="icon-wrapper" style={{ backgroundColor: occ.color }}>
                  <span style={{ fontSize: "28px" }}>{occ.emoji}</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#3a4b63", textAlign: "center" }}>
                  {occ.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== الأكثر طلباً ===== */}
      <section style={{ padding: "0 20px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>الأكثر طلباً</h2>
          <Link href="/all" style={{ textDecoration: "none" }}>
            <span style={{
              fontSize: "13px",
              color: "#3a4b63",
              fontWeight: "700",
              borderBottom: "2px solid #e8d0ca",
              paddingBottom: "2px",
            }}>
              عرض الكل ←
            </span>
          </Link>
        </div>

        {products.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "2px dashed #e8d0ca",
          }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>🌸</p>
            <p style={{ color: "#999", fontSize: "15px" }}>لا توجد منتجات بعد</p>
            <Link href="/admin/add-product">
              <button style={{
                marginTop: "16px",
                backgroundColor: "#3a4b63",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 24px",
                cursor: "pointer",
                fontFamily: "Cairo, sans-serif",
                fontWeight: "700",
              }}>
                أضف منتجاً الآن
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
      </section>

      {/* ===== بانر الدعوة للعمل ===== */}
      <section style={{
        backgroundColor: "#e8d0ca",
        padding: "50px 20px",
        textAlign: "center",
      }}>
        <h2 style={{
          color: "#3a4b63",
          fontSize: "26px",
          fontWeight: "900",
          marginBottom: "12px",
          fontFamily: "serif",
        }}>
          هل تبحثين عن توزيعة مميزة؟
        </h2>
        <p style={{ color: "#3a4b63", opacity: 0.8, marginBottom: "24px", fontSize: "15px" }}>
          تواصلي معنا لتصميم توزيعة خاصة تليق بمناسبتك
        </p>
        <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer">
          <button style={{
            backgroundColor: "#3a4b63",
            color: "white",
            border: "none",
            borderRadius: "30px",
            padding: "14px 36px",
            fontSize: "15px",
            fontWeight: "900",
            cursor: "pointer",
            fontFamily: "Cairo, sans-serif",
          }}>
            💬 تواصلي عبر واتساب
          </button>
        </a>
      </section>

    </div>
  );
}