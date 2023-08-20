import { QuestionGetResDto } from "./question.get.res.dto"

export interface TestGetResDto {
    testId: string
    testName: string
    testCode: string
	questionGetResDtos: QuestionGetResDto[] 
}