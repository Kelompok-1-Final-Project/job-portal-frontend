import { AnswerInsertReqDto } from "./answer.req.dto";

export interface AnswerCandidateReqDto {
    skillTestId: string,
    candidateId: string,
    answerCandidateReqDtos: AnswerInsertReqDto[];
}