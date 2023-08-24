export interface JobUpdateReqDto {
	jobId: string
	jobCode: string
	jobTitle: string
	salaryStart: number
	salaryEnd: number
	description: string
	endDate: string
	jobPositionCode: string
	jobStatusCode: string
	employmentTypeCode: string
	hrId: string
	interviewerId: string
}