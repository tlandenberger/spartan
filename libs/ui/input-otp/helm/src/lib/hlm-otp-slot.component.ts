import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, computed, input, output } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { ClassValue } from 'clsx';
import { HlmOtpSlotDirective } from './hlm-otp-slot-input.directive';

@Component({
	selector: 'hlm-otp-slot',
	standalone: true,
	imports: [CdkTrapFocus, HlmOtpSlotDirective],
	template: `
		<input
			hlmOtpSlot
			type="text"
			maxlength="1"
			size="sm"
			[value]="value()"
			[class]="_computedClass()"
			[disabled]="!active()"
			[readonly]="last() && isFilled()"
			(input)="onInput($event)"
			(keydown)="onKeydown($event)"
			[cdkTrapFocusAutoCapture]="active()"
			[cdkTrapFocus]="active()"
		/>
	`,
})
export class HlmOtpSlotComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly value = input<string>();
	public readonly active = input<boolean>(false);
	public readonly first = input<boolean>(false);
	public readonly last = input<boolean>(false);

	public readonly valueChange = output<string>();
	public readonly focusNext = output<void>();
	public readonly focusPrevious = output<void>();

	protected readonly _computedClass = computed(() =>
		hlm('relative flex h-9 w-9 items-center justify-center transition-all', this.userClass(), {
			'rounded-l-md border-l': this.first(),
			'rounded-r-md border-r': this.last(),
			'z-10 ring-2 ring-ring ring-offset-0': this.active(),
			'cursor-not-allowed': !this.active(),
		}),
	);
	protected readonly isFilled = computed(() => this.value() !== '');

	onInput(event: Event) {
		if (!this.active()) return;

		const input = event.target as HTMLInputElement;
		const newChar = input.value;

		if (newChar.length === 1) {
			this.valueChange.emit(newChar);
			this.focusNext.emit();
		}
	}

	onKeydown(event: KeyboardEvent) {
		if (event.key === 'Backspace') {
			this.valueChange.emit('');
			this.focusPrevious.emit();
		} else if (this.last() && this.isFilled()) {
			event.preventDefault();
			this.valueChange.emit(event.key);
		}
	}
}
