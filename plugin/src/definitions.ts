import {SnackbarOpts} from "./interfaces";
import {PluginListenerHandle} from "@capacitor/core";

declare module "@capacitor/core" {
  interface PluginRegistry {
    SnackBarGFC: SnackBarGFCPlugin;
  }
}

export interface SnackBarGFCPlugin {
  show(options: SnackbarOpts): Promise<{}>;
  dismissShowingSnackbar(): Promise<{}>;
  addListener(eventName: 'snackbarEvent', listenerFunc: () => void): PluginListenerHandle;
}
