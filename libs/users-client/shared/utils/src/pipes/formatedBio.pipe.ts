import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatedBio'
})
export class FormatedBioPipe implements PipeTransform {
  transform(value: string | null | undefined) {
    if (!value) return '';
    return value.replace(/\n/g, '<br>');
  }
}