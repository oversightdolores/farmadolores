package com.overcode.farmadolores;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class MyBootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("MyBootReceiver", "Boot completed. Starting app...");
        // Inicia tu aplicación aquí
        Intent launchIntent = new Intent(context, MainActivity.class);
            launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(launchIntent);

    }
}
