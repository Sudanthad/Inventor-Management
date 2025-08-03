import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LaptopsService } from '../../laptops.service';
import { Laptop } from '../../laptop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-laptop',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './update-laptop.component.html',
  styleUrls: ['./update-laptop.component.scss'],
})
export class UpdateLaptopComponent implements OnInit {
  // Notification state
  isAdded = false;

  // Scanner properties
  scannerEnabled = true;
  statusMessage = 'Ready to scan';
  scanCount = 0;
  lastScanned: string | null = null;

  // Barcode scanning variables
  private barcodeBuffer = '';
  private barcodeTimeout: any = null;
  private readonly barcodeDelay = 50; // Time between keypresses in ms

  // Form validation
  isValidId = false;
  idPattern: RegExp = /^[A-Z0-9]{4,10}$/;

  // Laptop data
  laptop: Laptop = {
    id:'',
    serialNumber:'',
    assetNumber:'',
    branch:'',
    location:'',
    deviceOwnerEPF:'',
    deviceOwnerName:'',
    designation:'',
    deviceType:'',
    activeState:'true',
    status:'',
    userStatus:'',
    deviceStatus:'',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { laptop: Laptop },
    private dialogRef: MatDialogRef<UpdateLaptopComponent>,
    private laptopService: LaptopsService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.laptop) {
      this.laptop = { ...this.data.laptop };
    }
  }

  @HostListener('window:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.scannerEnabled) return;

    // Check if it's a printable character
    if (event.key && event.key.length === 1) {
      this.barcodeBuffer += event.key;

      // Reset the timeout each time a key is pressed
      if (this.barcodeTimeout) {
        clearTimeout(this.barcodeTimeout);
      }

      // Set a timeout to detect when the barcode is complete
      this.barcodeTimeout = setTimeout(() => {
        this.processScan(this.barcodeBuffer);
        this.barcodeBuffer = '';
      }, this.barcodeDelay);
    }
  }

  private processScan(barcode: string) {
    if (!barcode || barcode.trim() === '') return;

    this.scanCount++;
    this.lastScanned = barcode.trim();
    this.statusMessage = `Scanned: ${this.lastScanned} (Total: ${this.scanCount})`;

    // Auto-fill the ID field if empty
    if (!this.laptop.id) {
      this.laptop.id = this.lastScanned;
    }

    // Validate format
    this.validateId();
  }

  laptopUpdate() {
    // 1. Mandatory value check
    if (!this.laptop.serialNumber || !this.lastScanned) {
      this.statusMessage = 'Error: Scan failed - no data received';
      return;
    }

    // 2. Strict equality check (case-sensitive, exact match)
    if (this.laptop.serialNumber !== this.lastScanned) {
      this.statusMessage = `FAILED: Scanned "${this.lastScanned}" ≠ Laptop "${this.laptop.serialNumber}"`;
      this.laptop.status = 'Scan Mismatch';
     
      return;
    }

    // 3. Only proceed if EXACT match
    this.laptop.status = 'Verified ';
    
 

    this.laptopService.laptopUpdate(this.laptop).subscribe({
      next: (response) => {
        this.statusMessage = 'Success: Serial number verified!';
        this.isAdded = true; // Show success message

        setTimeout(() => {
          this.dialogRef.close('success');
        }, 3000); // Close dialog after 3 seconds
      },
      error: (error) => {
        this.statusMessage = 'Server update failed';
        this.isAdded = true;
        console.error('API Error:', error);
      },
    });
  }

  // Scanner methods
  toggleScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.statusMessage = this.scannerEnabled
      ? 'Scanner activated - ready to scan'
      : 'Scanner paused';
  }

  validateId() {
    this.isValidId = this.idPattern.test(this.laptop.serialNumber);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
