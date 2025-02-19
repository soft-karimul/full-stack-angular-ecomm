
import { FormControl , FormGroup } from "@angular/forms";

export default class ValidateForm {

static ValidateAllFormField(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
        console.log(field);
        const control = formGroup.get(field);
        if(control instanceof FormControl){

        control.markAllAsTouched();  

        }else if(control instanceof FormGroup) {
            this.ValidateAllFormField(control);
        }
    })
}

}