import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniqueIdentifierService {
  private readonly UNIQUE_IDENTIFER_KEY = 'userId';

  public constructor(private readonly localStorageService: LocalStorageService) {}

  public getUniqueIdentifier(): string {
    this.insertUniqueIdentifier();
    return this.getCurrentUniqueIdentifier();
  }

  private insertUniqueIdentifier(): void {
    const currentUniqueIdentifier = this.getCurrentUniqueIdentifier();
    if (currentUniqueIdentifier === null || currentUniqueIdentifier === undefined) {
      this.setUniqueIdentifier(uuidv4());
    }
  }

  private setUniqueIdentifier(uniqueIdentifier: string): void {
    this.localStorageService.setItem(this.UNIQUE_IDENTIFER_KEY, uniqueIdentifier);
  }

  private getCurrentUniqueIdentifier(): string {
    return this.localStorageService.getItem(this.UNIQUE_IDENTIFER_KEY);
  }
}
