import { Component, OnInit } from '@angular/core';
import { CatsubService } from '../services/catsub.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  category$: Object;
  errorMsg: String;
  btnDisabled: Boolean;
  catgoryData: {};
  constructor(private catsub: CatsubService) { }

  ngOnInit() {
    this.btnDisabled = true;
    this.catsub.getCategory().subscribe(
      data => this.category$ = data,
      err => this.errorMsg = err
    );
  }

  getval(event) {
    if (event.target.value === 'on') {
      this.btnDisabled = false;
    }
  }

  getIds(catForm) {
    this.catsub.goSubcat(catForm);
  }

}
