import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public elemTheme: Element | null = document.querySelector('#theme');

  constructor() {
    const themeUrl: string =
      localStorage.getItem('theme') || './assets/css/colors/purple.css';

    this.elemTheme?.setAttribute('href', themeUrl);
  }

  changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.elemTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const linksTheme: NodeListOf<Element> | undefined =
      document.querySelectorAll('.selector');

    linksTheme?.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.elemTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) elem.classList.add('working');
    });
  }
}
