import { QuestionTestGetResDto } from "./question-test.get.res.dto";

export interface TestGetResDto {
    testId:string;
    testName:string;
    testCode:string;
    questionGetResDtos:QuestionTestGetResDto[];
}