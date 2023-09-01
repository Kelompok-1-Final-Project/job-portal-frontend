import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ReportGetResDto } from "@dto/report/report.get.res.dto";
import { ReportService } from "@serviceAdmin/report.service";
import { convertUTCToLocalDate } from "@utils/date-convert.util";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html'
})
export class ReportListComponent implements OnInit {
  reports!: ReportGetResDto[]
  reportUrl = ""
  startDate! : string
  endDate!: string

  filterData = this.fb.group({
    startDateTemp: ['', [Validators.required]],
    endDateTemp: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  })

  constructor(
    private title: Title,
    private reportService: ReportService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    this.title.setTitle('Report | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getData(this.startDate, this.endDate)
  }

  convertStartDate(event: any) {
    this.filterData.patchValue({
      startDate: convertUTCToLocalDate(event)
    })
  }

  convertEndDate(event: any) {
    this.filterData.patchValue({
      endDate: convertUTCToLocalDate(event)
    })
  }

  filter() {
    const data = this.filterData.getRawValue()
    const newStartDate = convertUTCToLocalDate(data.startDateTemp as any);
    let newEndDate: string = '';
    if (data.endDateTemp != null) {
      newEndDate = convertUTCToLocalDate(data.endDateTemp as any);
      console.log("New End Date :  " + newEndDate);
    }
    this.getData(newStartDate, newEndDate);

    this.reportUrl = `http://localhost:8080/reports/download?start=${newStartDate}&end=${newEndDate}`
    console.log(this.reportUrl)
  }

  getData(start: string, end: string) {
    firstValueFrom(this.reportService.getAll(start, end)).then(result => {
      this.reports = result
    })
  }
}