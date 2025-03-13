import { Component, computed, effect, input, model, signal } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';
import { HlmOtpSlotComponent } from './hlm-otp-slot.component';

@Component({
	selector: 'hlm-otp-group',
	standalone: true,
	host: {
		'[class]': '_computedClass()',
	},
	template: `
		<div class="flex" (focusout)="onFocusOut()" (focusin)="onFocusIn()" tabindex="-1">
			@for (slot of _slots(); track $index; let first = $first; let last = $last) {
				<hlm-otp-slot
					#otpInput
					[value]="slot"
					[active]="_focused() && _activeSlotIndex() === $index"
					[first]="first"
					[last]="last"
					(valueChange)="updateSlot($event)"
					(focusNext)="focusNext($index)"
					(focusPrevious)="focusPrevious($index)"
				/>
			}
		</div>
	`,
	imports: [HlmOtpSlotComponent],
})
export class HlmOtpGroupComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() => hlm('flex items-center', this.userClass()));

	public readonly length = input<number>(6);
	public readonly otp = model<string[]>([]);

	protected readonly _slots = computed<string[]>(() =>
		Array.from({ length: this.length() }).map((_, index) => this.otp()[index] ?? ''),
	);

	protected readonly _activeSlotIndex = signal<number>(0);
	protected readonly _focused = signal<boolean>(true);
	protected readonly _isFocusChanging = signal<boolean>(false);

	constructor() {
		effect(() => {
			console.log(this.otp());
		});
	}

	updateSlot($event: string) {
		this.otp.update((acc) => [
			...acc.slice(0, this._activeSlotIndex()),
			$event,
			...acc.slice(this._activeSlotIndex() + 1),
		]);
	}

	focusNext(index: number) {
		this._isFocusChanging.set(true);
		if (index < this._slots().length - 1) {
			this._activeSlotIndex.set(index + 1);
		}

		setTimeout(() => this._isFocusChanging.set(false), 10);
	}

	focusPrevious(index: number) {
		this._isFocusChanging.set(true);
		if (index === 0) return;
		this._activeSlotIndex.set(index - 1);
		setTimeout(() => this._isFocusChanging.set(false), 10);
	}

	onFocusOut() {
		if (this._isFocusChanging()) return;
		this._focused.set(false);
	}

	onFocusIn() {
		this._focused.set(true);
	}
}
