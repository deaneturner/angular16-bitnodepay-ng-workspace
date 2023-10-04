import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private messageService: MessageService) {
    this.showErrorViaToast();
  }

  showErrorViaToast() {
    // this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    setTimeout(() => {
      this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
      console.log('ERROR MSG SERVICE')
    }, 5000);
  }
}
