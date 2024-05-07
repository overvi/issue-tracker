"use client";
import React from "react";
import ButtonPrimary from "../../ButtonPrimary";
import IssueForm from "../../_components/IssueForm";
import { useUpdateIssues } from "@/app/hook/useIssues";
import { Issue } from "@prisma/client";

interface Props {
  id: string;
  issue: Issue;
}

const FormSubmitHandler = ({ id, issue }: Props) => {
  const updateUser = useUpdateIssues(id, {
    redirectUrl: "/issues",
  });
  return (
    <IssueForm issue={issue} onSubmit={(data) => updateUser.mutate(data)}>
      <ButtonPrimary>Update The Issue</ButtonPrimary>
    </IssueForm>
  );
};

export default FormSubmitHandler;
