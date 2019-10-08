import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  setting: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  // tslint:disable-next-line:variable-name
  constructor( @Inject( DOCUMENT ) private _document, ) {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('setting', JSON.stringify(this.setting));
  }

  loadSettings() {
    if ( localStorage.getItem('setting') ) {
      this.setting = JSON.parse( localStorage.getItem('setting'));
      this.applyTheme(this.setting.theme);
    } else {
      this.applyTheme(this.setting.theme);
    }
  }

  applyTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    this.setting.theme = theme;
    this.setting.themeUrl = url;
    this.saveSettings();
  }
}

interface Settings {
  themeUrl: string;
  theme: string;
}
