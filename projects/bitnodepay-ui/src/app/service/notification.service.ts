import { Injectable } from '@angular/core';
import {Message, MessageService} from "primeng/api";

/**
 *
 *
 * this.notificationService.showMessage({severity: MessageErrorType.FATAL, summary: '', detail: ''})
 */
export enum MessageErrorType {
  FATAL,
  error = 'error',
  info = 'info',
  warning = 'warning',
  success = 'success'
}
export interface MessageConfig {severity: MessageErrorType, summary: string, detail: string}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  showMessage(messageConfig: MessageConfig) {
    if (messageConfig.severity === MessageErrorType.FATAL) {

      this.showViaMessages({
        ...messageConfig,
        severity: MessageErrorType.error
      });
    } else {
      this.showViaToast(messageConfig);
    }
  }

  private showViaToast(messageConfig: MessageConfig) {
    this.messageService.add({ key: 'notifications', severity: messageConfig.severity.toString(), summary: messageConfig.summary, detail: messageConfig.detail });
  }

  private showViaMessages(messageConfig: MessageConfig) {
    this.messages = [];
    this.messages.push({ severity: messageConfig.severity.toString(), summary: messageConfig.summary, detail: messageConfig.detail });
  }
}
