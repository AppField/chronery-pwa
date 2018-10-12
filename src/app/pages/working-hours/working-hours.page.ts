import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { WorkingHours } from '../../models/working-hours';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable, Subject } from 'rxjs';
import { Project } from '../../models/project';
import { appear, fadeScaleInOut } from '../../core/animations';
import { WorkingHoursService } from '../../services/working-hours/working-hours.service';
import { takeUntil } from 'rxjs/operators';
import { getDateFromObject } from '../../utils/utils';


@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.page.html',
  styleUrls: ['./working-hours.page.scss'],
  animations: [
    appear,
    fadeScaleInOut
  ]
})
export class WorkingHoursPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  toolbarColor: string;
  selectedDate: string | any;
  hideAddButton = false;

  workingHours: WorkingHours[] = [];
  projects: Project[] = [];

  constructor(private platform: Platform,
              private projectsService: ProjectsService,
              private workingHoursService: WorkingHoursService
  ) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
    this.selectedDate = new Date().toISOString();

    this.projectsService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects: Project[]) => this.projects = projects);

    this.workingHoursService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((workingHours: WorkingHours[]) => {
        this.workingHours = workingHours;
        this.hideAddButton = this.checkWorkingHoursCompletion();
      });
  }

  ngOnInit() {
  }

  private checkIfProjectsHaveChanged(): void {
    this.workingHours.forEach((wH: WorkingHours) => {
      const project = this.projects.filter((p: Project) => p.id === wH.project.id && p.updatedAt !== wH.project.updatedAt)[0];
      if (project) {
        wH.project = project;
        this.updateWorkingHours(wH);
      }
    });
  }

  /* CRUD OPERATIONS */

  async getWorkingHours(): Promise<void> {
    const date = getDateFromObject(this.selectedDate);

    await this.workingHoursService.getWorkingHoursByDate(date);
    this.checkIfProjectsHaveChanged();
  }

  updateWorkingHours(workingHours: WorkingHours): void {
    this.workingHoursService.updateItem(workingHours);
    this.hideAddButton = false;
  }

  addWorkingHours(): void {
    const date = typeof this.selectedDate === 'string' ? new Date(this.selectedDate) : getDateFromObject(this.selectedDate);
    const newWorkingHours = new WorkingHours(date);
    this.workingHoursService.addItem(newWorkingHours);
  }

  deleteWorkingHours(workingHours: WorkingHours): void {
    // TODO: Implement actual delete method
    this.workingHoursService.deleteItem(workingHours);
  }

  /* END CRUD OPERATIONS */

  /**
   *  Check if there are any Working Hours which don't have spent minutes
   *  There these are uncompleted working hours
   */
  checkWorkingHoursCompletion(): boolean {
    return this.workingHours
      .filter((workingHours: WorkingHours) => workingHours.minutesSpent != null).length !== this.workingHours.length;
  }

  trackById(index: number, workingHours: WorkingHours): string {
    if (workingHours) {
      return workingHours.id;
    }
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

    // reset Working Hours in service to todays data
    const today = new Date();
    this.workingHoursService.getWorkingHoursByDate(today);
  }
}
