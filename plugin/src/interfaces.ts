import {DURATION_ENUM, POSITION_ENUM} from "./enums";

export interface SnackbarOpts {
    text: string;
    btnText: string;
    duration: DURATION_ENUM;
    positionText?: POSITION_ENUM;
    backgroundColor?: string;
    buttonTextColor?:string;
    messageColor?: string;
}