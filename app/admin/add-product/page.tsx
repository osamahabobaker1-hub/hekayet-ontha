"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("عام");
  const [image, setImage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // تحويل الصورة إلى Base64 بشكل صحيح
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImage(result);    // Base64 كاملة تبدأ بـ data:image/...
      setPreview(result);  // للمعاينة
    };
    reader.readAsDataURL(file); // هذا هو الصح
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("الرجاء رفع صورة للمنتج");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        description,
        imageUrl: image,   // Base64 كاملة
        category,
        stock: 10,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/all");
      router.refresh();
    } else {
      const err = await res.json();
      alert("فشل الحفظ: " + (err.message || "خطأ غير معروف"));
    }
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      direction: "rtl",
    }}>
      <h2 style={{ color: "#3a4b63", marginBottom: "24px", textAlign: "center", fontSize: "22px", fontWeight: "900" }}>
        إضافة منتج جديد — حكاية أنثى
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* رفع الصورة */}
        <div style={{
          border: "2px dashed #e8d0ca",
          borderRadius: "15px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#fdf9f8",
          cursor: "pointer",
        }}
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          {preview ? (
            <img src={preview} style={{ width: "160px", height: "160px", objectFit: "contain", borderRadius: "10px" }} alt="معاينة" />
          ) : (
            <div>
              <p style={{ fontSize: "32px", marginBottom: "8px" }}>📷</p>
              <p style={{ fontSize: "13px", color: "#999" }}>اضغط لاختيار صورة من جهازك</p>
            </div>
          )}
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            required
          />
        </div>

        {/* اسم المنتج */}
        <input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        {/* السعر */}
        <input
          type="number"
          placeholder="السعر (ريال)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />

        {/* التصنيف */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="عام">عام</option>
          <option value="مواليد">👶 مواليد</option>
          <option value="زفاف">💍 زفاف</option>
          <option value="تخرج">🎓 تخرج</option>
          <option value="أعياد-ميلاد">🎂 أعياد ميلاد</option>
        </select>

        {/* الوصف */}
        <textarea
          placeholder="وصف المنتج"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
        />

        {/* زر الحفظ */}
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#aaa" : "#3a4b63",
            color: "white",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {loading ? "جاري الحفظ..." : "🌸 حفظ ونشر المنتج"}
        </button>

      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #e8d0ca",
  fontSize: "14px",
  color: "#3a4b63",
  backgroundColor: "#fdf9f8",
  outline: "none",
  width: "100%",
  fontFamily: "Cairo, sans-serif",
};