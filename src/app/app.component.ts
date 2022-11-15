import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  themes = ['light', 'dark']
  theme: string = localStorage.getItem('theme') ?? this.themes[0];
  oldTheme: string = this.theme;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, `${this.theme}-theme`);
  }

  themeSelected(): void {
    console.log('Theme selected: ' + this.theme)
    localStorage.setItem('theme', this.theme);

    for (const theme of this.themes) {
      this.renderer.removeClass(document.body, `${theme}-theme`);
    }

    this.renderer.addClass(document.body, `${this.theme}-theme`);
  }
}
