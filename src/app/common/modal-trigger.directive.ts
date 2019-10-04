import {Directive, OnInit,Inject, ElementRef, Input } from '@angular/core';
import {JQ_TOKEN} from '../common/index'

@Directive({
    selector : '[modal-trigger]'

})
export class ModalTriggerDirective implements OnInit
{
    @Input('modal-trigger') modalId:string;
    private element: HTMLElement
    constructor(@Inject(JQ_TOKEN) private $:any , ref: ElementRef)
    {
        this.element=ref.nativeElement;
    }
    ngOnInit()
    {
        this.element.addEventListener('click',e=>
        {
            this.$(`#${this.modalId}`).modal({});
        })        
    }
}