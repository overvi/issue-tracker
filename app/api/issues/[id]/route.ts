import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Validation from "../../validation";

interface Props {
    params : {id : string}
}

export async function PUT(request : NextRequest , {params} : Props) {
    const body = await request.json()
    const validation = Validation(body)

    if (!validation.success) return NextResponse.json(validation.error.format() , {status : 400});
    
    const updatedIssue = await prisma.issue.update({
        where : {id : parseInt(params.id)},

        data : {
            title : body.title,
            description : body.description
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