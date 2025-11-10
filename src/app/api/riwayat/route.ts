import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ambil data dari body
    const body = (await req.json()) as {
      judul: string;
      abstrak: string;
      hasilBidangPenelitian: string;
      confidence: number;
    };

    const { judul, abstrak, hasilBidangPenelitian, confidence } = body;

    // Cek apakah kombinasi userId + judul + abstrak sudah ada
    const existing = await prisma.riwayatKlasifikasi.findFirst({
      where: {
        userId: session.user.id,
        judul,
        abstrak,
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Data sudah pernah diklasifikasikan", existed: true },
        { status: 200 }
      );
    }

    // Simpan data baru
    const newHistory = await prisma.riwayatKlasifikasi.create({
      data: {
        userId: session.user.id,
        judul,
        abstrak,
        hasilBidangPenelitian,
        confidence,
      },
    });

    return NextResponse.json(
      { message: "Riwayat tersimpan", data: newHistory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error menyimpan riwayat:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan riwayat" },
      { status: 500 }
    );
  }
}
