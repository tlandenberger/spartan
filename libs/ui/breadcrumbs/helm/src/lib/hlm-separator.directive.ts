import { Directive, TemplateRef } from '@angular/core';

@Directive({
	standalone: true,
	selector: '[hlmSeparator]',
})
export class HlmSeparatorDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
