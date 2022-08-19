import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { MonitorItemComponent } from './components/monitor-item/monitor-item.component';
import { CardComponent } from './components/card/card.component';
import { ViewMonitorComponent } from './components/view-monitor/view-monitor.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/dialog.component';
import { AddMonitorComponent } from './components/add-monitor/add-monitor.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './services/authconfig.interceptor';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { AlarmDialogComponent } from './components/alarm-dialog/alarm-dialog.component';
import { UpdateMonitorComponent } from './components/update-monitor/update-monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    MonitorComponent,
    MonitorItemComponent,
    CardComponent,
    ViewMonitorComponent,
    ConfirmDialogComponent,
    AddMonitorComponent,
    LineChartComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    UserProfileComponent,
    BarChartComponent,
    AlarmDialogComponent,
    UpdateMonitorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    NgChartsModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
