"use client";
import { CreateSurveyRequest } from "@/api/survey/types"
import { Button } from "@/components/ui/button"
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useCreateSurvey } from "@/api/survey/use-create-survey"

type Props = {};

const page = (props: Props) => {

  // handle create a survey button click
  /**
   * 1. create a new survey in the BE
   * 2. redirect user to /survey/:surveyId/create/question
   */
  // get workspaveId from the URL
  const { workspaceId, companyId } = useParams() as { workspaceId: string, companyId: string };
  const workspaceIdString = workspaceId.toString();
  const {mutate: createSurvey} = useCreateSurvey();
  const router = useRouter();
  const handleCreateSurvey = () => {
    if (!workspaceId) {
      return;
    }
    const survey: CreateSurveyRequest = {
      workspaceId:workspaceIdString,
      questions: [],
      language: "en",
      config: {},
      type: "email",
      version: 1,
      isDeleted: false
    }
    createSurvey(survey, {
      onSuccess: (data) => {
        if (data) {
          router.push(`/c/${companyId}/w/${workspaceId}/survey/${data.response?._id}/editor/create/question`)
        }}
    });
  }

  return (
    <Button
      onClick={handleCreateSurvey}
    > Create a Survey </Button>
  )
};

export default page;
