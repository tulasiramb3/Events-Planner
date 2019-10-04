import { InjectionToken } from '@angular/core';

export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr
{
    success(msg:string,title?:string);
    info(msg:string,title?:string);
    warning(msg:string,title?:string);
    error(msg:string,title?:string);
}
// export class ToastrService
// {   
//     success(message:string,title?:string)
//     {
//         toastr.success(message,title);
//     }
//     info(message:string,title?:string)
//     {
//         toastr.info(message,title);
//     }
//     warning(message:string,title?:string)
//     {
//         toastr.warning(message,title);
//     }
//     error(message:string,title?:string)
//     {
//         toastr.error(message,title);
//     }

// }