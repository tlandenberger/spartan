import { AfterContentInit, Component, ContentChildren, input, QueryList, TemplateRef } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { HlmIconComponent } from "@spartan-ng/ui-icon-helm";
import { NgTemplateOutlet } from "@angular/common";
import { HlmBreadcrumbSeparatorComponent } from "./hlm-breadcrumb-separator.component";
import { HlmBreadcrumbItemComponent } from "./hlm-breadcrumb-item.component";
import { HlmSeparatorDirective } from "./hlm-separator.directive";

@Component({
	selector: 'hlm-breadcrumbs',
	standalone: true,
	imports: [
		HlmSeparatorDirective,
		HlmBreadcrumbItemComponent,
		HlmBreadcrumbSeparatorComponent,
		HlmIconComponent,
		NgTemplateOutlet,
	],
	providers: [provideIcons({ lucideChevronLeft })],
	template: `
		<nav aria-label="breadcrumb">
			<ol class="flex flex-wrap items-center gap-1.5">
				@for (item of items(); track $index; let isLast = $last) {
					<ng-container>
						<hlm-breadcrumb-item [item]="item" [isLast]="isLast"></hlm-breadcrumb-item>

						@if (!isLast) {
							<ng-container>
								<hlm-breadcrumb-separator>
									@if (customSeparator) {
										<ng-container *ngTemplateOutlet="customSeparator"></ng-container>
									} @else {
										<hlm-icon name="lucideChevronRight" size="sm"></hlm-icon>
									}
								</hlm-breadcrumb-separator>
							</ng-container>
						}
					</ng-container>
				}
			</ol>
		</nav>
	`,
})
export class HlmBreadcrumbsComponent implements AfterContentInit {
	items = input.required<{ label: string; href?: string }[]>();
	@ContentChildren(HlmSeparatorDirective, { descendants: true }) separators!: QueryList<HlmSeparatorDirective>;
	customSeparator?: TemplateRef<unknown>;

	ngAfterContentInit() {
		const separator = this.separators.first;
		console.log(separator);
		if (separator) {
			this.customSeparator = separator.templateRef;
		}
	}
}
