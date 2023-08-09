import { CandidateAssignReqDto } from "./candidate-assign.req.dto"

export interface CandidateAssignInsertReqDto {
	candidateAssigns : CandidateAssignReqDto[]
	candidateId : number
	reviewerId : number
	questionId : number[]
}