import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
	selector: 'hlm-breadcrumb-separator',
	standalone: true,
	imports: [HlmIconComponent],
	providers: [provideIcons({ lucideChevronRight })],
	host: {
		class: 'inline-flex items-center gap-1.5',
	},
	template: `
		<li class="inline-flex items-center" aria-hidden="true" role="presentation">
			<ng-content></ng-content>
		</li>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class HlmBreadcrumbSeparatorComponent {}
