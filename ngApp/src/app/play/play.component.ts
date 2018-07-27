import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CatsubService } from '../services/catsub.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  id$: String;
  subcatData$: any = Object;
  errorMsg: String;
  boxLoop: Object;
  subCatname = [];
  inputData = [];
  alphabets = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  actualCount;
  totalCount;
  clickCount = 0;
  category: String;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private catsub: CatsubService
  ) {
    this.id$ = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.catsub.getSubCat(this.id$).subscribe(
      data => {
        this.subcatData$ = data;
        let subcat_name = this.subcatData$.subcat_name;
        this.subCatname = subcat_name.split('');
        let uniqcount = subcat_name.toLowerCase().split('').filter(this.onlyUnique);
        this.totalCount = uniqcount.length + 2;
        this.actualCount = this.cleanArray(uniqcount);
        this.inputData = new Array(this.subCatname.length);
      },
      err => this.errorMsg = err.error,
    );

    this.category = localStorage.getItem('title');
  }

  matchValu(valu) {
    this.totalCount = this.totalCount - 1;
    let clickvalu = this.alphabets[valu];
    let tempvalu;
    for (let i = 0; i < this.subCatname.length; i++) {
      if (this.subCatname[i].toLowerCase() === clickvalu.toLowerCase()) {
        if (tempvalu !== clickvalu.toLowerCase()) {
          this.clickCount += 1;
          tempvalu = clickvalu.toLowerCase();
        }
        this.inputData[i] = this.subCatname[i];
      }
    }
    this.alphabets.splice(valu, 1);

    if (this.actualCount === this.clickCount) {
      this._router.navigate(['/success']);
    } else if (this.totalCount === 0) {
      if (this.actualCount === this.clickCount) {
        this._router.navigate(['/success']);
      } else {
        localStorage.setItem('name',  this.subcatData$.subcat_name);
        this._router.navigate(['/fail/']);
      }
    }
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  cleanArray(actual) {
    let newArray = new Array();
    for (let i = 0; i < actual.length; i++) {
      if (actual[i] !== ' ') {
        newArray.push(actual[i]);
      }
    }
    return newArray.length;
  }
}
