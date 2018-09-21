import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { Subject } from 'rxjs';

describe('AppComponent', () => {

  let platformReadySpy, platformSpy;

  beforeEach(async(() => {
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: SwUpdate, useFactory: () => new MockSwUpdate(true) }
      ],
      imports: [RouterTestingModule.withRoutes([]), ServiceWorkerModule ],
    }).compileComponents();
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });

  it('should have menu labels', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(2);
    expect(menuItems[0].textContent).toContain('Dashboard');
    expect(menuItems[1].textContent).toContain('Arbeitsstunden');
    expect(menuItems[2].textContent).toContain('Bericht');
    expect(menuItems[3].textContent).toContain('Projekte');
    expect(menuItems[4].textContent).toContain('Einstellungen');
  });

  it('should have urls', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(2);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/dashboard');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/working-hours');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/report');
    expect(menuItems[3].getAttribute('ng-reflect-router-link')).toEqual('/projects');
    expect(menuItems[4].getAttribute('ng-reflect-router-link')).toEqual('/settings');
  });

});

class MockSwUpdate {
  $$availableSubj = new Subject<{available: {hash: string}}>();
  $$activatedSubj = new Subject<{current: {hash: string}}>();

  available = this.$$availableSubj.asObservable();
  activated = this.$$activatedSubj.asObservable();

  activateUpdate = jasmine.createSpy('MockSwUpdate.activateUpdate')
    .and.callFake(() => Promise.resolve());

  checkForUpdate = jasmine.createSpy('MockSwUpdate.checkForUpdate')
    .and.callFake(() => Promise.resolve());

  constructor(public isEnabled: boolean) {}
}
