// "use server";

// import { CommentSchema } from "@/app/api/validation";
// import prisma from "@/prisma/client";
// import { revalidatePath } from "next/cache";

// export async function createWatchList(formData: FormData) {
//   const validatedFields = CommentSchema.safeParse({
//     comment: formData.get("comment"),
//     userId: formData.get("userId"),
//     issueId: formData.get("issueId"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const newComment = await prisma.comment.create({
//     data: {
//       content: validatedFields.data.comment,
//       userId: validatedFields.data.userId,
//       issueId: validatedFields.data.issueId,
//     },
//   });

//   revalidatePath(`/api/${userId}/watchlist`);

//   return newWatchList;
// }
