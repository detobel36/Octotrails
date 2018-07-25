import {
  ChangeDetectorRef,
  EventEmitter,
  Injectable,
  OnDestroy,
  Pipe,
  PipeTransform
} from '@angular/core';

@Injectable()
@Pipe({
  name: 'translate',
  pure: false // required to update the value when the promise is resolved
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  transform() {}
  ngOnDestroy() {}
}
