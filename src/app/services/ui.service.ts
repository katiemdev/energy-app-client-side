import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddMonitor: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddMonitor(): void {
    this.showAddMonitor = !this.showAddMonitor;
    this.subject.next(this.showAddMonitor);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
