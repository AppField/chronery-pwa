import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { expandCollapse } from '../../core/animations';

@Component({
  selector: 'chy-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  animations: [expandCollapse],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeInputComponent),
    multi: true
  }]
})
export class TimeInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private timeDate: string;

  formControl = new FormControl('', [this.check24Hours]);

  private oldValue: string;
  private destroy$: Subject<boolean>;

  private check24Hours(value: FormControl): boolean | any {
    const regex = new RegExp('^([01]\\d|2[0-3]):?([0-5]\\d)$');
    return regex.test(value.value) ? true : { mismatch24Hours: true };
  }

  private onChange: Function = (value: string) => {
  };

  private onTouch: Function = () => {
  };


  constructor(private datePipe: DatePipe) {
    this.destroy$ = new Subject<boolean>();
  }

  ngOnInit() {
    this.formControl.valueChanges
      .subscribe(value => {
        const time = this.setColon(value);
        if (time !== value) {
          this.formControl.patchValue(time);
        }

        if (this.formControl.valid) {
          this.setValue(value);
        }
      });
  }

  private setColon(value: string): string {
    if (this.oldValue && value && this.oldValue.length < value.length) {
      // Character has been added
      if (value.length === 2) {
        if (value[1] === ':') {
          value = `0${value}`;
        } else {
          value += ':';
        }
      }
    }
    this.oldValue = value;
    return value;
  }

  formatTime(event) {
    let value = event.target.value;
    if (!value) {
      return;
    }
    if (value.length === 3) {
      value += '00';
    } else if (value.length === 4) {
      value += '0';
    }
    this.formControl.patchValue(value);
    this.onTouch();
  }

  private setValue(time: string) {
    const date = new Date(this.timeDate);
    console.log(time);
    const splitted = time.split(':');
    const hours = splitted[0];
    const minutes = splitted[1];
    date.setHours(+hours);
    date.setMinutes(+minutes);
    this.onChange(date.toISOString());
  }

  get mismatch24Hours(): boolean {
    return this.formControl.hasError('mismatch24Hours') && this.formControl.touched;
  }

  writeValue(dateISO: string): void {
    this.timeDate = dateISO || new Date().toISOString();
    this.formControl.patchValue(this.datePipe.transform(dateISO, 'HH:mm'), { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
