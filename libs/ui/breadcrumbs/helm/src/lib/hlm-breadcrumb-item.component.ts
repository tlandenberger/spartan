import { ChangeDetectionStrategy, Component, Input, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'hlm-breadcrumb-item',
	standalone: true,
	imports: [],
	template: `
		<li class="inline-flex items-center gap-1.5" [attr.aria-current]="isLast ? 'page' : null">
			@if (item.href) {
				<a [href]="item.href" class="hover:text-foreground">
					{{ item.label }}
				</a>
			} @else {
				<span class="font-normal text-foreground">{{ item.label }}</span>
			}
		</li>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class HlmBreadcrumbItemComponent {
	@Input() item!: { label: string; href?: string };
	@Input() isLast = false;
}
