import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { QuestionComponent }  from './question.component';

const routes: Routes = [
  { path: '', component: QuestionComponent },
  { path: 'question', component: QuestionComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
