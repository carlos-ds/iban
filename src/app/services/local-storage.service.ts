import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class LocalStorageService {
  private window: Window;

  public constructor(@Inject(DOCUMENT) private readonly document) {
    this.window = this.document.defaultView;
  }

  public getItem(key: string): string {
    return this.window.localStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    this.window.localStorage.setItem(key, value);
  }
}
