import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notificationData: {
            severity: '',
            summary: '',
            life: 0,
        },
    }),
    actions: {
        newNotification(severity, summary, life) {
            this.notificationData = {
                severity,
                summary,
                life,
            };
        },
    },
});
