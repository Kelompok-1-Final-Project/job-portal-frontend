import {
  Pipe,
  PipeTransform
} from "@angular/core";
import {
  BASE_URL,
  BASE_URL_CAN
} from "@constant/api.constant";

@Pipe({
  name: 'urlCandidate',
  standalone: true,
})
export class UrlPipeCandidate implements PipeTransform {
  transform(value: any): string {

    if (value !== undefined) {
      return `${BASE_URL_CAN}/files/${value}`;
    } else {
      return '/assets/default.jpg';
    }
  }
}

@Pipe({
  name: 'urlAdmin',
  standalone: true,
})
export class UrlPipeAdmin implements PipeTransform {
  transform(value: any): string {
    if (value !== undefined) {
      return `${BASE_URL}/files/${value}`;
    } else {
      return '/assets/default.jpg';
    }
  }
}