import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'chy-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  toolbarColor: string;

  constructor(private platform: Platform) {
    this.toolbarColor = !this.platform.is('ios') ? 'primary' : null;
  }

  ngOnInit() {
  }

}
