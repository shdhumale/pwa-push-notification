console.log("Service Worker Loaded...");

//This method will listen to the push received from the server.
self.addEventListener("push", e => {
  const data = e.data.json();
  console.log('[Service Worker] Push Received.');
  console.log('[Service Worker] Push had this data: "${event.data.text()}"');

  const title = data.title;
  const options = {
    body: 'Notification from NodeJs server',
    icon: 'image/icon-192x192.png',
    badge: 'image/icon-512x512.png'
  };
  self.registration.showNotification(title, options);
});
