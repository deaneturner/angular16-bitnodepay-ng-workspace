import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MailService} from "../service/mail.service";
import {Mail} from "../../../../api/mail";
// import { Mail } from 'src/app/demo/api/mail';
// import { MailService } from 'src/app/demo/components/apps/mail/service/mail.service';

@Component({
    templateUrl: './mail-starred.component.html'
})
export class MailStarredComponent implements OnDestroy {

    starredMails: Mail[] = [];

    subscription: Subscription;

    constructor(private mailService: MailService) {
        this.subscription = this.mailService.mails$.subscribe(data => {
            this.starredMails = data.filter(d => d.starred && !d.archived && !d.trash)
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
