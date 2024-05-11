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
import { IPlayer } from './interfaces';

@Component({
	selector: 'frozen-fantasy-gallery',
	standalone: true,
	imports: [CommonModule, PlayerCardComponent, LetDirective, TabsComponent, TabComponent, ButtonComponent, CheckboxComponent, ReactiveFormsModule, InputComponent],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.less',
})
export class GalleryComponent {
	unpackedPlayers$ = this.galleryService.unpackedPlayers$;
	packedPlayers$ = this.galleryService.packedPlayers$;
	initialUnpackedPlayers: IPlayer[] = [];
	form = new FormGroup({
		position: new FormControl(''),
		name: new FormControl(''),
		khlLeague: new FormControl<boolean>(true, { nonNullable: true }),
		nhlLeague: new FormControl<boolean>(true, { nonNullable: true })
	})
	constructor(private galleryService: GalleryService) {
		this.galleryService.getUnpackedPlayers();
		this.galleryService.getPackedPlayers();
		this.galleryService.unpackedPlayers$.pipe(filter(players => !!players.length), take(1)).subscribe((players) => {
			console.log(players);
			this.initialUnpackedPlayers = players
		});
		this.form.valueChanges.subscribe(formValue => {
			this.filterPlayers();
		})
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

	filterPlayers() {
		const filteredByLeague = this.initialUnpackedPlayers.filter(player => {
			if (player.leagueName === 'NHL') {
				return this.form.get('nhlLeague')?.value;
			}
			if (player.leagueName === 'KHL') {
				return this.form.get('khlLeague')?.value;
			}
			return false;
		});

		const filteredByName = filteredByLeague.filter(player => {
			return player.name.toLowerCase().trim().includes(this.form.get('name')?.value?.trim() ?? '');
		});
		this.galleryService.unpackedPlayers$.next(filteredByName);
	}
}
