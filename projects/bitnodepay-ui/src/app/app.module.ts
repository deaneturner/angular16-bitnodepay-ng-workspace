import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from './layout/app.layout.module';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {MessageModule} from "primeng/message";
import {MessageService} from "primeng/api";

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {transports: ['websocket']}};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    SocketIoModule.forRoot(config),
    MessageModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
