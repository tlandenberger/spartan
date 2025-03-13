import { Directive, type DoCheck, Injector, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { hlm } from '@spartan-ng/brain/core';
import { BrnFormFieldControl } from '@spartan-ng/brain/form-field';
import { ErrorStateMatcher, ErrorStateTracker } from '@spartan-ng/brain/forms';

import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const otpSlotVariants = cva(
	'flex border-t border-b border-r font-normal items-center justify-center text-center bg-transparent text-base md:text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-text disabled:opacity-50',
	{
		variants: {
			size: {
				default: 'h-10 w-10',
				sm: 'h-9 w-9',
				lg: 'h-11 w-1',
			},
			error: {
				auto: '[&.ng-invalid.ng-touched]:text-destructive [&.ng-invalid.ng-touched]:border-destructive [&.ng-invalid.ng-touched]:focus-visible:ring-destructive',
				true: 'text-destructive border-destructive focus-visible:ring-destructive',
			},
		},
		defaultVariants: {
			size: 'default',
			error: 'auto',
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
export class HlmOtpSlotDirective implements BrnFormFieldControl, DoCheck {
	public readonly size = input<OtpSlotVariants['size']>('default');

	public readonly error = input<OtpSlotVariants['error']>('auto');

	protected readonly state = computed(() => ({
		error: signal(this.error()),
	}));

	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm(otpSlotVariants({ size: this.size(), error: this.state().error() }), this.userClass()),
	);

	private readonly _injector = inject(Injector);

	public readonly ngControl: NgControl | null = this._injector.get(NgControl, null);

	private readonly _errorStateTracker: ErrorStateTracker;

	private readonly _defaultErrorStateMatcher = inject(ErrorStateMatcher);
	private readonly _parentForm = inject(NgForm, { optional: true });
	private readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });

	public readonly errorState = computed(() => this._errorStateTracker.errorState());

	constructor() {
		this._errorStateTracker = new ErrorStateTracker(
			this._defaultErrorStateMatcher,
			this.ngControl,
			this._parentFormGroup,
			this._parentForm,
		);

		effect(() => {
			const error = this._errorStateTracker.errorState();
			untracked(() => {
				if (this.ngControl) {
					this.setError(error);
				}
			});
		});
	}

	ngDoCheck() {
		this._errorStateTracker.updateErrorState();
	}

	setError(error: OtpSlotVariants['error']) {
		this.state().error.set(error);
	}
}
