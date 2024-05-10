import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
	selector: 'frozen-fantasy-tab',
	host: {
		"[class.hidden]": "!active"
	},
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tab.component.html',
	styleUrl: './tab.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
	@Input('tabTitle') title!: string;
	@Input() active!: boolean;

	constructor(tabs: TabsComponent) {
		tabs.addTab(this);
	}
}
