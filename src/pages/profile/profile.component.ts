import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITransaction, UserService } from 'src/services/auth/user.service';
import { IUserInfo } from 'src/core/interfaces';
import { CoinsComponent } from 'src/ui/kit/coins/coins.component';

@Component({
	selector: 'frozen-fantasy-profile',
	standalone: true,
	imports: [CommonModule, CoinsComponent],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
	userInfo: IUserInfo;
	transactions: ITransaction[] = [];
	constructor(private userService: UserService, private cdr: ChangeDetectorRef) {
		this.userInfo = this.userService.userInfo;
		this.userService.getTransactions().subscribe(transactions => {
			this.transactions = transactions;
			this.cdr.detectChanges();
		});
	}
}
