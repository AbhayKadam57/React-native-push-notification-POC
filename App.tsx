/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useEffect } from 'react';

async function createAndroidChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}

async function testLocalNotification() {
  try {
    await notifee.displayNotification({
      title: 'Test Notification',
      body: 'This is a test notification to verify setup',
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
    console.log('Test notification sent');
  } catch (error) {
    console.error('Test notification error:', error);
    Alert.alert('Error', 'Failed to send test notification');
  }
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  useEffect(() => {
    // create channel on startup
    createAndroidChannel();

    // 1) Request Firebase messaging permission
    const requestPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();

        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log('Firebase Permission enabled:', enabled);

        // Also request Notifee permissions
        const notifeeSettings = await notifee.requestPermission();
        console.log('Notifee Permission:', notifeeSettings.authorizationStatus);

        return enabled;
      } catch (error) {
        console.error('Permission request error:', error);
        return false;
      }
    };

    // Call the permission request function
    requestPermission();

    // 2) Get FCM token (send to your server)
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM token:', token);
        // TODO: send token to your server for sending pushes
      })
      .catch(error => {
        console.error('Token error:', error);
      });

    // 3) Foreground messages - display using Notifee
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message:', remoteMessage);

      try {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title ?? 'No title',
          body: remoteMessage.notification?.body ?? 'No body',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
          },
        });
        console.log('Notification displayed successfully');
      } catch (error) {
        console.error('Notification display error:', error);
      }
    });

    // 4) Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background Message:', remoteMessage);
      
      try {
        await notifee.displayNotification({
          title: remoteMessage.notification?.title ?? 'Background notification',
          body: remoteMessage.notification?.body ?? 'Background message',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
            },
          },
        });
      } catch (error) {
        console.error('Background notification error:', error);
      }
    });

    // 5) Handle when user taps a notification (app opened)
    notifee.onForegroundEvent(({ type, detail }) => {
      console.log('notifee event', type, detail);
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Push Notification Test</Text>
        <TouchableOpacity style={styles.button} onPress={testLocalNotification}>
          <Text style={styles.buttonText}>Send Test Notification</Text>
        </TouchableOpacity>
      </View>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
