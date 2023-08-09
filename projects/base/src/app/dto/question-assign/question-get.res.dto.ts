import { QuestionOptionResDto } from "../question/question-option.res.dto"

export interface QuestionGetResDto {
	id : number
	question : string
	topicId : number
	typeCode : string
	packageId : number
	candidateAssignId : number
	questionOptions? : QuestionOptionResDto[]
}