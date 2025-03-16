import { NgModule } from '@angular/core';

import { HlmOtpGroupComponent } from './lib/hlm-otp-group.component';
import { HlmOtpSlotComponent } from './lib/hlm-otp-slot.component';
import { HlmOtpComponent } from './lib/hlm-otp.component';

export * from './lib/hlm-otp-group.component';

export const HlmInputOtpImports = [HlmOtpComponent, HlmOtpGroupComponent, HlmOtpSlotComponent];

@NgModule({
	imports: [...HlmInputOtpImports],
	exports: [...HlmInputOtpImports],
})
export class HlmInputOtpModule {}
