import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortDataService {

  constructor() { }
  sortData(parentId, direction, num) {
    if (typeof parentId == "string"){
      let tbody = document.getElementById(parentId);
      let children = [];
      for (let element = tbody.firstChild; element != null; element = element.nextSibling){
        if (element.nodeType == 1) children.push(element);
      }
      children.sort(function (elem1, elem2) { 
          let s = elem1.childNodes[num].innerHTML; 
          let t = elem2.childNodes[num].innerHTML; 
          if (!isNaN(s) && !isNaN(t)){
            return s - t;
          }
          else {
            if (s < t) return -1;      
            else if (s > t) return 1;  
            else return 0; 
          }
      });
      if (direction){
        for (let i = 0; i < children.length; i++) tbody.appendChild(children[i]);
      }
      else{
        children.reverse();
        for (let i = 0; i < children.length; i++) tbody.appendChild(children[i]);
      }
    }
  }
}
