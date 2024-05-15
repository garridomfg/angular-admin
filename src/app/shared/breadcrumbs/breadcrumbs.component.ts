import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public title: string = '';
  public titleSubs$: Subscription;

  constructor(private router: Router) {
    this.titleSubs$ = this.getArgumentsRoute().subscribe(
      (data) => (this.title = data.title)
    );
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgumentsRoute(): Observable<any> {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild === null),
      map((event) => event.snapshot.data)
    );
  }
}
