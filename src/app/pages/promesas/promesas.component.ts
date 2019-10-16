import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {


  constructor() {
    // promesa.then(
    //   msj => console.log('Termino!', msj),
    //   error => console.error('Error, no funciono', error)
    // );
    this.three().then(
      msj => console.log('Termino!', msj)
    ).catch(
      error => console.error('Error, no funciono', error)
    );

  }

  ngOnInit() {
  }

  three(): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      let contador = 0;

      const interval = setInterval( () => {

        contador += 1;
        console.log(contador);

        if ( contador === 3 ) {
          resolve(true);
          // reject('Error en la función');
          clearInterval(interval);
        }

      }, 1000);

    });
  }

}
