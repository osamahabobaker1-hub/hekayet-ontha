"use client";
import { useCart } from "@/store/useCart";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        backgroundColor: "white",
        border: "1px solid #e8d0ca",
        borderRadius: "25px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 24px rgba(58,75,99,0.12)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 6px rgba(0,0,0,0.02)";
        }}
      >
        {/* منطقة الصورة */}
        <div style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backgroundColor: "#fdf9f8" }}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
              alt={product.name}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.setAttribute("style", "display:block");
              }}
            />
          ) : null}
          <span style={{ fontSize: "40px", display: product.imageUrl ? "none" : "block" }}>🌸</span>
        </div>

        {/* تفاصيل المنتج */}
        <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#fdf9f8", flexGrow: 1 }}>
          <h3 style={{ fontSize: "16px", color: "#3a4b63", fontWeight: "bold", marginBottom: "10px" }}>{product.name}</h3>
          <p style={{ fontSize: "11px", color: "#888", marginBottom: "15px", height: "32px", overflow: "hidden" }}>{product.description}</p>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "10px", borderRadius: "15px", border: "1px solid #eee" }}>
            <span style={{ fontWeight: "900", color: "#3a4b63" }}>{product.price} ريال</span>
            <button
              onClick={(e) => {
                e.preventDefault(); // منع فتح الصفحة عند الضغط على +
                addItem({ ...product, quantity: 1 });
              }}
              style={{ backgroundColor: "#3a4b63", color: "white", border: "none", borderRadius: "50%", width: "35px", height: "35px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}