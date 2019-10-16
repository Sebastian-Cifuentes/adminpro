import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor( private router: Router,
               private titleWeb: Title,
               private meta: Meta ) {

    this.getDataRouter()
    .subscribe( data => {
      this.title = data.title;
      this.titleWeb.setTitle( this.title );
      const METATAG: MetaDefinition = {
        name: 'description',
        content: data.description
      };
      this.meta.updateTag(METATAG);
    });

  }

  ngOnInit() {
  }

  getDataRouter() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data )
    );
  }

}
