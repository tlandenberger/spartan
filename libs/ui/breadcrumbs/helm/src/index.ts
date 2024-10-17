import { NgModule } from '@angular/core';

import { HlmBreadcrumbsComponent } from './lib/hlm-breadcrumbs.component';
import { HlmSeparatorDirective } from "./lib/hlm-separator.directive";

export * from './lib/hlm-breadcrumbs.component';
export * from './lib/hlm-separator.directive';

export const HlmBreadcrumbsImports = [HlmBreadcrumbsComponent, HlmSeparatorDirective] as const;
@NgModule({
	imports: [...HlmBreadcrumbsImports],
	exports: [...HlmBreadcrumbsImports],
})
export class HlmBreadcrumbsModule {}
