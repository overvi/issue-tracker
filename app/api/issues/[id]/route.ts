import prisma from "@/prisma/client";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PatchIssueSchema } from "../../validation";

interface Props {
  params: { id: string };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = auth();

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = PatchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { assignedUserId, title, description, status, comment } = body;

  if (assignedUserId) {
    const user = await clerkClient.users.getUser(assignedUserId);
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      status: status || "IN_PROGRESS",
      title,
      description,
      assignedToUserId: assignedUserId,
      comments: {
        create: {
          ...comment,
        },
      },
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  await prisma.issue.delete({
    where: { id: params.id },
    include: {
      comments: true,
    },
  });

  return NextResponse.json({});
}
