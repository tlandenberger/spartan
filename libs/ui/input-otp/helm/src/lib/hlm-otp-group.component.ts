import { Component, computed, input, model, signal } from '@angular/core';
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
					[pattern]="_regExp()"
					(valueChange)="updateSlot($event)"
					(focusNext)="focusNext($index)"
					(focusPrevious)="focusPrevious($index)"
					(moveLeft)="moveLeft($index)"
					(moveRight)="moveRight($index)"
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
	public readonly pattern = input<RegExp | string>(RegExp(/^[a-zA-Z0-9]$/));

	protected readonly _slots = computed<string[]>(() =>
		Array.from({ length: this.length() }).map((_, index) => this.otp()[index] ?? ''),
	);
	protected readonly _regExp = computed<RegExp>(() => {
		const pattern = this.pattern();
		console.log(pattern, typeof pattern);
		if (typeof pattern === 'string') return RegExp(pattern);
		return pattern;
	});

	protected readonly _activeSlotIndex = signal<number>(0);
	protected readonly _focused = signal<boolean>(true);
	protected readonly _isFocusChanging = signal<boolean>(false);

	protected updateSlot(value: string) {
		this.otp.update((acc) => [
			...acc.slice(0, this._activeSlotIndex()),
			value,
			...acc.slice(this._activeSlotIndex() + 1),
		]);
	}

	protected focusNext(index: number) {
		this._isFocusChanging.set(true);
		if (index < this._slots().length - 1) {
			this._activeSlotIndex.set(index + 1);
		}

		setTimeout(() => this._isFocusChanging.set(false), 10);
	}

	protected focusPrevious(index: number, removePreviousValue = true) {
		if (index === 0) return;

		this._isFocusChanging.set(true);
		this._activeSlotIndex.set(index - 1);
		if (removePreviousValue) this.updateSlot('');

		setTimeout(() => this._isFocusChanging.set(false), 10);
	}

	protected onFocusOut() {
		if (this._isFocusChanging()) return;
		this._focused.set(false);
	}

	protected onFocusIn() {
		this._focused.set(true);
	}

	protected moveLeft(index: number) {
		this.focusPrevious(index, false);
	}

	protected moveRight(index: number) {
		if (this._slots()[index] === '') return;
		this.focusNext(index);
	}
}
