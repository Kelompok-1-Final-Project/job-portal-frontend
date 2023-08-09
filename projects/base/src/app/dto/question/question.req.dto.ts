import { QuestionOptionReqDto } from "./question-option.req.dto"

export interface QuestionReqDto {
	id : number
	question : string
	topicId : number
	typeId : number
	packageId : number
	questionOptions : QuestionOptionReqDto[]
}