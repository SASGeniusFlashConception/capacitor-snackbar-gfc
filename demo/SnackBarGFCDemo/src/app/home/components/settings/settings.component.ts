import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TYPE_LINE_ENUM} from 'capacitor-snackbar-gfc/dist/esm/enums';
import {SnackbarOpts} from 'capacitor-snackbar-gfc/dist/esm/interfaces';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    @Input() optionSnackbar: SnackbarOpts;
    public formSnackBarSettings: FormGroup;

    constructor(private _modalCtrl: ModalController, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.formSnackBarSettings = this._formBuilder.group({});

        this.formSnackBarSettings.addControl('message', new FormControl(this.optionSnackbar.message, [Validators.required]));
        this.formSnackBarSettings.addControl('messagePosition', new FormControl(this.optionSnackbar.messageStyle.messagePosition, [Validators.required]));
        this.formSnackBarSettings.addControl('messageTypeLine', new FormControl(this.optionSnackbar.messageStyle.messageTypeLine, [Validators.required]));
        if (this.optionSnackbar.messageStyle.messageTypeLine === TYPE_LINE_ENUM.MULTILINE) {
            this.formSnackBarSettings.addControl('messageMaxLine', new FormControl(this.optionSnackbar.messageStyle.messageMaxLine));
        }

        this.formSnackBarSettings.addControl('messageColor', new FormControl(this.optionSnackbar.messageStyle.messageColor, [Validators.maxLength(7)]));

        this.formSnackBarSettings.addControl('duration', new FormControl(this.optionSnackbar.duration, [Validators.required]));
        this.formSnackBarSettings.addControl('backgroundColor', new FormControl(this.optionSnackbar.backgroundColor, [Validators.maxLength(7)]));

        this.formSnackBarSettings.addControl('buttonAction', new FormControl(this.optionSnackbar.buttonAction, [Validators.required]));
        if (this.optionSnackbar.buttonAction) {
            this.formSnackBarSettings.addControl('buttonActionText', new FormControl(this.optionSnackbar.buttonActionStyle.buttonActionText, [Validators.required]));
            this.formSnackBarSettings.addControl('buttonActionColor', new FormControl(this.optionSnackbar.buttonActionStyle.buttonActionColor, [Validators.maxLength(7)]));
        }
    }

    selectButtonAction(ev) {
        this.formSnackBarSettings.get('buttonAction').setValue(ev.detail.checked);
        if (ev.detail.checked) {
            this.formSnackBarSettings.addControl('buttonActionText', new FormControl(null, [Validators.required]));
            this.formSnackBarSettings.addControl('buttonActionColor', new FormControl('#', [Validators.maxLength(7)]));
        } else {
            if (this.formSnackBarSettings.get('duration').value === 'indefinite') {
                this.formSnackBarSettings.get('duration').setValue('long');
            }
            this.formSnackBarSettings.removeControl('buttonActionText');
            this.formSnackBarSettings.removeControl('buttonActionColor');
        }
    }

    selectMessageTypeLine(ev) {
        if (ev.detail.value === 'multiline') {
            this.formSnackBarSettings.addControl('messageMaxLine', new FormControl(this.optionSnackbar.messageStyle.messageMaxLine));
        } else {
            this.formSnackBarSettings.removeControl('messageMaxLine');
        }
    }

    selectTabStyle(ev) {
        this.formSnackBarSettings.get('tabStyle').setValue(ev.detail.checked);
    }


    closeSettings() {
        this._modalCtrl.dismiss(null, 'cancel');
    }

    saveSettings() {
        const data = this.formSnackBarSettings.getRawValue();
        this._modalCtrl.dismiss(data, 'save');
    }
}
