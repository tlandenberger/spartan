import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HlmBreadcrumbsComponent, HlmSeparatorDirective } from '@spartan-ng/ui-breadcrumbs-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { lucideChevronLeft } from '@ng-icons/lucide';

@Component({
	selector: 'hlm-breadcrumbs-component-tester',
	template: `
		<hlm-breadcrumbs [items]="items">
			<ng-template hlmSeparator>
				<hlm-icon name="lucideChevronLeft" size="sm"></hlm-icon>
			</ng-template>
		</hlm-breadcrumbs>
	`,
	standalone: true,
	imports: [HlmBreadcrumbsComponent, HlmSeparatorDirective, HlmIconComponent],
	providers: [provideIcons({ lucideChevronLeft })],
})
class HlmBreadCrumbsComponentTester {
	items = [{ label: 'Home', href: '/' }, { label: 'Components', href: '/' }, { label: 'Breadcrumbs' }];
}

const meta: Meta<HlmBreadcrumbsComponent> = {
	title: 'Breadcrumbs',
	component: HlmBreadcrumbsComponent,
	tags: ['autodocs'],
	argTypes: {
		items: {
			control: 'object',
			description: 'List of breadcrumb items with label and optional href',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CommonModule, HlmIconComponent, HlmBreadCrumbsComponentTester],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
	}),
};

export default meta;
type Story = StoryObj<HlmBreadcrumbsComponent>;

export const Default: Story = {
	args: {
		items: [{ label: 'Home', href: '/' }, { label: 'Components', href: '/' }, { label: 'Breadcrumbs' }],
	},
};

export const CustomSeparator: Story = {
	render: () => ({
		template: /* HTML */ `
			<hlm-breadcrumbs-component-tester />
		`,
	}),
};
