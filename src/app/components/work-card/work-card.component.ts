import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { merge, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { differenceInSeconds } from 'date-fns';
import { WorkingHours } from '../../models/working-hours';
import { getDateTime, getDateWithCurrentTime } from '../../utils/utils';
import { timeIsAfter } from '../../utils/custom-validators';
import { expandCollapse } from '../../core/animations';
import { Project } from '../../models/project';

@Component({
  selector: 'chy-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss'],
  animations: [expandCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkCardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup;
  displayFormat = 'HH:mm';

  @Input() projects: Project[];
  @Input() workingHour: WorkingHours;
  @Output() deleteWorkingHours = new EventEmitter();

  constructor(public modalCtrl: ModalController,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      project: [this.workingHour.project, Validators.required],
      from: [this.workingHour.from, Validators.required],
      to: [this.workingHour.to, [timeIsAfter]],
      comment: [this.workingHour.comment],
      minutesSpent: [this.workingHour.minutesSpent]
    });


    // Used to calculate minutesSpent when from or to time changes
    const fromControl = this.form.controls['from'];
    const toControl = this.form.controls['to'];

    fromControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        merge(toControl.valueChanges)
      )
      .subscribe(() => this.setMinutesSpent());
  }

  get displayProject(): string {
    const project = this.form.get('project').value;
    if (project && project.hasOwnProperty('id')) {
      return `${project.name} - ${project.number}`;
    }
  }

  async openProjectModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectModalComponent,
      componentProps: { projects: this.projects, project: 'Nummer 6' },
    });

    modal.onDidDismiss()
      .then((data) => {
        const project = data['data'];

        if (project) {
          this.form.get('project').setValue(project);
          this.cd.detectChanges();
        }
        this.form.controls['project'].markAsTouched();
        this.cd.detectChanges();
      });

    return await modal.present();
  }

  onToFocus(): void {
    const toValue = this.form.controls['to'].value;
    if (toValue === '' || !toValue) {
      setTimeout(() => {
        this.form.controls['to'].setValue(getDateWithCurrentTime().toISOString());
      });

    }
  }

  setMinutesSpent(): void {
    const from = this.form.controls['from'].value;
    const to = this.form.controls['to'].value;

    const fromMinutes = getDateTime(from);
    const toMinutes = getDateTime(to);

    // const differenceMinutes = differenceInMinutes(toMinutes, fromMinutes);
    const differenceSeconds = differenceInSeconds(toMinutes, fromMinutes);
    const differenceMinutes = differenceSeconds / 60;

    this.form.controls['minutesSpent'].setValue(differenceMinutes > 0 ? differenceMinutes : 0);
  }

  removeWorkingHours(): void {
    this.deleteWorkingHours.emit(this.workingHour);
  }

  saveWorkingHours(): void {
    if (this.form.valid) {
      console.log('Form is VALID!');
      console.log(this.form.value);
    } else {
      const keys = Object.keys(this.form.controls);
      keys.forEach((key: string) => {
        this.form.controls[key].markAsTouched();
        this.form.controls[key].markAsDirty();
      });

      console.log('Form is INVALID!');
    }
  }

  // GETTER FOR VALIDATIONS

  get projectRequired(): boolean {
    return this.form.get('project').hasError('required') && this.form.get('project').touched;
  }

  get fromRequired(): boolean {
    return this.form.get('from').hasError('required') && this.form.get('from').touched;
  }

  get toRequired(): boolean {
    return this.form.get('to').hasError('required') && this.form.get('to').touched;
  }

  get toIsNotAFter(): boolean {
    return this.form.get('to').hasError('isNotAfter') && this.form.get('to').value != '';
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
