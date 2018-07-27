import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-failure',
  template: `
  <div class="container-fluid">
    <div class="row mt-5 mx-0">
      <h2 class="my-3 w-100 text-center">Sorry!</h2>
      <div class="clearfix"></div>
      <div class="mt-2 w-100 text-center">
          <p>You loss</p>
          <p>Name was <strong>{{name}}</strong>
          <p>Try Again</p>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class FailureComponent implements OnInit {

  name: String;
  constructor() { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    localStorage.clear();
  }

}
