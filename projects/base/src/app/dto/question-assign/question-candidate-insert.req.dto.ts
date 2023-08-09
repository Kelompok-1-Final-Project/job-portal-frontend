import { QuestionReqDto } from "../question/question.req.dto"

export interface QuestionCandidateInsertReqDto {
	candidateId : number
	questionReqDtos : QuestionReqDto[]
	candidateAssignId : number
}