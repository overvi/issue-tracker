import z from 'zod'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOption from '@/app/auth/authOptions'

export const createIssueSchema = z.object({
    title : z.string().min(1 , 'Title is required').max(250),
    description : z.string().min(1 , 'Description is Required')
})

export async function POST(request : NextRequest) {
    const session = await getServerSession(authOption)

    if (!session)
      return NextResponse.json({} , {status : 401})
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)

    if (!validation.success)
      return NextResponse.json(validation.error.format(), {status : 401})

    const newIssue = await prisma.issue.create({
        data : {
            title : body.title,
            description : body.description
        }
    })

    return NextResponse.json(newIssue , {status : 201})
}