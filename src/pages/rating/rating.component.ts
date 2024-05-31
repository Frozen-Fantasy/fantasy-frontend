import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../gallery/gallery.service';
import { LetDirective } from 'src/utils/directives/ngLet.directive';
import { IPlayer } from '../gallery/interfaces';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { BehaviorSubject, combineLatest, map, take, tap } from 'rxjs';
import { FilterPlayersComponent } from 'src/ui/filter-players/filter-players.component';

@Component({
	selector: 'frozen-fantasy-rating',
	standalone: true,
	imports: [CommonModule, LetDirective, ButtonComponent, FilterPlayersComponent],
	templateUrl: './rating.component.html',
	styleUrl: './rating.component.less',
})
export class RatingComponent {
	players$;
	fpSort = new BehaviorSubject(false);
	initialPlayers: IPlayer[] = [];
	priceSort = new BehaviorSubject(false);
	constructor(private galleryService: GalleryService) {
		this.players$ = combineLatest([this.galleryService.getAllPlayers().pipe(take(1), tap(players => this.initialPlayers = players)), this.fpSort, this.priceSort]).pipe(
			map(([players, fpSort, priceSort]) => {
				if (fpSort) {
					return players.sort((player1, player2) => player2.avgFantasyPoints - player1.avgFantasyPoints);
				}
				return players;
			}),
			map((players) => {
				if (this.priceSort.value) {
					return players.sort((player1, player2) => player2.playerCost - player1.playerCost)
				}
				return players;
			})
		);
	}

	sortByFP() {
		this.fpSort.next(true);
	}
	sortByPrice() {
		this.priceSort.next(true);
	}

	onFilter(players: any) {

	}
}
