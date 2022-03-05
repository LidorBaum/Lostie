import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notificationData: {
      severity: "",
      summary: "",
    },
  }),
  actions: {
    newNotification(severity, summary) {
      this.notificationData = {
        severity,
        summary,
      };
    },
  },
});
