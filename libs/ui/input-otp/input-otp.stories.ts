import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { HlmInputOtpImports, HlmOtpGroupComponent } from './helm/src';

const meta: Meta<HlmOtpGroupComponent> = {
	title: 'Input OTP',
	component: HlmOtpGroupComponent,
	tags: ['autodocs'],
	args: {
		length: 4,
		pattern: '^[a-zA-Z0-9]$',
	},
	argTypes: {
		length: {
			control: { type: 'number' },
		},
		pattern: {
			control: { type: 'text' },
			description: 'A regular expression pattern (as a string) for input validation.',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HlmInputOtpImports],
		}),
	],
};

export default meta;
type Story = StoryObj<HlmOtpGroupComponent>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: /* HTML */ `
			<hlm-otp-group ${argsToTemplate(args)}></hlm-otp-group>
		`,
	}),
};

export const Pattern: Story = {
	render: ({ ...args }) => ({
		props: { ...args, pattern: '\\d+' },
		template: /* HTML */ `
			<hlm-otp-group ${argsToTemplate(args)}></hlm-otp-group>
		`,
	}),
};
