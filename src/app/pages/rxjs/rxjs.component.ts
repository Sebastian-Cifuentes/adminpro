import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.retornarObservador().pipe(
      retry(2)
    )
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.error('Error en el obs', error ),
        () => console.log('El obs termino!')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Se cerrará la pantalla');
    this.subscription.unsubscribe();
  }

  retornarObservador(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        const output = {
          value: contador
        };

        observer.next(output);

        // if ( contador === 3 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   observer.error('Ayudaaa!!!');
        // }

      }, 1000);

    }).pipe(
      map ( resp => resp.value ),
      filter( (value, index) => {
        if ( (value % 2) === 1  ) {
          // impar
          return false;
        } else {
          // impar
          return true;
        }
      })
    );
  }

}
