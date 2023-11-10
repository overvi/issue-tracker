import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Validation from "../../validation";

export async function PUT(request : NextRequest , {params} : {params : {id : string}}) {
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
