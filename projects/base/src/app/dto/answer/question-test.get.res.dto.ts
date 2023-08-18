import { OptionTestGetResDtos } from "./question-option.res.dto";

export interface QuestionTestGetResDto {
    question : string;
	questionCode : string;
	optionGetResDtos: OptionTestGetResDtos[];
}