import { QuestionOptionReqDto } from "./question-option.req.dto"

export interface QuestionInsertReqDto {
	question : string
	topicId : number
	typeId : number
	packageId : number
	questionOptions? : QuestionOptionReqDto[]
}