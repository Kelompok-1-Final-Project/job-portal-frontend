import { QuestionOptionReqDto } from "./question-option.req.dto"

export interface QuestionInsertReqDto {
    question: string
    listQuestionOption: QuestionOptionReqDto[]
}