import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentRegistrationComponent } from './tournament-registration.component';

describe('TournamentRegistrationComponent', () => {
	let component: TournamentRegistrationComponent;
	let fixture: ComponentFixture<TournamentRegistrationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TournamentRegistrationComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TournamentRegistrationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
