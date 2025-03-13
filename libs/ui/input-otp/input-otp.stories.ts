import { Component } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { HlmInputOtpImports, HlmOtpGroupComponent } from './helm/src';

@Component({
	selector: 'hlm-otp-group-component-tester',
	template: `
		<hlm-otp-group [length]="4"></hlm-otp-group>
	`,
})
class HlmOtpGroupComponentTester {}
const meta: Meta<HlmOtpGroupComponent> = {
	title: 'Input OTP',
	component: HlmOtpGroupComponent,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			declarations: [HlmOtpGroupComponentTester],
			imports: [HlmInputOtpImports],
		}),
	],
};

export default meta;
type Story = StoryObj<HlmOtpGroupComponent>;

export const Default: Story = {
	render: () => ({
		template: /* HTML */ `
			<hlm-otp-group [length]="4"></hlm-otp-group>
		`,
	}),
};
