import { OptionTestGetResDtos } from "./question-option.res.dto";

export interface QuestionTestGetResDto {
    question : string;
	questionId : string;
	optionGetResDtos: OptionTestGetResDtos[];
}