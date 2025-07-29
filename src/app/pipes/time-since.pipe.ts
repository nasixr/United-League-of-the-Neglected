import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince',
  standalone: true
})
export class TimeSincePipe implements PipeTransform {

  transform(value: string): string {
    const startDate = new Date(value);
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (years > 0) {
      return `${years} سنة و ${days} يوم`;
    } else if (days > 0) {
      return `${days} يوم و ${hours} ساعة`;
    } else if (hours > 0) {
      return `${hours} ساعة و ${minutes} دقيقة`;
    } else {
      return `${minutes} دقيقة`;
    }
  }
}