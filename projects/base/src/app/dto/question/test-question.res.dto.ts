import { TestOptionResDto } from "./test-option.res.dto"

export interface TestQuestionResDto {
    question: string
    questionId: string
    questionCode: string
    optionGetResDtos: TestOptionResDto[]
}