export interface SearchJobReqDto {
  jobName: string,
  location: string,
  position: string,
  employmentType: string[],
  salaryStart: number,
  salaryEnd: number,
  userId : string
}