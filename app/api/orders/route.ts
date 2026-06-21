import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, address, totalAmount, items } = body;

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail: customerEmail || "no-email@example.com",
        customerPhone,
        address,
        totalAmount: parseFloat(totalAmount),
        status: "قيد التنفيذ",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Prisma Error:", error);
    return NextResponse.json({ error: "فشل في حفظ الطلب" }, { status: 500 });
  }
}