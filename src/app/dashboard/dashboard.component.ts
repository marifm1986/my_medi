import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BottomSheetComponent } from '../buttom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, BottomSheetComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private _bottomSheet = inject(MatBottomSheet);
  startTime: string = '0';
  intervalHours: number = 0;
  totalDoses: number = 0;
  schedule: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.calculateMedicineSchedule(this.startTime, this.intervalHours, this.totalDoses);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  calculateMedicineSchedule(startTime: any, intervalHours: number, totalDoses: number) {
    // Parse the start time
    let [hours, minutes] = startTime.split(':').map(Number);
    let isPM = hours >= 12;

    // Convert to 24-hour format if necessary
    if (hours > 12) hours -= 12;
    if (hours === 12 && !isPM) hours = 0;

    this.startTime = ''
    this.intervalHours = 0
    this.totalDoses = 0
    this.schedule = [];

    for (let i = 0; i < totalDoses; i++) {
      // Format current time
      let formattedHours = hours % 12 || 12;
      let amPm = hours >= 12 ? 'PM' : 'AM';
      let formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;

      this.schedule.push(formattedTime);

      // Calculate next dose time
      hours = (hours + intervalHours) % 24;
      isPM = hours >= 12;
    }


  }
}
