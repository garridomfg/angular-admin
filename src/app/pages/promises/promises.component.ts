import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css'],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promise = new Promise((resolve) => {
    //   resolve('Hola mundo')
    // })
    // promise.then((msg) => {
    //   console.log(msg)
    // })
    this.getUsers().then(users => console.log(users));
  }

  getUsers() {
    const promise = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json()
        .then((body) => resolve(body.data))
      );
    });
    return promise;
  }
}
