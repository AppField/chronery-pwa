import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { WorkingHours } from '../../models/working-hours';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable, Subject } from 'rxjs';
import { Project } from '../../models/project';
import { appear } from '../../core/animations';
import { WorkingHoursService } from '../../services/working-hours/working-hours.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.page.html',
  styleUrls: ['./working-hours.page.scss'],
  animations: [
    appear
  ]
})
export class WorkingHoursPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  toolbarColor: string;
  selectedDate: string;

  workingHours: WorkingHours[] = [];
  projects$: Observable<Project[]>;

  constructor(private platform: Platform,
              private projectsService: ProjectsService,
              private workingHoursService: WorkingHoursService
  ) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
    this.selectedDate = new Date().toISOString();

    this.projects$ = this.projectsService.items$;

    this.workingHoursService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((workingHours: WorkingHours[]) => {
        this.workingHours = workingHours;
      });
  }

  ngOnInit() {
  }

  updateWorkingHours(workingHours: WorkingHours): void {
    console.log('working hours to update', workingHours);
  }

  addWorkingHours(): void {
    this.workingHours.unshift(new WorkingHours());
  }

  deleteWorkingHours(workingHours: WorkingHours): void {
    // TODO: Implement actual delete method
    this.workingHours.pop();
  }

  /*
  * Used to remove opened modal when pressing the back button on a smartphone.
  * */
  // backButtonListener(): void {
  //   window.onpopstate = (evt) => {
  //     // Close any active modals or overlays
  //     let activePortal = this._ionicApp._loadingPortal.getActive() ||
  //       this._ionicApp._modalPortal.getActive() ||
  //       this._ionicApp._toastPortal.getActive() ||
  //       this._ionicApp._overlayPortal.getActive();
  //     if (activePortal) {
  //       activePortal.dismiss();
  //       return;
  //     }
  //   }
  // }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
