import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../tab/tab.component';

@Component({
	selector: 'frozen-fantasy-tabs',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit {
	@Input() disabled!: boolean;
	@Output() currentTabChange = new EventEmitter<TabComponent>();

	ifTabSelected: boolean = false;
	tabs: TabComponent[] = [];

	addTab(tab: TabComponent) {
		this.tabs.push(tab);
	}

	selectTab(tab: TabComponent) {
		this.tabs.forEach(tab => {
			tab.active = false;
		});
		tab.active = true;
		this.currentTabChange.emit(tab);
	}

	isDisabled() {
		if (this.disabled) {
			return "block";
		} else return "none";
	}

	ngAfterViewInit() {
		this.tabs.forEach(tab => {
			if (tab.active) {
				this.selectTab(tab);
				this.ifTabSelected = true;
			}
		});
		if (!this.ifTabSelected) {
			this.selectTab(this.tabs[0]);
		}
	}
}
