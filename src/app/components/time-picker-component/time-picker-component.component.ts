import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-time-picker-component',
  templateUrl: './time-picker-component.component.html',
  styleUrls: ['./time-picker-component.component.css']
})
export class TimePickerComponentComponent {

  @Output() timeSelected = new EventEmitter<string>();

  // Generate time options with 30-minute intervals in 12-hour format
  timeOptions: string[] = this.generateTimeOptions();

  constructor() { }

  // Generate time options with 30-minute intervals in 12-hour format
  private generateTimeOptions(): string[] {
    const options: string[] = [];
    for (let hour = 7; hour <= 17; hour++) { // Start at 7 and end at 17 (5 PM)
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = (hour % 12 === 0) ? 12 : hour % 12; // Convert 0 to 12
        const period = (hour >= 12) ? 'PM' : 'AM'; // Determine AM/PM
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute} ${period}`);
      }
    }
    return options;
  }
  

  // Emit selected time
  selectTime(time: string) {
    this.timeSelected.emit(time);
  }
}
