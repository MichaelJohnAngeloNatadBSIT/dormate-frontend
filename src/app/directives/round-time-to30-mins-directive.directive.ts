import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[appRoundTimeTo30MinsDirective]'
})
export class RoundTimeTo30MinsDirectiveDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedTime = new Date(inputElement.value);
    
    // Round minutes to the nearest 30-minute interval
    const roundedMinutes = Math.round(selectedTime.getMinutes() / 30) * 30;
    
    // Set the rounded minutes to the selected time
    selectedTime.setMinutes(roundedMinutes);

    // Update the input value with the rounded time
    inputElement.value = this.formatDate(selectedTime);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
