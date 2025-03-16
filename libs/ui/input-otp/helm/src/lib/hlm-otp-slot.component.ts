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
			size="sm"
			[value]="value()"
			[class]="_computedClass()"
			[disabled]="!active()"
			(input)="onInput($event)"
			(keydown)="onKeydown($event)"
			[cdkTrapFocusAutoCapture]="active()"
			[cdkTrapFocus]="active()"
		/>
	`,
})
export class HlmOtpSlotComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly value = input<string>('');
	public readonly active = input<boolean>(false);
	public readonly first = input<boolean>(false);
	public readonly last = input<boolean>(false);
	public readonly lastInOtp = input<boolean>(false);
	public readonly pattern = input.required<RegExp>();

	public readonly valueChange = output<string>();
	public readonly focusNext = output<void>();
	public readonly focusPrevious = output<void>();
	public readonly moveRight = output<void>();
	public readonly moveLeft = output<void>();

	protected readonly _computedClass = computed(() =>
		hlm('relative flex h-9 w-9 items-center justify-center transition-all', this.userClass(), {
			'rounded-l-md border-l': this.first(),
			'rounded-r-md border-r': this.last(),
			'z-10 ring-2 ring-ring ring-offset-0': this.active(),
			'cursor-not-allowed': !this.active(),
			'caret-transparent': this._filled(),
		}),
	);

	private readonly _filled = computed(() => this.value() !== '');

	protected onInput(event: Event) {
		event.preventDefault();
		if (!this.active()) return;

		const input = (event.target as HTMLInputElement).value;
		const newChar = input.charAt(input.length - 1);

		this.updateChar(newChar);
	}

	protected onKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Backspace':
				this.valueChange.emit('');
				if (this.lastInOtp() && this._filled()) break;

				this.focusPrevious.emit();
				break;
			case 'ArrowLeft':
				this.moveLeft.emit();
				event.preventDefault();
				break;
			case 'ArrowRight':
				this.moveRight.emit();
				event.preventDefault();
				break;
		}
	}

	private updateChar(char: string): void {
		const valid = this.isValidChar(char);
		if (char === this.value() || !valid) {
			this.valueChange.emit(' ');
		}

		const newChar = valid ? char : this.value();

		requestAnimationFrame(() => {
			this.valueChange.emit(newChar);
			if (valid) {
				this.focusNext.emit();
			}
		});
	}

	private isValidChar(char: string): boolean {
		return this.pattern().test(char);
	}
}
