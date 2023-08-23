export interface JobGetResDto {
	id: string
	jobTitle: string
	salaryStart: number
	salaryEnd: number
	description: string
	endDate: string
	companyId:string
	companyName: string
	companyPhoto: string
	industryName: string
	cityName: string
	positionName: string
	statusName: string
	employmentName: string
	createdAt: string
	updatedAt: string
	ver: string
	totalJob:number;
	isBookmark:boolean;
	isApply:boolean;
	saveJobId:string;
}