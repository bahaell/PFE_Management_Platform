importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyD9BQHzlHFSSZgjP-ww1nrBsXBzxUr1cXA",
  authDomain: "notificationservice-87a89.firebaseapp.com",
  projectId: "notificationservice-87a89",
  storageBucket: "notificationservice-87a89.firebasestorage.app",
  messagingSenderId: "903540143870",
  appId: "1:903540143870:web:29a1ae72f5ddc6d9a797af"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Do NOT call self.registration.showNotification here if you are sending a 'notification' payload from the server.
  // Firebase automatically displays the notification for you. Calling it manually causes duplicate notifications.
});
