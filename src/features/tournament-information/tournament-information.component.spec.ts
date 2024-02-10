import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentInformationComponent } from './tournament-information.component';

describe('TournamentInformationComponent', () => {
	let component: TournamentInformationComponent;
	let fixture: ComponentFixture<TournamentInformationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TournamentInformationComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TournamentInformationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
