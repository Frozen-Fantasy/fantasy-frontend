import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../gallery/gallery.service';
import { LetDirective } from 'src/utils/directives/ngLet.directive';
import { IPlayer } from '../gallery/interfaces';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { BehaviorSubject, combineLatest, map, take, tap } from 'rxjs';
import { FilterPlayersComponent, IFilterPlayer } from 'src/ui/filter-players/filter-players.component';

@Component({
	selector: 'frozen-fantasy-rating',
	standalone: true,
	imports: [CommonModule, LetDirective, ButtonComponent, FilterPlayersComponent],
	templateUrl: './rating.component.html',
	styleUrl: './rating.component.less',
})
export class RatingComponent {
	players$ = new BehaviorSubject<IPlayer[]>([]);
	fpSort = new BehaviorSubject(false);
	initialPlayers: IPlayer[] = [];
	priceSort = new BehaviorSubject(false);

	get initialFilterPlayers(): IFilterPlayer[] {
		return this.initialPlayers.map(player => ({
			id: player.id,
			leagueName: player.leagueName,
			positionName: player.positionName,
			name: player.name
		} as IFilterPlayer))
	}
	constructor(private galleryService: GalleryService) {
		combineLatest([this.galleryService.getAllPlayers().pipe(take(1), tap(players => {
			this.initialPlayers = players;
			this.players$.next(players);
		})), this.fpSort, this.priceSort]).pipe(
			map(([players, fpSort, priceSort]) => {
				if (fpSort) {
					return this.players$.value.sort((player1, player2) => player2.avgFantasyPoints - player1.avgFantasyPoints);
				}
				return players;
			}),
			map((players) => {
				if (this.priceSort.value) {
					return this.players$.value.sort((player1, player2) => player2.playerCost - player1.playerCost)
				}
				return players;
			})
		).subscribe();
	}

	sortByFP() {
		this.fpSort.next(true);
		this.priceSort.next(false);
	}
	sortByPrice() {
		this.priceSort.next(true);
		this.fpSort.next(false);
	}

	onFilter(playerIds: number[]) {
		const filteredPlayers: IPlayer[] = [];
		playerIds.forEach(id => {
			const findPlayer = this.initialPlayers.find(player => player.id === id);
			if (findPlayer) {
				filteredPlayers.push(findPlayer);
			}
		});
		this.players$.next(filteredPlayers);
	}
}
