import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent implements OnInit {
  lang: string;
  languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];
  dir: Direction;

  constructor(private translateService: TranslateService) {
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.lang);
    document.documentElement.lang = this.lang;
    document.documentElement.dir = this.lang == 'ar' ? 'rtl' : 'ltr';
    this.dir = document.documentElement.dir as Direction;
  }

  ngOnInit(): void {}

  changeLang(lang: string) {
    this.lang = lang;
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  getLangName(): string {
    return this.languages.find((x) => x.code == this.lang)?.name || '';
  }
}
