import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { BrnFormFieldControl } from '@spartan-ng/brain/form-field';

import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const otpSlotVariants = cva(
	'flex border-t border-b border-r font-normal items-center justify-center text-center bg-transparent text-base md:text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-text',
	{
		variants: {
			size: {
				default: 'h-10 w-10',
				sm: 'h-9 w-9',
				lg: 'h-11 w-1',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	},
);
type OtpSlotVariants = VariantProps<typeof otpSlotVariants>;

@Directive({
	selector: '[hlmOtpSlot]',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	providers: [
		{
			provide: BrnFormFieldControl,
			useExisting: HlmOtpSlotDirective,
		},
	],
})
export class HlmOtpSlotDirective {
	public readonly size = input<OtpSlotVariants['size']>('default');

	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() => hlm(otpSlotVariants({ size: this.size() }), this.userClass()));
}
