import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentsResultsComponent } from './tournaments-results.component';

describe('TournamentsResultsComponent', () => {
	let component: TournamentsResultsComponent;
	let fixture: ComponentFixture<TournamentsResultsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TournamentsResultsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TournamentsResultsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
