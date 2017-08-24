import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { LeaderService }          from './leader.service';
import { QuestionComponent }          from './question.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    QuestionComponent,
  ],
  providers: [ LeaderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
