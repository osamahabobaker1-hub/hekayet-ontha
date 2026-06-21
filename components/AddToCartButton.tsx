"use client";
import { useCart } from "@/store/useCart";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => {
        addItem({ ...product, quantity: 1 });
        alert("تمت الإضافة للسلة بنجاح! 🎉");
      }}
      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      إضافة إلى سلة المشتريات
    </button>
  );
}