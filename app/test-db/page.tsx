import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function HomePage() {
  // جلب المنتجات من قاعدة البيانات
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">متجري الاحترافي</h1>
          <p className="text-gray-600">اكتشف أفضل المنتجات بأفضل الأسعار</p>
        </header>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full bg-gray-200">
                {/* تأكد من إضافة رابط الصورة الصحيح في قاعدة البيانات */}
                <div className="flex items-center justify-center h-full text-gray-400">
                   صورة المنتج
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                  <span className="text-lg font-bold text-blue-600">{product.price} ريال</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  إضافة إلى السلة
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">لا توجد منتجات حالياً، ابدأ بإضافة منتجاتك الأولى!</p>
          </div>
        )}
      </div>
    </main>
  );
}