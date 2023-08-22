import { TestQuestionResDto } from "./test-question.res.dto"

export interface TestGetResDto {
    testId: string
    testName: string
    testCode: string
	questionGetResDtos: TestQuestionResDto[] 
}