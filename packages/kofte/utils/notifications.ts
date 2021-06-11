export const isNotificationsSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

interface O {
  title: string;
  body: string;
  onClick: () => void;
}

export const notify = ({ title, body, onClick }: O) => {
  if (!isNotificationsSupported()) return;
  if (Notification.permission !== "granted") return;

  const notification = new Notification(title, {
    body
  });
  notification.onclick = onClick;
};
