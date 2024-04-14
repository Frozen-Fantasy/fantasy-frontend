import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentsFilterComponent } from './tournaments-filter.component';

describe('TournamentsFilterComponent', () => {
	let component: TournamentsFilterComponent;
	let fixture: ComponentFixture<TournamentsFilterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TournamentsFilterComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TournamentsFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
