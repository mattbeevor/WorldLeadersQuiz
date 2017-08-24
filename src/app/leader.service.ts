import { Leader } from './leader';
import { LEADERS } from './mock-leaders';
import { Injectable } from '@angular/core';

@Injectable()
export class LeaderService {

  getLeaders(): Leader[] {
    return LEADERS
  }

  selectLeaders(leaders): {leader:Leader[],leaders:Leader[]} {
    function shuffle(array){
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return {leaders:array.slice(0,5).sort(function(a, b){
    if(a.title < b.title) return -1;
    if(a.title > b.title) return 1;
    return 0;
  }),leader:array.slice(0,1)};
    }
    var list = shuffle(leaders);
    return list
  }


}

