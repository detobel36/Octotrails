import { NgModule } from '@angular/core';
import {
  TranslateCompiler,
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { HistoriesRoutingModule } from './histories-routing.module';

import { HistoryListComponent } from './list/history-list.component';
import { HistoryDetailComponent } from './detail/history-detail.component';

@NgModule({
  imports: [SharedModule, HistoriesRoutingModule, TranslateModule],
  declarations: [HistoryListComponent, HistoryDetailComponent]
})
export class HistoriesModule {}

export function HistoriesEntrypoint() {
  return HistoriesModule;
}
