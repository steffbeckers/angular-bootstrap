import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

export interface Theme {
  key: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private styleLink?: HTMLLinkElement;

  theme: string | null;
  themes: Theme[] = [
    {
      key: 'light',
      name: 'Light'
    },
    {
      key: 'dark',
      name: 'Dark'
    }
  ]
  themesByKey: { [key: string]: Theme } = Object.assign({}, ...this.themes.map(theme => ({[theme.key]: theme})));

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    this.theme = localStorage.getItem('theme') ?? this.themes[0].key;
    this.loadTheme();
  }

  changeTheme(): void {
    if (!this.theme) return;

    localStorage.setItem('theme', this.theme);

    this.loadTheme();
  }

  loadTheme(): void {
    for (const theme of this.themes) {
      this.renderer.removeClass(document.body, `${theme.key}-theme`);
    }

    this.renderer.addClass(document.body, `${this.theme}-theme`);

    if (!this.styleLink) {
      this.styleLink = document.createElement('link');
      this.styleLink.rel = 'stylesheet';
      document.head.appendChild(this.styleLink);
    }

    this.styleLink.href = `${this.theme}-theme.css`;
  }
}
