import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API_CONSTANTS from '@/services/config';
import { io } from 'socket.io-client';

interface Notification {
    id: number;
    message: string;
    read: boolean;
}

interface NotificationsContextType {
    notifications: Notification[];
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const socket = io(`${API_CONSTANTS.API_BASE_URL}/notifications`, {
        withCredentials: true,
        transports: ["websocket"],
      });
    
      useEffect(() => {
        socket.on("connect", () => {});
    
        
    
        socket.on("disconnect", () => {});
    
        return () => {
          socket.disconnect();
        };
      }, [socket]);

    return (
        <NotificationsContext.Provider value={{ notifications}}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = (): NotificationsContextType => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};