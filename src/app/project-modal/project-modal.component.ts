import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, Searchbar } from '@ionic/angular';

@Component({
  selector: 'chy-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements OnInit {
  @ViewChild('searchBar') searchBar: Searchbar;

  @Input() project: any;

  toolbarColor: string;

  projects = [
    {name: 'Test Project 1', number: 'TP1'},
    {name: 'Project 2', number: 'TP2'},
    {name: 'Test Project 1', number: 'TP1'},
    {name: 'Web Design', number: 'WD'},
    {name: 'Backend', number: 'BE'},
    {name: 'Firebase Setup', number: 'FBS'},
    {name: 'Uni Project', number: 'UP'},
    {name: 'Something', number: 'ST'}
  ];


  constructor(private platform: Platform,
              private modalCtrl: ModalController) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
  }

  ngOnInit() {
  }

  @HostListener('ionModalDidPresent')
  modalDidPresent(event) {
    console.log('Did present');
  }


  onCancel() {
    // console.log('will dismiss');
    this.modalCtrl.dismiss();
  }

}
