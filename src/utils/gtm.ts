declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Função para enviar eventos customizados via GTM
export const gtmPush = (data: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Eventos específicos do ConectaBem para GTM
export const gtmEvents = {
  // Autenticação
  login: (method: "email" | "google") => {
    gtmPush({
      event: "login",
      method: method,
      event_category: "authentication",
    });
  },

  register: (method: "email" | "google") => {
    gtmPush({
      event: "sign_up",
      method: method,
      event_category: "authentication",
    });
  },

  logout: () => {
    gtmPush({
      event: "logout",
      event_category: "authentication",
    });
  },

  // Navegação
  pageView: (pageName: string) => {
    gtmPush({
      event: "page_view",
      page_name: pageName,
      event_category: "navigation",
    });
  },

  // Busca
  search: (searchTerm: string, category?: string) => {
    gtmPush({
      event: "search",
      search_term: searchTerm,
      search_category: category,
      event_category: "search",
    });
  },

  // Evento customizado genérico
  customEvent: (eventName: string, parameters: Record<string, any> = {}) => {
    gtmPush({
      event: eventName,
      ...parameters,
    });
  },
};
