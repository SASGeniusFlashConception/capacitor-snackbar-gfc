package com.gfc.snackbargfc;

import android.graphics.Color;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.coordinatorlayout.widget.CoordinatorLayout;


import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.material.snackbar.Snackbar;

import java.util.ArrayList;
import java.util.List;

@NativePlugin()
public class SnackBarGFC extends Plugin {
    private List<Snackbar> activeSnackbars = new ArrayList<>();

    @PluginMethod()
    public void show(final PluginCall call) {

        CharSequence message = call.getString("message", null);
        if (message == null) {
            call.error("Must provide message");
            return;
        }

        JSObject messageStyleOpts = new JSObject();
        messageStyleOpts.put("messagePosition", "default");
        messageStyleOpts.put("messageTypeLine", "default");
        messageStyleOpts.put("messageMaxLine", 5);
        messageStyleOpts.put("messageColor", "#FFFFFF");

        JSObject messageStyle = call.getObject("messageStyle", messageStyleOpts);
        String messagePosition = messageStyle.getString("messagePosition", "default");
        String messageTypeLine = messageStyle.getString("messageTypeLine", "default");
        Integer messageMaxLine = messageStyle.getInteger("messageMaxLine", 5);
        String messageColor = messageStyle.getString("messageColor", "#FFFFFF");


        Boolean buttonAction = call.getBoolean("buttonAction", false);

        final String durationType = call.getString("duration", "short");

        String backgroundColor = call.getString("backgroundColor", "#4A4747");



        int duration = Snackbar.LENGTH_SHORT;
        if ("long".equals(durationType)) {
            duration = Snackbar.LENGTH_LONG;
        }
        if ("indefinite".equals(durationType)) {
            if(!buttonAction)
            {
                duration = Snackbar.LENGTH_LONG;
            }
            else {
                duration = Snackbar.LENGTH_INDEFINITE;
            }
        }

        ViewGroup view = (ViewGroup) ((ViewGroup) getActivity().findViewById(android.R.id.content)).getChildAt(0);


        if(activeSnackbars.size() > 0)
        {
            dismissShowingSnackbar(call);
        }

        final Snackbar snackbar = Snackbar.make(view, message, duration)
                .setBackgroundTint(Color.parseColor(backgroundColor))
                .setTextColor(Color.parseColor(messageColor));

        final FrameLayout snackbarLayout = (FrameLayout) snackbar.getView();

        TextView textView = snackbarLayout.findViewById(com.google.android.material.R.id.snackbar_text);
        if ("center".equals(messagePosition)) {

            textView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
        }

        if("multiline".equals(messageTypeLine))
        {
            if(messageMaxLine > 0)
            {
                textView.setMaxLines(messageMaxLine);
            }
        }


        if(buttonAction)
        {
            JSObject ButtonActionStyleOpts = new JSObject();
            ButtonActionStyleOpts.put("buttonActionText", null);
            ButtonActionStyleOpts.put("buttonActionColor", "#E35A5A");

            JSObject buttonActionStyle = call.getObject("buttonActionStyle", ButtonActionStyleOpts);
            String buttonActionText = buttonActionStyle.getString("buttonActionText", null);
            if (buttonActionText == null) {
                call.error("Must provide buttonActionText");
                return;
            }
            String buttonActionColor = buttonActionStyle.getString("buttonActionColor", "#E35A5A");


            snackbar.setActionTextColor(Color.parseColor(buttonActionColor));
            snackbar.setAction(buttonActionText, new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if ("indefinite".equals(durationType)) {
                        dismissShowingSnackbar(call);
                    }
                    notifyListeners("snackbarEvent", null);
                }
            });
        }

        activeSnackbars.add(snackbar);
        snackbar.show();
        call.success();
    }


    @PluginMethod()
    public void dismissShowingSnackbar(PluginCall call) {

        for (Snackbar snackbar : activeSnackbars) {
            if (snackbar != null) {
                snackbar.dismiss();
            }
        }

        activeSnackbars.clear();
        call.success();
    }
}
