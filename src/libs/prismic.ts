import * as prismic from '@prismicio/client';

export const createClient = (config = {}) => {
  const endpoint = prismic.getRepositoryEndpoint("conectabem"); // Gera o endpoint correto
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  return client;
};

export async function getMenuData() {
  const client = createClient();
  const menuResponse = await client.getAllByType('navegationmenu');
  const menuArray = menuResponse[0].data.menu;

  return await Promise.all(
    menuArray.map(async (menuItem: any) => {
      const menuItemRef = menuItem['menu-item'];
      const menuItemResponse = await client.getByID(menuItemRef.id);
      const menuItemData = menuItemResponse.data;

      let submenuData: any[] = [];
      if (menuItemData.submenu) {
        let submenuItems = [];
        if (Array.isArray(menuItemData.submenu)) {
          submenuItems = menuItemData.submenu;
        } else if (
          typeof menuItemData.submenu === 'object' &&
          Object.keys(menuItemData.submenu).length > 0
        ) {
          submenuItems = [menuItemData.submenu];
        }
        submenuData = await Promise.all(
          submenuItems.map(async (subItem: any) => {
            
            if (subItem.id) {
              const subResponse = await client.getByID(subItem.id);
              const subData = subResponse.data;
              console.log(subData);
              return { text: subData.submenu_text, link: subData.link };
            } else {
              return { text: subItem.text, link: subItem.link };
            }
          })
        );
        submenuData = submenuData.filter(item => item && (item.text || item.link));
      }

      const menuObject: any = {
        text: menuItemData.text,
        link: menuItemData.link,
      };

      if (submenuData.length > 0) {
        menuObject.submenu = submenuData;
      }

      return menuObject;
    })
  );
}
