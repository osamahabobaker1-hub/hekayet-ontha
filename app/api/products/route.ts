import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, imageUrl, category, stock } = body;

    // حفظ المنتج في قاعدة بيانات SQLite عبر Prisma
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        category: category || "عام", // إذا لم تختر قسماً سيصنف كـ "عام"
        stock: parseInt(stock),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("خطأ في إضافة المنتج:", error);
    return NextResponse.json({ message: "فشل في إضافة المنتج" }, { status: 500 });
  }
}