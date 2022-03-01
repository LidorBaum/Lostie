import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        notificationData: {
            severity: '',
            summary: ''
        }
    }),
    actions: {
        newNotification(severity, summary) {
            console.log('I am planning new notfi', severity, summary);
            this.notificationData = {
                severity,
                summary
            }
        },
        test() {
            console.log('tessting asctions');
        }
    }
})