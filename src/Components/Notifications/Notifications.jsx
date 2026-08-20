import React, { useState } from "react";
import Header from "../Header/Header";
import { notifications as initialNotifications } from "../../data/data";
import "./Notifications.css";

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="eh-screen">
      <Header title="Notifications" />
      <div className="eh-page">
        {unreadCount > 0 && (
          <div className="eh-notif-toolbar">
            <span>{unreadCount} unread</span>
            <button className="eh-link" onClick={markAllRead}>
              Mark all as read
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="eh-empty">You're all caught up.</div>
        ) : (
          <div className="eh-notif-list">
            {items.map((n) => (
              <button
                key={n.id}
                className={`eh-notif-row ${n.read ? "" : "eh-notif-row--unread"}`}
                onClick={() => markRead(n.id)}
              >
                {!n.read && <span className="eh-notif-dot" />}
                <div className="eh-notif-body">
                  <div className="eh-notif-title">{n.title}</div>
                  <div className="eh-notif-text">{n.body}</div>
                  <div className="eh-notif-time">{n.time}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
