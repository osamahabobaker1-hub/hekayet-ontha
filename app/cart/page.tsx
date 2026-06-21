"use client";
import { useCart } from "@/store/useCart";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: "#fdf9f8", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl" }}>
        <div style={{ textAlign: "center", padding: "60px" }}>
          <p style={{ fontSize: "80px", marginBottom: "20px" }}>🛒</p>
          <h3 style={{ fontSize: "22px", fontWeight: "900", color: "#3a4b63", marginBottom: "12px" }}>سلتك فارغة</h3>
          <p style={{ color: "#888", marginBottom: "28px", fontSize: "14px" }}>أضيفي منتجات مميزة لسلتك</p>
          <Link href="/all">
            <button style={{
              backgroundColor: "#3a4b63", color: "white", border: "none",
              borderRadius: "30px", padding: "14px 36px", fontSize: "15px",
              fontWeight: "700", cursor: "pointer", fontFamily: "Cairo, sans-serif",
            }}>
              تسوقي الآن ✨
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fdf9f8", minHeight: "100vh", direction: "rtl", padding: "30px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* العنوان */}
        <h1 style={{
          fontSize: "26px", fontWeight: "900", color: "#3a4b63",
          marginBottom: "30px", borderRight: "5px solid #3a4b63",
          paddingRight: "14px", fontFamily: "Cairo, sans-serif",
        }}>
          سلة المشتريات
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#888", marginRight: "10px" }}>
            ({items.length} منتج)
          </span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>

          {/* قائمة المنتجات */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {items.map((item) => (
              <div key={item.id} style={{
                backgroundColor: "white",
                borderRadius: "20px",
                border: "1px solid #e8d0ca",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                boxShadow: "0 2px 8px rgba(58,75,99,0.04)",
              }}>

                {/* صورة المنتج */}
                <div style={{
                  width: "100px", height: "100px", flexShrink: 0,
                  backgroundColor: "#fdf9f8", borderRadius: "14px",
                  border: "1px solid #e8d0ca", display: "flex",
                  alignItems: "center", justifyContent: "center", overflow: "hidden",
                }}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontSize: "32px" }}>🌸</span>
                  )}
                </div>

                {/* تفاصيل المنتج */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#3a4b63", marginBottom: "6px" }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "18px", fontWeight: "900", color: "#3a4b63" }}>
                    {item.price} ريال
                  </p>
                </div>

                {/* التحكم بالكمية */}
                <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1px solid #e8d0ca", borderRadius: "25px", overflow: "hidden" }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: "36px", height: "36px", border: "none",
                      backgroundColor: "#fdf9f8", color: "#3a4b63",
                      fontSize: "18px", cursor: "pointer", fontWeight: "700",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e8d0ca")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fdf9f8")}
                  >
                    −
                  </button>
                  <span style={{
                    padding: "0 16px", fontSize: "15px",
                    fontWeight: "700", color: "#3a4b63", minWidth: "40px",
                    textAlign: "center",
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: "36px", height: "36px", border: "none",
                      backgroundColor: "#fdf9f8", color: "#3a4b63",
                      fontSize: "18px", cursor: "pointer", fontWeight: "700",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e8d0ca")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#fdf9f8")}
                  >
                    +
                  </button>
                </div>

                {/* الإجمالي */}
                <div style={{ textAlign: "center", minWidth: "80px" }}>
                  <p style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>الإجمالي</p>
                  <p style={{ fontSize: "16px", fontWeight: "900", color: "#3a4b63" }}>
                    {(item.price * item.quantity).toFixed(2)} ريال
                  </p>
                </div>

                {/* زر الحذف */}
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    width: "36px", height: "36px", border: "1px solid #ffcdd2",
                    backgroundColor: "#fff5f5", borderRadius: "50%",
                    color: "#e53935", cursor: "pointer", fontSize: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e53935";
                    (e.currentTarget as HTMLButtonElement).style.color = "white";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff5f5";
                    (e.currentTarget as HTMLButtonElement).style.color = "#e53935";
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* ملخص الطلب */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #e8d0ca",
            padding: "24px",
            position: "sticky",
            top: "20px",
            boxShadow: "0 4px 20px rgba(58,75,99,0.06)",
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: "900", color: "#3a4b63", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #e8d0ca" }}>
              ملخص الطلب
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666" }}>
                <span>المنتجات ({items.reduce((a, i) => a + i.quantity, 0)} قطعة)</span>
                <span>{totalPrice().toFixed(2)} ريال</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#22c55e", fontWeight: "600" }}>
                <span>🚚 الشحن</span>
                <span>{totalPrice() >= 199 ? "مجاني" : "سيُحسب عند الطلب"}</span>
              </div>
              {totalPrice() < 199 && (
                <p style={{ fontSize: "11px", color: "#f59e0b", backgroundColor: "#fffbeb", padding: "8px 12px", borderRadius: "8px", margin: 0 }}>
                  💡 أضيفي {(199 - totalPrice()).toFixed(2)} ريال للحصول على شحن مجاني
                </p>
              )}
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "16px 0",
              borderTop: "2px solid #e8d0ca", marginBottom: "20px",
            }}>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "#3a4b63" }}>الإجمالي</span>
              <span style={{ fontSize: "22px", fontWeight: "900", color: "#3a4b63" }}>{totalPrice().toFixed(2)} ريال</span>
            </div>

            <Link href="/checkout" style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", backgroundColor: "#3a4b63", color: "white",
                border: "none", borderRadius: "14px", padding: "16px",
                fontSize: "16px", fontWeight: "900", cursor: "pointer",
                fontFamily: "Cairo, sans-serif", transition: "all 0.2s",
                marginBottom: "12px",
              }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2d3a4f")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3a4b63")}
              >
                إتمام الطلب ←
              </button>
            </Link>

            <Link href="/all" style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", backgroundColor: "transparent", color: "#3a4b63",
                border: "1.5px solid #e8d0ca", borderRadius: "14px", padding: "12px",
                fontSize: "14px", fontWeight: "700", cursor: "pointer",
                fontFamily: "Cairo, sans-serif",
              }}>
                مواصلة التسوق
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}