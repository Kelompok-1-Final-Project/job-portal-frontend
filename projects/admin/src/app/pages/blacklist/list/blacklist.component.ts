import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { BlacklistGetResDto } from "@dto/blacklist/blacklist.get.res.dto";
import { BlacklistService } from "@serviceAdmin/blacklist.service";

@Component({
  selector: 'blacklist',
  templateUrl: './blacklist.component.html'
})
export class BlacklistComponent implements OnInit {

  blacklist!: BlacklistGetResDto[]

  constructor(
    private blacklistService: BlacklistService,
    private title: Title
  ){
    this.title.setTitle('Blacklist | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getBlacklist()
  }

  getBlacklist() {
    this.blacklistService.getAll().subscribe(result => {
      this.blacklist = result
    })
  }
}