import z from "zod";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOptions";
import { createIssueSchema } from "../validation";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOption);

  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 401 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
