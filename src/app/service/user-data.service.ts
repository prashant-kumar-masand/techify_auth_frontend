import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class userDataService {

   
    constructor(public snackBar: MdSnackBar) { }

 
    openSuccessSnackBar(message: string) {
        this.snackBar.open(message, '', {
            extraClasses: ['snackbar-success'], duration: 5000
        });
    }

    openErrorSnackBar(message: string) {
        this.snackBar.open(message, '', {
            extraClasses: ['snackbar-error'], duration: 5000
        });
    }

}