import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Validation, { PatchIssueSchema } from "../../validation";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOptions";

interface Props {
    params : {id : string}
}

export async function PATCH(request : NextRequest , {params} : Props) {
    // const session = getServerSession(authOption)
    // if (!session) return NextResponse.json({} , {status : 401})
    const body = await request.json()
    
    const validation = PatchIssueSchema.safeParse(body)
    
    if (!validation.success) return NextResponse.json(validation.error.format() , {status : 400});
    
    const { assignedToUserId , title , description } = body

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where : {id : assignedToUserId}
        })
        
        if (!user)
          return NextResponse.json(
        {error : 'Invalid User'} , 
        {status : 400})
    }
    
    
    const issue = await prisma.issue.findUnique({where : { id : parseInt(params.id) }})


    if (!issue) return NextResponse.json({error : ' Invalid Issue '} , {status : 404});
    
  
    const updatedIssue = await prisma.issue.update({
        where : {id : issue.id},

        data : {
            title,
            description,
            assignedToUserId,
            
        }
    })

    return NextResponse.json(updatedIssue , {status : 200})

}

export async function DELETE(request : NextRequest , { params } : Props) {
     await prisma.issue.delete({
        where : {id : parseInt(params.id)}
    })

    return NextResponse.json({})
}