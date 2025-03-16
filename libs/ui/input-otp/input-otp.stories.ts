import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { HlmInputOtpImports, HlmOtpGroupComponent } from './helm/src';
import { HlmOtpComponent } from './helm/src/lib/hlm-otp.component';

const meta: Meta<HlmOtpComponent> = {
	title: 'Input OTP',
	component: HlmOtpComponent,
	tags: ['autodocs'],
	args: {
		pattern: '^[a-zA-Z0-9]$',
	},
	argTypes: {
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
			<hlm-otp ${argsToTemplate(args)}>
				<hlm-otp-group length="2"></hlm-otp-group>
				<hlm-otp-group></hlm-otp-group>
			</hlm-otp>
		`,
	}),
};

/*export const Pattern: Story = {
	render: ({ ...args }) => ({
		props: { ...args, pattern: '\\d+' },
		template: /!* HTML *!/ `
			<hlm-otp-group></hlm-otp-group>
		`,
	}),
};*/
