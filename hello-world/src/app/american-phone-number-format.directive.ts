import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAmericanPhoneNumberFormat]',
})
export class AmericanPhoneNumberFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('focus') onFocus() {
    console.log('Focus');
  }
  @HostListener('blur') onBlur() {
    console.log('Blur');
    let value: string = this.el.nativeElement.value;
    console.log(value);
    value = value
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '');
    console.log(value);
    if (value.length >= 9) {
      value = `(${value.substr(0, 3)})${value.substr(3, 4)}-${value.substr(6)}`;
      this.el.nativeElement.value = value;
    }
  }
}
