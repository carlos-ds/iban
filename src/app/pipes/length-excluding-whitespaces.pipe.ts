import { Pipe, PipeTransform } from '@angular/core';
/*
 * Remove whitespaces from a string and trim it
 * Usage:
 *   string | lengthExcludingWhitespace
 * Example:
 *   {{ "BE66 5901 2067 9443" | lengthExcludingWhitespace }}
 *   returns: 16
 */
@Pipe({ name: 'lengthExcludingWhitespace' })
export class LengthExcludingWhitespacePipe implements PipeTransform {
  transform(value: string): number {
    return value.replace(/ /g, '').trim().length;
  }
}
