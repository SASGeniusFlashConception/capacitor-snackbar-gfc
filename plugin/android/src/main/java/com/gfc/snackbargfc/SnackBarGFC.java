package com.gfc.snackbargfc;

import android.content.Intent;
import android.graphics.Color;
import android.view.Gravity;
import android.view.View;

import androidx.coordinatorlayout.widget.CoordinatorLayout;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.material.snackbar.Snackbar;

@NativePlugin()
public class SnackBarGFC extends Plugin {

    @PluginMethod()
    public void show(PluginCall call) {
        CharSequence text = call.getString("text", null);
        String btnText = call.getString("btnText", null);
        String position = call.getString("position", "bottom");
        final String durationType = call.getString("duration", "short");
        String backgroundColor = call.getString("backgroundColor", "#4A4747");
        String buttonTextColor = call.getString("buttonTextColor", "#E35A5A");
        String messageColor = call.getString("messageColor", "#FFFFFF");


        if(text == null) {
            call.error("Must provide text");
            return;
        }

        if(btnText == null) {
            call.error("Must provide btnText");
            return;
        }

        int duration = Snackbar.LENGTH_SHORT;
        if("long".equals(durationType)) {
            duration = Snackbar.LENGTH_LONG;
        }
        if("indefinite".equals(durationType)) {
            duration = Snackbar.LENGTH_INDEFINITE;
        }


        CoordinatorLayout coordinatorLayout = new CoordinatorLayout(getContext());
        CoordinatorLayout.LayoutParams coordinatorParams = new CoordinatorLayout.LayoutParams(
               CoordinatorLayout.LayoutParams.WRAP_CONTENT,
               CoordinatorLayout.LayoutParams.WRAP_CONTENT
        );
        if("top".equals(position))
        {
            coordinatorParams.gravity = Gravity.TOP;
        }

        coordinatorLayout.setLayoutParams(coordinatorParams);

        final Snackbar snackbar = Snackbar.make(coordinatorLayout, text, duration)
                .setBackgroundTint(Color.parseColor(backgroundColor))
                .setTextColor(Color.parseColor(messageColor))
                .setActionTextColor(Color.parseColor(buttonTextColor));


        snackbar.setAction(btnText, new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                notifyListeners("snackbarEvent", null);
                if("indefinite".equals(durationType))
                {
                    snackbar.dismiss();
                }
            }
        });
        /*View snackBarView = snackbar.getView();
        snackBarView.setBackgroundColor();*/
        snackbar.show();
        call.success();
    }
}
