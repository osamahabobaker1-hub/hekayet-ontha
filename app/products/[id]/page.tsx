import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);

  // جلب بيانات المنتج المحدد من قاعدة البيانات
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound(); // إذا لم يجد المنتج يعرض صفحة 404
  }

  return (
    <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* قسم الصورة التي رفعتها من جهازك */}
      <div className="bg-gray-200 rounded-2xl aspect-square flex items-center justify-center text-gray-500 overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
      </div>

      {/* تفاصيل المنتج الحقيقية */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-blue-600 font-bold mb-6">{product.price} ريال</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-gray-700 leading-relaxed">
          {product.description}
        </div>
        <p className="text-sm text-gray-500 mb-8">الكمية المتوفرة: {product.stock} قطعة</p>
        
        <button className="bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">
          إضافة المنتج للسلة
        </button>
      </div>
    </div>
  );
}