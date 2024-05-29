import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerResultCardComponent } from './player-result-card.component';

describe('PlayerResultCardComponent', () => {
	let component: PlayerResultCardComponent;
	let fixture: ComponentFixture<PlayerResultCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PlayerResultCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PlayerResultCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
