// jest.setup.js
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock de Animated
jest.mock('@notifee/react-native', () => require('@notifee/react-native/jest-mock'));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock de Notifee
jest.mock('@notifee/react-native', () => ({
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getNotificationSettings: jest.fn(() =>
        Promise.resolve({ authorizationStatus: 1 })
    ),
    displayNotification: jest.fn(() => Promise.resolve()),
    onForegroundEvent: jest.fn(() => jest.fn()), // retourne unsubscribe
    onBackgroundEvent: jest.fn(() => jest.fn()),
    createChannel: jest.fn(() => Promise.resolve('default')),
    setBadgeCount: jest.fn(() => Promise.resolve()),
    getBadgeCount: jest.fn(() => Promise.resolve(0)),
}));
