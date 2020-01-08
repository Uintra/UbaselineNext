import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ubl-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotImplementedComponent {
  @Input() data: any;
  @Input() description: string;
}
