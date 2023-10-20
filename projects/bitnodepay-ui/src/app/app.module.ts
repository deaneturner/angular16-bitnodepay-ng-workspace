import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from './layout/app.layout.module';
import {SocketIoModule} from "ngx-socket-io";
import {MessageModule} from "primeng/message";
import {MessageService} from "primeng/api";
import {config} from "./service/container.service";
import { TerminalComponent } from './components/xterm/terminal/terminal.component';
import {AuthService} from "./service/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    SocketIoModule.forRoot(config),
    MessageModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MessageService, useClass: MessageService},
    {provide: AuthService, useClass: AuthService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
