"use client";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useState } from "react";

const categories = [
  { label: "مواليد", href: "/all?category=مواليد", emoji: "👶" },
  { label: "زفاف", href: "/all?category=زفاف", emoji: "💍" },
  { label: "تخرج", href: "/all?category=تخرج", emoji: "🎓" },
  { label: "أعياد ميلاد", href: "/all?category=أعياد-ميلاد", emoji: "🎂" },
  { label: "عرض الكل", href: "/all", emoji: "✨" },
];

export default function Navbar() {
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, direction: "rtl" }}>

      {/* شريط الإعلانات المتحرك */}
      <div style={{
        backgroundColor: "#3a4b63",
        color: "white",
        padding: "8px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <div style={{
          display: "inline-block",
          animation: "marquee 25s linear infinite",
        }}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ marginLeft: "80px", fontSize: "13px", letterSpacing: "0.5px" }}>
              🎁 شحن مجاني للطلبات أكثر من 199 ريال &nbsp;•&nbsp;
              ✨ توزيعات مميزة لجميع المناسبات &nbsp;•&nbsp;
              🌸 جودة عالية وتغليف فاخر &nbsp;•&nbsp;
              🚚 التوصيل خلال 2-3 أيام عمل
            </span>
          ))}
        </div>
      </div>

      {/* الناف بار الرئيسي */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e8d0ca",
        boxShadow: "0 2px 8px rgba(58,75,99,0.06)",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}>

          {/* الشعار */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{
                fontSize: "26px",
                fontWeight: "900",
                color: "#3a4b63",
                lineHeight: "1",
                fontFamily: "serif",
              }}>HA</span>
              <span style={{
                fontSize: "9px",
                color: "#3a4b63",
                opacity: 0.7,
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}>حكاية أنثى</span>
            </div>
          </Link>

          {/* البحث */}
          <div style={{ flex: 1, maxWidth: "480px", position: "relative" }}>
            <input
              type="text"
              placeholder="ابحثي عن منتجاتك... (توزيعات، هدايا، مواليد)"
              style={{
                width: "100%",
                backgroundColor: "#fdf9f8",
                border: "1.5px solid #e8d0ca",
                borderRadius: "25px",
                padding: "10px 44px 10px 16px",
                fontSize: "13px",
                color: "#3a4b63",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target.style.borderColor = "#3a4b63")}
              onBlur={e => (e.target.style.borderColor = "#e8d0ca")}
            />
            <svg
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
              width="18" height="18" fill="none" stroke="#3a4b63" strokeWidth="2" viewBox="0 0 24 24"
            >
              <path d="M21 21l-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* الأيقونات */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>

            {/* السلة */}
            <Link href="/cart" style={{ textDecoration: "none", position: "relative" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                cursor: "pointer",
              }}>
                <div style={{ position: "relative" }}>
                  <svg width="26" height="26" fill="none" stroke="#3a4b63" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {totalItems > 0 && (
                    <span style={{
                      position: "absolute",
                      top: "-6px",
                      left: "-6px",
                      backgroundColor: "#e8d0ca",
                      color: "#3a4b63",
                      fontSize: "10px",
                      fontWeight: "900",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid white",
                    }}>
                      {totalItems}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: "10px", color: "#3a4b63", opacity: 0.7 }}>السلة</span>
              </div>
            </Link>

            {/* زر القائمة للجوال */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
              }}
              className="mobile-menu-btn"
            >
              <svg width="24" height="24" fill="none" stroke="#3a4b63" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* شريط التصنيفات */}
        <div style={{
          borderTop: "1px solid #f0e8e5",
          backgroundColor: "#fdf9f8",
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            overflowX: "auto",
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                style={{ textDecoration: "none", flexShrink: 0 }}
              >
                <div style={{
                  padding: "10px 16px",
                  fontSize: "13px",
                  color: "#3a4b63",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.2s, color 0.2s",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderBottomColor = "#3a4b63";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderBottomColor = "transparent";
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}