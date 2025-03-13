import { NgModule } from '@angular/core';

import { HlmOtpGroupComponent } from './lib/hlm-otp-group.component';

export * from './lib/hlm-otp-group.component';

export const HlmInputOtpImports = [HlmOtpGroupComponent];

@NgModule({
	imports: [...HlmInputOtpImports],
	exports: [...HlmInputOtpImports],
})
export class HlmInputOtpModule {}
