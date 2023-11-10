"use client";

import { createIssueSchema } from "@/app/api/issues/route";
import useIssues from "@/app/hook/useIssues";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { z } from "zod";
import ButtonPrimary from "../ButtonPrimary";
import IssueForm from "../_components/IssueForm";

type Validation = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const addUser = useIssues();

  return (
    <>
      <IssueForm onSubmit={(data) => addUser.mutate(data)}>
        <ButtonPrimary>Add The Issue</ButtonPrimary>
      </IssueForm>
    </>
  );
};

export default NewIssuePage;
