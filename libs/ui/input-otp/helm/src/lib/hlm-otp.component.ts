import { Component, computed, contentChildren, effect, input, signal, untracked } from '@angular/core';
import { HlmOtpGroupComponent } from '../index';

@Component({
	selector: 'hlm-otp',
	standalone: true,
	host: {
		class: 'flex gap-10',
	},
	template: `
		<ng-content />
	`,
	imports: [],
})
export class HlmOtpComponent {
	private readonly _groups = contentChildren(HlmOtpGroupComponent);
	public readonly pattern = input<RegExp | string>(RegExp(/^[a-zA-Z0-9]$/));

	private readonly _activeGroupIndex = signal<number>(0);
	private readonly _groupValues = signal<Map<number, string[]>>(new Map());

	private readonly _regExp = computed<RegExp>(() => {
		const pattern = this.pattern();
		if (typeof pattern === 'string') return RegExp(pattern);
		return pattern;
	});
	protected readonly _otp = computed<string[]>(() => Array.from(this._groupValues().values()).flat());

	constructor() {
		effect(
			() => {
				this._groups().forEach((group, index) => {
					untracked(() => {
						group.focusNextGroup.subscribe(() =>
							this._activeGroupIndex.update((acc) => Math.min(this._groups().length - 1, acc + 1)),
						);
						group.focusPreviousGroup.subscribe(() => this._activeGroupIndex.update((acc) => Math.max(0, acc - 1)));

						group.values.subscribe((values) => {
							const updatedValues = new Map(this._groupValues());
							updatedValues.set(index, values);
							this._groupValues.set(updatedValues);
						});
					});
				});
			},
			{ allowSignalWrites: true },
		);

		effect(
			() => {
				this._groups().forEach((group, index) => {
					group.regExp.set(this._regExp());
					group.groupActive.set(index === this._activeGroupIndex());
					group.lastGroup.set(index === this._groups().length - 1);
				});
			},
			{ allowSignalWrites: true },
		);
	}
}
