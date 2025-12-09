# How to Build Your Android App

I have set up the project to wrap your live website (`https://ip2026.vercel.app`) into an Android App.

## Prerequisites
1.  **Download & Install Android Studio**: [https://developer.android.com/studio](https://developer.android.com/studio)
2.  Open Android Studio and install the **Android SDK** and **Virtual Device** (Emulator) if prompted.

## Steps to Run/Build the App

1.  **Open the Android Project**:
    *   Open Android Studio.
    *   Click "Open" and select the folder:
        `C:\Users\arun1\OneDrive\Desktop\IP 2026\study-planner\android`

2.  **Wait for Gradle Sync**:
    *   Android Studio will take a few minutes to download dependencies (Gradle) and index the project. Look at the bottom right bar.

3.  **Run on Emulator**:
    *   Once synced, click the **Green Play Button (▶)** in the top toolbar.
    *   Select a device (pixel, etc.) to run it.

4.  **Build APK (for sharing)**:
    *   Go to menu: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
    *   Once it finishes, a notification will appear. Click "locate" to find the `.apk` file.
    *   You can send this APK to your phone and install it!

## Important Note
Since we configured the app to point to your live website (`ip2026.vercel.app`), **any changes you push to Vercel will instantly appear in the app** without needing to rebuild the APK! 
(Except native plugin changes).
