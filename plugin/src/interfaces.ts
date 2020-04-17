import {DURATION_ENUM, TYPE_LINE_ENUM, POSITION_ENUM} from "./enums";

export interface SnackbarOpts {
    message: string;
    duration: DURATION_ENUM;
    messageStyle: MessageStyleOpts;
    buttonAction: boolean;
    buttonActionStyle?: ButtonActionStyleOpts;
    backgroundColor?: string;
}

export interface ButtonActionStyleOpts {
    buttonActionText: string;
    buttonActionColor?:string;
}

export interface MessageStyleOpts {
    messagePosition: POSITION_ENUM;
    messageTypeLine: TYPE_LINE_ENUM;
    messageMaxLine?: number;
    messageColor?: string;
}