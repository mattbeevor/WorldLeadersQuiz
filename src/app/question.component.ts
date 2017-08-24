import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leader } from './leader';
import { LeaderService } from './leader.service';
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'my-questions',
  templateUrl: './question.component.html',
  styleUrls: [ './question.component.css' ]
})
export class QuestionComponent {
  originalleaders: Leader[];
  allleaders: Leader[];
  leaders: Leader[]
  selectedLeader: Leader;
  correctLeader: Leader[];
  correct: Leader
  leaderObject: {leader:Leader[],leaders:Leader[]}
  ticks: number
  timer = Observable.timer(0,1000);
  timeout = Observable.timer(0,10000);
  fadeout = Observable.timer(0,750);
  review = Observable.timer(0,1900);
  subscription = this.timer.subscribe(t=>this.ticks = 10-t);
  subscription2 = this.timeout.subscribe(t=>{if(t){this.nextQuestion(),this.ticks2=t}});
  subscription3 = this.fadeout.subscribe();
  subscription4 = this.review.subscribe();
  score:number
  scoreVisible=false
  ticks2=0
  scoreChangeUp=false
  scoreChangeDown=false
  scoreChange:number
  scoreMessage="_"
  finished=false
  questionsLive=false
  topscore:number
  topscoreVisible=false



  constructor(
    private router: Router,
    private leaderService: LeaderService) { }




  selectLeaders() {
    this.correct={id:0,name:"",title:""}
    this.selectedLeader={id:0,name:"",title:""}
    this.scoreChangeUp=false
    this.scoreChangeDown=false
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()
    this.subscription2 = this.timeout.subscribe(t=>{if(t){
      this.correct = this.correctLeader[0];
      this.nextQuestion(),
      this.ticks2=t,
      this.score-=10,
      this.scoreChange=-10,
      this.scoreMessage="Times Up!"
      this.scoreChangeDown=true
      this.subscription3.unsubscribe()
      this.subscription3 = this.fadeout.subscribe(t=>{if(t){this.scoreChangeDown=false}});
    }});
    this.subscription=this.timer.subscribe(t=>this.ticks = 10-t)
    this.questionsLive=true
    this.leaderObject=this.leaderService.selectLeaders(this.allleaders)
    this.leaders=this.leaderObject.leaders
    this.correctLeader=this.leaderObject.leader
  }

  nextQuestion(){
    this.questionsLive=false
    if(this.allleaders.length>1){
      this.subscription4.unsubscribe()
      this.subscription4 = this.review.subscribe(t=>{if(t==1){this.selectLeaders()}});
    }else{
      this.leaders=[]
      this.correctLeader=[]
      this.subscription.unsubscribe()
      this.subscription2.unsubscribe()
      this.finished=true
      this.topscore=this.score
      this.topscoreVisible=true
    }
  }

  getLeaders() {
    this.originalleaders=this.leaderService.getLeaders()
    this.allleaders=this.originalleaders.slice(0);
    this.selectLeaders()
  }

  onStart(){
    this.scoreVisible=true
    this.score=0
    this.getLeaders();
  }

  onSelect(leader: Leader): void {
    if(this.questionsLive==true){
      this.correct = this.correctLeader[0];
      this.selectedLeader = leader;
      this.subscription2.unsubscribe()
      if(this.selectedLeader==this.correctLeader[0]){
        this.scoreChange=this.ticks+20
        this.scoreMessage="Well Done!"
        this.scoreChangeUp=true
        this.allleaders.splice(this.allleaders.indexOf(this.selectedLeader),1)
      }else{
        this.scoreChange=-10
        this.scoreChangeDown=true
        this.scoreMessage="Wrong."
      }
      this.score+=this.scoreChange
      this.subscription3.unsubscribe()
      this.subscription3 = this.fadeout.subscribe(t=>{if(t){this.scoreChangeUp=false}});
    this.nextQuestion()
    }
  }



  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedLeader.id]);
  }
}
