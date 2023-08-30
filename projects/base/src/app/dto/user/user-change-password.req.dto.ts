export interface UserChangePassReqDto {
    userId:string,
    userOldPass: string,
    userNewPass: string,
    userConfirmNewPass: string
}