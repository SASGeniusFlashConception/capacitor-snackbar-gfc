import {Component} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {DeviceInfo, Plugins} from '@capacitor/core';
import {SnackbarOpts} from 'capacitor-snackbar-gfc/dist/esm/interfaces';
import {SettingsComponent} from './components/settings/settings.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {DURATION_ENUM, POSITION_ENUM, TYPE_LINE_ENUM} from 'capacitor-snackbar-gfc/dist/esm/enums';

const {SnackBarGFC, Device} = Plugins;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private _optionSnackbar: SnackbarOpts;
    private _infoDevice: BehaviorSubject<DeviceInfo>;
    private _deviceInfo: DeviceInfo;
    private _platform: string;
    public settingJsonObject: string;

    public get infoDevice(): Observable<DeviceInfo> {
        return this._infoDevice.asObservable();
    }

    constructor(private _modalCtrl: ModalController, private _toastCtrl: ToastController) {
        this._infoDevice = new BehaviorSubject(null);
        const info = this.getInfo();
        info.then(value => this._infoDevice.next(value));
        this.infoDevice.subscribe((infos: DeviceInfo) => {
            this._deviceInfo = infos;
            this._platform = this._deviceInfo ? this._deviceInfo.platform : 'web';
        });
        this._optionSnackbar = {
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            duration: DURATION_ENUM.INDEFINITE,
            messageStyle: {
                messagePosition: POSITION_ENUM.DEFAULT,
                messageTypeLine: TYPE_LINE_ENUM.DEFAULT,
                messageMaxLine: 5,
                messageColor: '#F0F0F0'
            },
            buttonAction: true,
            buttonActionStyle: {
                buttonActionText: 'Close',
                buttonActionColor: '#BA85FA'
            },
            backgroundColor: '#292929'
        };
        this.settingJsonObject = JSON.stringify(this._optionSnackbar, null, '<br>');

        SnackBarGFC.addListener('snackbarEvent',
            () => {
                // your code...
            }
        );
    }

    private async getInfo() {
        return await Device.getInfo();
    }

    async show() {
        if (this._platform === 'android') {
            SnackBarGFC.show(this._optionSnackbar);
        }

        if (this._platform === 'web') {
            let buttonToast = [];
            if (this._optionSnackbar.buttonAction) {
                buttonToast = [
                    {
                        side: 'end',
                        text: this._optionSnackbar.buttonActionStyle.buttonActionText,
                        handler: () => {

                        }
                    }
                ];
            }
            const toast = await this._toastCtrl.create({
                message: this._optionSnackbar.message,
                position: 'bottom',
                buttons: buttonToast
            });
            if (this._optionSnackbar.duration !== DURATION_ENUM.INDEFINITE) {
                toast.duration = this._optionSnackbar.duration === DURATION_ENUM.LONG ? 3000 : 2000;
            }

            toast.present();
        }

    }

    async openSettings() {
        const settingsModal = await this._modalCtrl.create({
            component: SettingsComponent,
            componentProps: {
                optionSnackbar: this._optionSnackbar
            }
        });

        if (this._platform === 'android') {
            SnackBarGFC.dismissShowingSnackbar();
        }


        await settingsModal.present();

        settingsModal.onDidDismiss().then((modalValue: any) => {
            const data = modalValue.data;
            if (data) {
                this._optionSnackbar = {
                    message: data.message ? data.message : 'Failed message...',
                    duration: data.duration ? data.duration : DURATION_ENUM.LONG,
                    messageStyle: {
                        messagePosition: data.messagePosition ? data.messagePosition : POSITION_ENUM.DEFAULT,
                        messageTypeLine: data.messageTypeLine ? data.messageTypeLine : TYPE_LINE_ENUM.DEFAULT,
                        messageColor: data.messageColor ? data.messageColor : null,
                    },
                    buttonAction: data.buttonAction ? data.buttonAction : false,
                    buttonActionStyle: {
                        buttonActionText: data.buttonActionText ? data.buttonActionText : null,
                        buttonActionColor: data.buttonActionColor ? data.buttonActionColor : null,
                    },
                    backgroundColor: data.backgroundColor ? data.backgroundColor : null
                };
            }
        });

    }


}
