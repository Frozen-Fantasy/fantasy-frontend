import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Subject, Observable, fromEvent, debounceTime, filter, share, startWith, switchMap, takeUntil, switchMapTo } from 'rxjs';

@Component({
	selector: 'frozen-fantasy-popup',
	standalone: true,
	imports: [CommonModule, CdkOverlayOrigin, CdkConnectedOverlay],
	templateUrl: './popup.component.html',
	styleUrl: './popup.component.less',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
	@Input() CdkOverlayOrigin!: CdkOverlayOrigin;
	@Output() close = new EventEmitter<any>();
	@Output() open = new EventEmitter<any>();

	@ViewChild('dialog') dialog!: ElementRef;
	isOpened = false;
	destroy$ = new Subject<any>();

	constructor(private changeDetectorRef: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		const CdkOverlayOriginEl = this.CdkOverlayOrigin.elementRef.nativeElement;

		const open$ = fromEvent(CdkOverlayOriginEl, 'mouseenter').pipe(
			filter(() => !this.isOpened),
			switchMap(enterEvent =>
				fromEvent(document, 'mousemove').pipe(
					startWith(enterEvent),
					debounceTime(300),
					filter((event: any) => CdkOverlayOriginEl === event['target'])
				)
			),
			share()
		);
		open$.pipe(takeUntil(this.destroy$))
			.subscribe(() => this.changeState(true));

		const close$ = fromEvent(document, 'mousemove').pipe(
			debounceTime(100),
			filter(() => this.isOpened),
			filter(event => this.isMovedOutside(CdkOverlayOriginEl, this.dialog, event))
		)

		open$.pipe(
			takeUntil(this.destroy$),
			switchMapTo(close$)

		).subscribe(() => {
			this.changeState(false);
		});

	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
	}

	connectedOverlayDetach() {
		this.changeState(false);
	}

	private changeState(isOpened: boolean) {
		this.isOpened = isOpened;
		isOpened ? this.open.emit() : this.close.emit();
		this.changeDetectorRef.markForCheck();
	}

	private isMovedOutside(CdkOverlayOriginEl: any, dialog: any, event: any): boolean {
		return !(CdkOverlayOriginEl.contains(event['target']) || dialog.nativeElement.contains(event['target']));
	}
}
