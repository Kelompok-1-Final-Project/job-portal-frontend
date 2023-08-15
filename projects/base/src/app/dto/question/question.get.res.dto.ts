import { QuestionOptionResDto } from "./question-option.res.dto"

export interface QuestionGetResDto {
    questionId: string
    question: string
    listQuestionOption: QuestionOptionResDto[]
}