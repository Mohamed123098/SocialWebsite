import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true // if you're using standalone components
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) return '';

    const now = new Date();
    const created = new Date(value);
    const seconds = Math.floor((now.getTime() - created.getTime()) / 1000);

    const intervals: any = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (let key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval > 0) {
        return interval === 1 
          ? `1 ${key} ago` 
          : `${interval} ${key}s ago`;
      }
    }

    return 'just now';
  }
}
