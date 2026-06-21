"use client";
import { useCart } from "@/store/useCart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (items.length === 0 && !success) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const orderData = {
      customerName: formData.get("name") as string,
      customerEmail: formData.get("email") as string,
      customerPhone: formData.get("phone") as string,
      address: formData.get("address") as string,
      totalAmount: totalPrice(),
      items: items,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        setSuccess(true);
      } else {
        alert("حدث خطأ في إرسال الطلب، حاولي مرة أخرى");
      }
    } catch {
      alert("حدث خطأ في الاتصال");
    }

    setLoading(false);
  };

  // صفحة النجاح
  if (success) {
    return (
      <div style={{ backgroundColor: "#fdf9f8", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl" }}>
        <div style={{ textAlign: "center", padding: "60px", backgroundColor: "white", borderRadius: "24px", border: "1px solid #e8d0ca", maxWidth: "480px", boxShadow: "0 8px 30px rgba(58,75,99,0.08)" }}>
          <div style={{ fontSize: "70px", marginBottom: "20px" }}>🎉</div>
          <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#3a4b63", marginBottom: "12px", fontFamily: "serif" }}>
            تم استلام طلبك!
          </h2>
          <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.8", marginBottom: "28px" }}>
            شكراً لك على طلبك من حكاية أنثى 🌸<br />
            سيتم التواصل معك قريباً لتأكيد الطلب
          </p>
          <button
            onClick={() => router.push("/")}
            style={{
              backgroundColor: "#3a4b63", color: "white", border: "none",
              borderRadius: "30px", padding: "14px 36px", fontSize: "15px",
              fontWeight: "700", cursor: "pointer", fontFamily: "Cairo, sans-serif",
            }}
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#fdf9f8", minHeight: "100vh", direction: "rtl", padding: "30px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <h1 style={{
          fontSize: "26px", fontWeight: "900", color: "#3a4b63",
          marginBottom: "30px", borderRight: "5px solid #3a4b63",
          paddingRight: "14px", fontFamily: "Cairo, sans-serif",
        }}>
          إتمام الطلب
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px", alignItems: "start" }}>

          {/* فورم البيانات */}
          <form onSubmit={handleSubmit}>
            <div style={{
              backgroundColor: "white", borderRadius: "20px",
              border: "1px solid #e8d0ca", padding: "30px",
              boxShadow: "0 2px 8px rgba(58,75,99,0.04)",
            }}>
              <h2 style={{ fontSize: "17px", fontWeight: "900", color: "#3a4b63", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ backgroundColor: "#e8d0ca", width: "28px", height: "28px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>1</span>
                بيانات التوصيل
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>الاسم الكامل *</label>
                  <input name="name" required placeholder="أدخل اسمك الثلاثي" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>البريد الإلكتروني</label>
                  <input name="email" type="email" placeholder="example@email.com" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>رقم الجوال *</label>
                  <input name="phone" required placeholder="05xxxxxxxx" style={inputStyle} />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>العنوان السكاني *</label>
                  <textarea
                    name="address" required
                    placeholder="المدينة، الحي، اسم الشارع، رقم المنزل"
                    style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
                  />
                </div>

              </div>
            </div>

            {/* طريقة الدفع */}
            <div style={{
              backgroundColor: "white", borderRadius: "20px",
              border: "1px solid #e8d0ca", padding: "30px",
              boxShadow: "0 2px 8px rgba(58,75,99,0.04)",
              marginTop: "16px",
            }}>
              <h2 style={{ fontSize: "17px", fontWeight: "900", color: "#3a4b63", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ backgroundColor: "#e8d0ca", width: "28px", height: "28px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>2</span>
                طريقة الدفع
              </h2>

              <div style={{
                backgroundColor: "#fdf9f8", border: "2px solid #3a4b63",
                borderRadius: "14px", padding: "16px 20px",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#3a4b63", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "white" }} />
                </div>
                <div>
                  <p style={{ fontWeight: "700", color: "#3a4b63", fontSize: "14px", margin: 0 }}>الدفع عند الاستلام 💵</p>
                  <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>ادفعي نقداً عند استلام طلبك</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", backgroundColor: loading ? "#aaa" : "#3a4b63",
                color: "white", border: "none", borderRadius: "14px",
                padding: "18px", fontSize: "17px", fontWeight: "900",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Cairo, sans-serif", marginTop: "16px",
                transition: "background-color 0.2s",
              }}
            >
              {loading ? "جاري إرسال الطلب..." : "✅ تأكيد الطلب"}
            </button>
          </form>

          {/* ملخص السلة */}
          <div style={{
            backgroundColor: "white", borderRadius: "20px",
            border: "1px solid #e8d0ca", padding: "24px",
            position: "sticky", top: "20px",
            boxShadow: "0 4px 20px rgba(58,75,99,0.06)",
          }}>
            <h2 style={{ fontSize: "17px", fontWeight: "900", color: "#3a4b63", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #e8d0ca" }}>
              ملخص سلتك
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "54px", height: "54px", flexShrink: 0,
                    backgroundColor: "#fdf9f8", borderRadius: "10px",
                    border: "1px solid #e8d0ca", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: "20px" }}>🌸</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: "700", color: "#3a4b63", margin: "0 0 2px" }}>{item.name}</p>
                    <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>الكمية: {item.quantity}</p>
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: "900", color: "#3a4b63", flexShrink: 0 }}>
                    {(item.price * item.quantity).toFixed(2)} ريال
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #e8d0ca", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#666" }}>
                <span>المجموع</span>
                <span>{totalPrice().toFixed(2)} ريال</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#22c55e", fontWeight: "600" }}>
                <span>🚚 الشحن</span>
                <span>{totalPrice() >= 199 ? "مجاني" : "سيُحسب لاحقاً"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "17px", fontWeight: "900", color: "#3a4b63", paddingTop: "10px", borderTop: "2px solid #e8d0ca" }}>
                <span>الإجمالي</span>
                <span>{totalPrice().toFixed(2)} ريال</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px",
  borderRadius: "10px", border: "1.5px solid #e8d0ca",
  fontSize: "14px", color: "#3a4b63",
  backgroundColor: "#fdf9f8", outline: "none",
  fontFamily: "Cairo, sans-serif",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "13px",
  fontWeight: "700", color: "#3a4b63",
  marginBottom: "8px",
};