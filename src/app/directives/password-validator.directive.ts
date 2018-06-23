import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[passwordValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]

})

export class PasswordValidatorDirective implements Validator {
    @Input() passwordValidator: any;

    validate(control: AbstractControl): { [key: string]: any } {
        return this.passwordValidator ? this.forbiddenNameValidator(new RegExp(this.passwordValidator, 'i'))(control)
            : null;
    }

    forbiddenNameValidator(pass): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const check = pass.test(control.value);
            //console.log(check);
            return check ?   null :{ 'passwordInvalid': { value: control.value } } ;
        };
    }
}