import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor( public settingsService: SettingsService) { }

  ngOnInit() {
    this.placeCheck();
  }

  changeTheme( theme: string, link: ElementRef ) {
    this.applyCheck(link);
    this.settingsService.applyTheme( theme );
  }

  applyCheck( link ) {
    const selectors: any = document.getElementsByClassName('selector');
    for ( const ref of selectors ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  placeCheck() {
    const theme = this.settingsService.setting.theme;
    const selectors: any = document.getElementsByClassName('selector');
    for ( const ref of selectors ) {
      if ( ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
