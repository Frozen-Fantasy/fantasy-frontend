import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from 'src/ui/player-card/player-card.component';
import { GalleryService } from './gallery.service';
import { filter, take, tap } from 'rxjs';
import { LetDirective } from 'src/utils/directives/ngLet.directive';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { TabsComponent } from 'src/ui/kit/tabs/tabs.component';
import { TabComponent } from 'src/ui/kit/tab/tab.component';
import { CheckboxComponent } from 'src/ui/kit/checkbox/checkbox.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/ui/kit/input/input.component';
import { IPlayer, IPlayerCard, PlayerPositionName } from './interfaces';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPlayersComponent, IFilterPlayer } from 'src/ui/filter-players/filter-players.component';

@Component({
	selector: 'frozen-fantasy-gallery',
	standalone: true,
	imports: [CommonModule, PlayerCardComponent, LetDirective, TabsComponent, TabComponent, ButtonComponent, ReactiveFormsModule, FilterPlayersComponent],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.less',
})
export class GalleryComponent {
	unpackedPlayers$ = this.galleryService.unpackedPlayers$;
	packedPlayers$ = this.galleryService.packedPlayers$;
	initialUnpackedPlayers: IPlayerCard[] = [];

	get initialFilterPlayers(): IFilterPlayer[] {
		return this.initialUnpackedPlayers.map(player => ({
			id: player.id,
			leagueName: player.leagueName,
			positionName: player.positionName,
			name: player.name
		} as IFilterPlayer))
	}
	constructor(private galleryService: GalleryService) {
		this.galleryService.getUnpackedPlayers();
		this.galleryService.getPackedPlayers();
		this.galleryService.unpackedPlayers$.pipe(filter(players => !!players.length), take(1)).subscribe((players) => {
			this.initialUnpackedPlayers = players
		});
	}

	unpackPlayer(id: number) {
		this.galleryService.unpackPlayer(id).subscribe(() => {
			this.galleryService.packedPlayers$.next(this.galleryService.packedPlayers$.value.map(player => {
				if (player.id === id) {
					return { ...player, unpacked: true }
				}
				return player;
			}))
		});
	}

	unpackAll() {
		this.packedPlayers$.pipe(take(1)).subscribe(players => {
			players.filter(player => !player.unpacked).forEach(player => this.unpackPlayer(player.id));
		});
	}

	onFilterPlayers(playerIds: number[]) {
		const filteredPlayers: IPlayerCard[] = [];
		playerIds.forEach(id => {
			const findPlayer = this.initialUnpackedPlayers.find(player => player.id === id);
			if (findPlayer) {
				filteredPlayers.push(findPlayer);
			}
		});
		this.unpackedPlayers$.next(filteredPlayers);
	}
}
