import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from './components/login/login.module';
import {ChatModule} from './components/chat-list/chat.module';
import {Ng2Webstorage} from 'ngx-webstorage';
import {ChatComponent} from './components/chat-temp/chat.component';
import {NavbarComponent} from './components/layouts/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent, // temp
    PageNotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
    ChatModule,
    Ng2Webstorage,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
