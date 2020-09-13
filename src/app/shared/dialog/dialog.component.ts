import {
  Component,
  Inject,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnInit,
  OnDestroy,
  Type,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';

export interface DialogData<TInnerComponentType extends Type<unknown>> {
  innerComponentType: TInnerComponentType;
  title?: string;
  buttonCloseFalse?: string;
  buttonCloseTrue?: string;
}

export interface CreateComponentOptions<TInnerComponentType extends Type<unknown>> {
  dialog: MatDialog;
  dialogConfig?: Partial<MatDialogConfig>;
  dialogData: DialogData<TInnerComponentType>;
  onOpened?: (componentInstance: InstanceType<TInnerComponentType>) => void;
}

const defaultDialogConfig: Partial<MatDialogConfig> = {
  disableClose: true,
  autoFocus: false,
  width: '600px',
  restoreFocus: false,
};

const defaultDialogData: Partial<DialogData<any>> = {
  buttonCloseFalse: '',
  buttonCloseTrue: '',
};

export function createDialogComponent<TInnerComponentType extends Type<unknown>>(
  options: CreateComponentOptions<TInnerComponentType>,
): MatDialogRef<DialogComponent> {
  const dialogConfig = new MatDialogConfig();
  const dialogConfigOptions = { ...defaultDialogConfig, ...options.dialogConfig };
  const { disableClose, autoFocus, width } = dialogConfigOptions;
  dialogConfig.disableClose = disableClose;
  dialogConfig.autoFocus = autoFocus;
  dialogConfig.width = width;
  dialogConfig.data = options.dialogData;

  const matDialogRef: MatDialogRef<DialogComponent> = options.dialog.open(DialogComponent, dialogConfig);
  const afterOpenSub: Subscription = matDialogRef.afterOpened().subscribe(() => {
    afterOpenSub.unsubscribe();

    if (options.onOpened) {
      const innerComponentInstance: InstanceType<TInnerComponentType> =
        matDialogRef.componentInstance.componentRef.instance;

      options.onOpened(innerComponentInstance);
    }
  });

  return matDialogRef;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('dialogContent', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;
  componentRef: ComponentRef<any>;
  closeDialog$: Observable<boolean>;
  private closeDialogEvent: Subject<boolean> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: DialogData<any>,
  ) {
    this.closeDialog$ = this.closeDialogEvent.asObservable();

    this.data = { ...defaultDialogData, ...data };
  }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.innerComponentType);
    this.componentRef = this.vcRef.createComponent(factory);
  }

  okButton() {
    this.closeDialogEvent.next(true);
  }

  closeDialog(): void {
    this.closeDialogEvent.next(false);
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.closeDialogEvent.complete();
    }
  }
}
