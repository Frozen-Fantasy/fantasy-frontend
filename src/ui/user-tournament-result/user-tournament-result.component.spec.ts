import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTournamentResultComponent } from './user-tournament-result.component';

describe('UserTournamentResultComponent', () => {
	let component: UserTournamentResultComponent;
	let fixture: ComponentFixture<UserTournamentResultComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserTournamentResultComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserTournamentResultComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
