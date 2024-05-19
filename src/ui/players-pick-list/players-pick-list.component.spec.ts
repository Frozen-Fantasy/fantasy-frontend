import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersPickListComponent } from './players-pick-list.component';

describe('PlayersPickListComponent', () => {
	let component: PlayersPickListComponent;
	let fixture: ComponentFixture<PlayersPickListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PlayersPickListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PlayersPickListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
