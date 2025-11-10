// /api/dosen/[slug].ts (Next.js App Router / API Route)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan kamu sudah punya prisma client

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const bidang = await prisma.bidangPenelitian.findUnique({
      where: { slug: params.slug },
      include: {
        dosenMajor: {
          select: {
            nama: true,
            bidangPenelitianMajor: true,
            bidangPenelitianMinor: true,
          },
        },
        dosenMinor: {
          select: {
            nama: true,
            bidangPenelitianMajor: true,
            bidangPenelitianMinor: true,
          },
        },
      },
    });

    if (!bidang) {
      return NextResponse.json(
        { message: "Bidang penelitian tidak ditemukan" },
        { status: 404 }
      );
    }

    const allDosen = [...bidang.dosenMajor, ...bidang.dosenMinor];

    return NextResponse.json({ bidang: bidang.nama, dosen: allDosen });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Terjadi kesalahan" }, { status: 500 });
  }
}
