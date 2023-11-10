"use client";

import useIssues from "@/app/hook/useIssues";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import ButtonPrimary from "../ButtonPrimary";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

import IssueForm from "../_components/IssueForm";

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
