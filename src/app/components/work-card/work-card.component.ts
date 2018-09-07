import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utils/custom-validators';
import { merge, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as differenceInMinutes from 'date-fns/difference_in_minutes';
import { Utils } from '../../utils/utils';
import { WorkingHours } from '../../models/working-hours';

@Component({
  selector: 'chy-work-card',
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss']
})
export class WorkCardComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup;
  displayFormat = 'HH:mm';
  actionSheetOptions: any = {
    header: 'Projekt',
    subHeader: 'Wähle das Projekt aus, für welches du arbeitest.'
  };

  // TODO: remove with service
  projects = [
    { name: 'Test Project 1', number: 'TP1' },
    { name: 'Project 2', number: 'TP2' },
    { name: 'Test Project 1', number: 'TP1' },
    { name: 'Web Design', number: 'WD' },
    { name: 'Backend', number: 'BE' },
    { name: 'Firebase Setup', number: 'FBS' },
    { name: 'Uni Project', number: 'UP' },
    { name: 'Something', number: 'ST' }
  ];

  @Input() workingHour: WorkingHours;
  @Output() deleteWorkingHours = new EventEmitter();

  constructor(public modalCtrl: ModalController,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      project: [this.workingHour.project, Validators.required],
      from: [this.workingHour.from, Validators.required],
      to: [this.workingHour.to, [CustomValidators.isAfter]],
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

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectModalComponent,
      componentProps: { project: 'Nummer 6' },
    });

    modal.onDidDismiss()
      .then((data) => {
        const project = data['project'];
        console.log('project from modal selected', project);
      });

    return await modal.present();
  }

  onToFocus(event): void {
    // const toValue = this.form.controls['to'].value;
    // if (toValue === '' || !toValue) {
    //   setTimeout(() => {
    //     this.form.controls['to'].patchValue(new Date().toISOString());
    //   });
    //
    // }
  }

  setMinutesSpent(): void {
    const from = this.form.controls['from'].value;
    const to = this.form.controls['to'].value;

    const fromMinutes = Utils.getDateTime(from);
    const toMinutes = Utils.getDateTime(to);

    const differenceMinutes = differenceInMinutes(toMinutes, fromMinutes);
    this.form.controls['minutesSpent'].setValue(differenceMinutes > 0 ? differenceMinutes : 0);
  }

  removeWorkingHours(): void {
    console.log('WorkingHours to remove', this.workingHour);
    this.deleteWorkingHours.emit(this.workingHour);
  }

  saveWorkingHours(): void {
    if (this.form.valid) {
      console.log('Form is VALID!');
      console.log(this.form.value);
    } else {
      console.log('Form is INVALID!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
