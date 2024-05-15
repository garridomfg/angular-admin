import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;

  constructor() {
    // this.returnObs()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (value) => console.log('Subs', value),
    //     (error) => console.warn('error', error),
    //     () => console.info('Complete')
    //   );
    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(200).pipe(
      take(10),
      map((value) => value + 1),
      filter((value) => value % 2 === 0)
    );
  }

  returnObs(): Observable<number> {
    let i = 0;
    const obs$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('error');
        }
      }, 1000);
    });

    return obs$;
  }
}
