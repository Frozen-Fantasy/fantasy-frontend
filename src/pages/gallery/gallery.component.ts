import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from 'src/ui/player-card/player-card.component';
import { GalleryService } from './gallery.service';
import { take, tap } from 'rxjs';
import { LetDirective } from 'src/utils/directives/ngLet.directive';
import { ButtonComponent } from 'src/ui/kit/button/button.component';
import { TabsComponent } from 'src/ui/kit/tabs/tabs.component';
import { TabComponent } from 'src/ui/kit/tab/tab.component';

@Component({
	selector: 'frozen-fantasy-gallery',
	standalone: true,
	imports: [CommonModule, PlayerCardComponent, LetDirective, TabsComponent, TabComponent, ButtonComponent],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.less',
})
export class GalleryComponent {
	unpackedPlayers$ = this.galleryService.unpackedPlayers$;
	packedPlayers$ = this.galleryService.packedPlayers$;
	constructor(private galleryService: GalleryService) {
		this.galleryService.getUnpackedPlayers();
		this.galleryService.getPackedPlayers();
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
}
