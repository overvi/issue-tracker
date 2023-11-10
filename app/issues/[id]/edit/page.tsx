import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import FormSubmitHandler from "./FormSubmitHandler";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <FormSubmitHandler issue={issue} id={params.id} />;
};

export default EditIssuePage;
