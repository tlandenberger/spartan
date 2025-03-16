import { Component, computed, input, model, output, signal } from '@angular/core';
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
					[active]="_focused() && groupActive() && _activeSlotIndex() === $index"
					[first]="first"
					[last]="last"
					[lastInOtp]="last && lastGroup()"
					[pattern]="regExp()"
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
	public readonly values = model<string[]>([]);
	public readonly regExp = model<RegExp>(RegExp(/^[a-zA-Z0-9]$/));
	public readonly groupActive = model<boolean>(false);
	public readonly lastGroup = model<boolean>(false);
	public readonly focusNextGroup = output<void>();
	public readonly focusPreviousGroup = output<void>();

	protected readonly _slots = computed<string[]>(() =>
		Array.from({ length: this.length() }).map((_, index) => this.values()[index] ?? ''),
	);

	protected readonly _activeSlotIndex = signal<number>(0);
	protected readonly _focused = signal<boolean>(true);
	protected readonly _isFocusChanging = signal<boolean>(false);

	protected updateSlot(value: string) {
		this.values.update((acc) => [
			...acc.slice(0, this._activeSlotIndex()),
			value,
			...acc.slice(this._activeSlotIndex() + 1),
		]);
	}

	protected focusNext(index: number) {
		this._isFocusChanging.set(true);
		if (index < this._slots().length - 1) {
			this._activeSlotIndex.update((acc) => acc + 1);
		} else {
			this.focusNextGroup.emit();
		}

		requestAnimationFrame(() => this._isFocusChanging.set(false));
	}

	protected focusPrevious(index: number, removePreviousValue = true) {
		this._isFocusChanging.set(true);

		if (index > 0) {
			this._activeSlotIndex.update((acc) => acc - 1);
		} else {
			this.focusPreviousGroup.emit();
		}

		if (removePreviousValue) this.updateSlot('');

		requestAnimationFrame(() => this._isFocusChanging.set(true));
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
