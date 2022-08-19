import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Monitor } from '../../models/Monitor';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Alarm } from 'src/models/Alarm';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private apiUrl: string = `${environment.SERVER_URL}/monitors`;
  monitors!: Monitor[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMonitors(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.apiUrl);
  }

  getMonitor(monitorId: any): Observable<Monitor> {
    return this.http.get<Monitor>(`${this.apiUrl}/${monitorId}`);
  }

  getUserMonitors(userId: any): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteMonitor(monitorId: any): Observable<Monitor> {
    return this.http.delete<Monitor>(
      `${this.apiUrl}/deleteMonitor/${monitorId}`
    );
  }

  addMonitor(res: any): Observable<Monitor> {
    return this.http.post<Monitor>(`${this.apiUrl}/addMonitor`, {
      name: res.name,
      description: res.description,
      user: this.authService.currentUserValue._id,
    });
  }

  updateMonitor(res: any) {
    return this.http.post<Monitor>(`${this.apiUrl}/updateMonitor`, {
      id: res.id,
      name: res.name,
      description: res.description,
    });
  }

  getAlarms(monitorId: any): Observable<Alarm[]> {
    return this.http.get<Alarm[]>(`${this.apiUrl}/alarm/${monitorId}`);
  }

  addAlarm(res: any): Observable<Alarm> {
    return this.http.post<Alarm>(`${this.apiUrl}/addAlarm`, {
      name: res.name,
      description: res.description,
      threshold: res.threshold,
      monitor: res.monitor,
    });
  }

  updateAlarm(res: any) {
    return this.http.post<Alarm>(`${this.apiUrl}/updateAlarm`, {
      id: res.id,
      name: res.name,
      description: res.description,
      threshold: res.threshold,
    });
  }

  deleteAlarm(alarmId: any) {
    return this.http.delete<Alarm>(`${this.apiUrl}/deleteAlarm/${alarmId}`);
  }

  /* Used to update line chart when new monitor has been added */
  public getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }

  public setRefresh(value: boolean): void {
    this.refresh.next(value);
  }
}
