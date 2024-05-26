import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPlayersComponent } from './filter-players.component';

describe('FilterPlayersComponent', () => {
	let component: FilterPlayersComponent;
	let fixture: ComponentFixture<FilterPlayersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FilterPlayersComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FilterPlayersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
