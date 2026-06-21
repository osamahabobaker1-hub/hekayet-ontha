"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#3a4b63", color: "white", direction: "rtl" }}>

      {/* القسم الرئيسي */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px 20px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>

          {/* عن المتجر */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ fontSize: "28px", fontWeight: "900", fontFamily: "serif" }}>HA</span>
              <span style={{ display: "block", fontSize: "11px", opacity: 0.6, letterSpacing: "2px", marginTop: "2px" }}>حكاية أنثى</span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: "1.9", opacity: 0.75, marginBottom: "20px" }}>
              متجر متخصص في توزيعات وهدايا المناسبات السعيدة.<br />
              نقدم أجمل التوزيعات لمواليدك، زفافك، تخرجك وكل مناسباتك.
            </p>
            {/* واتساب */}
            <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "#25d366", borderRadius: "25px",
                padding: "10px 20px", fontSize: "13px", fontWeight: "700",
                cursor: "pointer",
              }}>
                <span>💬</span>
                <span>تواصلي معنا</span>
              </div>
            </a>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: "900", marginBottom: "20px", paddingBottom: "10px", borderBottom: "2px solid rgba(232,208,202,0.3)" }}>
              روابط سريعة
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "الرئيسية", href: "/" },
                { label: "جميع المنتجات", href: "/all" },
                { label: "سلة المشتريات", href: "/cart" },
                { label: "إتمام الطلب", href: "/checkout" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: "13px", opacity: 0.75, transition: "opacity 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
                  >
                    ← {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* المناسبات */}
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: "900", marginBottom: "20px", paddingBottom: "10px", borderBottom: "2px solid rgba(232,208,202,0.3)" }}>
              المناسبات
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "👶 مواليد", href: "/all?category=مواليد" },
                { label: "💍 زفاف", href: "/all?category=زفاف" },
                { label: "🎓 تخرج", href: "/all?category=تخرج" },
                { label: "🎂 أعياد ميلاد", href: "/all?category=أعياد-ميلاد" },
                { label: "💝 خطوبة", href: "/all?category=خطوبة" },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                  <span style={{ fontSize: "13px", opacity: 0.75, cursor: "pointer" }}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* تواصل معنا */}
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: "900", marginBottom: "20px", paddingBottom: "10px", borderBottom: "2px solid rgba(232,208,202,0.3)" }}>
              تواصلي معنا
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: "📱", text: "0500000000" },
                { icon: "📧", text: "info@hekayet-ontha.com" },
                { icon: "📍", text: "المملكة العربية السعودية" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", opacity: 0.75 }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* السوشيال ميديا */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {[
                { label: "📸", name: "انستقرام" },
                { label: "🐦", name: "تويتر" },
                { label: "▶️", name: "يوتيوب" },
              ].map((s) => (
                <div key={s.name} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: "16px",
                  transition: "background-color 0.2s",
                }}
                  title={s.name}
                >
                  {s.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* شريط حقوق النشر */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "16px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <p style={{ fontSize: "12px", opacity: 0.6, margin: 0 }}>
            © {new Date().getFullYear()} حكاية أنثى — جميع الحقوق محفوظة
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            {["سياسة الخصوصية", "الشروط والأحكام", "سياسة الإرجاع"].map((item) => (
              <span key={item} style={{ fontSize: "11px", opacity: 0.5, cursor: "pointer" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}