import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  await prisma.comment.delete({
    where: { id: params.id },
  });

  return NextResponse.json({});
}
