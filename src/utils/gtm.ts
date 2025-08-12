declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const gtmPush = (data: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

export const gtmEvents = {
  login: (method: "email" | "google") => {
    gtmPush({
      event: "login",
      method: method,
      event_category: "authentication",
    });
  },

  pageView: (pageName: string) => {
    gtmPush({
      event: "page_view",
      page_name: pageName,
      event_category: "navigation",
    });
  },
};
