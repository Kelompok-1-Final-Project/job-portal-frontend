import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ReviewGetAllByIdResDto } from "@dto/review/review-get-all-by-id.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { UpdateResDto } from "@dto/update.res.dto";
import { ReviewUpdateScoreReqDto } from "@dto/review/review-update-score.req.dto";
import { ReviewDetailWithoutIdResDto } from "@dto/review/review-detail-without-id.res.dto";
import { StatusGetResDto } from "@dto/status/status-get.res.dto";

@Injectable({
    providedIn : 'root'
})
export class ReviewService{
    constructor(private base : BaseService){}

    getAll(withToken : boolean) : Observable<ReviewGetAllByIdResDto[]>{
        return this.base.get<ReviewGetAllByIdResDto[]>(`${BASE_URL}/reviews/reviewfilter`, withToken)
    }

    update(data : ReviewUpdateScoreReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/reviews`, data)
    }

    updateStatus() : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/reviews/status`, null)
    }

    getReviewDetail(reviewId : number) : Observable<ReviewDetailWithoutIdResDto[]>{
        return this.base.get<ReviewDetailWithoutIdResDto[]>(`${BASE_URL}/reviews/detailreview/${reviewId}`, true)
    }

    getAllAccStatus () : Observable<StatusGetResDto[]>{
        return this.base.get<StatusGetResDto[]>(`${BASE_URL}/statuses`)
    }
}