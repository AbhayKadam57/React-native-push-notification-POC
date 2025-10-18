# 🔔 React Native Push Notification POC

A proof-of-concept React Native application demonstrating Firebase Cloud Messaging (FCM) integration with Notifee for local and remote push notifications.

## 📱 Features

- ✅ Firebase Cloud Messaging (FCM) integration
- ✅ Local notifications using Notifee
- ✅ Foreground and background message handling
- ✅ Android notification channels
- ✅ Permission management
- ✅ Test notification functionality
- ✅ Cross-platform support (Android/iOS)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- Firebase project with FCM enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbhayKadam57/React-native-push-notification-POC.git
   cd React-native-push-notification-POC
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (if developing for iOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

## 🔥 Firebase Configuration

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Cloud Messaging

### 2. Android Configuration
1. In Firebase Console, add an Android app
2. Use package name: `com.abhay.pushdemo` (or update accordingly)
3. Download `google-services.json`
4. Place it in `android/app/google-services.json`

### 3. iOS Configuration (Optional)
1. In Firebase Console, add an iOS app
2. Use bundle ID matching your iOS project
3. Download `GoogleService-Info.plist`
4. Add it to your iOS project in Xcode

## 🛠️ Development Setup

### Running the App

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Start Metro Bundler:**
```bash
npm start
```

### Testing Notifications

1. **Local Test**: Use the "Send Test Notification" button in the app
2. **Remote Test**: Send notifications from Firebase Console or your server

## 📦 Dependencies

### Core Dependencies
- `@react-native-firebase/app` - Firebase core functionality
- `@react-native-firebase/messaging` - Firebase Cloud Messaging
- `@notifee/react-native` - Local notification management
- `react-native-safe-area-context` - Safe area handling

### Development Dependencies
- `@react-native/metro-config` - Metro bundler configuration
- `@types/react` - TypeScript definitions
- `eslint` - Code linting

## 🔧 Configuration Files

### Important Files
- `android/app/google-services.json` - Firebase Android configuration ⚠️ **Not in repo**
- `ios/GoogleService-Info.plist` - Firebase iOS configuration ⚠️ **Not in repo**
- `android/app/build.gradle` - Android build configuration
- `package.json` - Dependencies and scripts

## 🔐 Security Notice

**⚠️ IMPORTANT:** The following files contain sensitive information and are excluded from the repository:

- `google-services.json`
- `GoogleService-Info.plist`
- `.env` files
- Any files containing API keys or secrets

**For team members:** You must obtain your own Firebase configuration files and place them in the correct locations.

## 📱 App Structure

```
src/
├── App.tsx                 # Main application component
├── index.js               # App entry point
└── components/            # Reusable components (future)

android/
├── app/
│   ├── google-services.json  # Firebase config (not in repo)
│   └── build.gradle          # Android build config

ios/
├── AwesomeProject/
│   └── GoogleService-Info.plist  # Firebase config (not in repo)
```

## 🔔 Notification Flow

### 1. App Initialization
- Creates notification channel
- Requests Firebase and Notifee permissions
- Gets FCM token for device identification

### 2. Foreground Notifications
- Listens for incoming FCM messages
- Displays notifications using Notifee
- Handles user interactions

### 3. Background Notifications
- Processes messages when app is not active
- Shows system notifications
- Maintains notification history

## 🧪 Testing Guide

### Local Notifications
1. Open the app
2. Tap "Send Test Notification" button
3. Verify notification appears

### Remote Notifications
1. Get FCM token from app logs
2. Use Firebase Console > Cloud Messaging
3. Send test message to the token
4. Verify notification appears both in foreground and background

### Permission Testing
1. Fresh install the app
2. Grant notification permissions when prompted
3. Check console logs for permission status

## 🐛 Troubleshooting

### Common Issues

**Notifications not showing:**
- Check notification permissions in device settings
- Verify `google-services.json` is correctly placed
- Check console logs for errors
- Ensure notification channels are created

**Build errors:**
- Clean and rebuild: `cd android && ./gradlew clean && cd ..`
- Check package name matches Firebase configuration
- Verify all dependencies are installed

**Token not generating:**
- Check internet connection
- Verify Firebase project configuration
- Check Google Services plugin in build.gradle

### Debug Commands
```bash
# Check device logs (Android)
adb logcat | grep -E "(notifee|firebase|FCM)"

# Clear app data
adb shell pm clear com.abhay.pushdemo

# Reset Metro cache
npx react-native start --reset-cache
```

## 📊 Testing Checklist

- [ ] App builds successfully on Android
- [ ] App builds successfully on iOS (if applicable)
- [ ] Local test notification works
- [ ] Firebase permissions granted
- [ ] FCM token generated
- [ ] Foreground notifications display
- [ ] Background notifications display
- [ ] Notification tap handling works
- [ ] App doesn't crash on notification events

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is for educational/POC purposes. Feel free to use and modify as needed.

## 👤 Author

**Abhay Kadam**
- GitHub: [@AbhayKadam57](https://github.com/AbhayKadam57)

## 🙏 Acknowledgments

- React Native team for the excellent framework
- Firebase team for FCM services
- Notifee team for local notification management
- Open source community for invaluable resources

---

**⭐ Star this repo if it helped you!**
