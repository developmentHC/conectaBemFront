import { createClient } from "@/libs/prismic";

export async function getMenuData() {
  const client = createClient();
  const menuResponse = await client.getAllByType('navegationmenu');
  const menuArray = menuResponse[0].data.menu;

  return await Promise.all(
    menuArray.map(async (menuItem: any) => {
      const menuItemRef = menuItem['menu-item'];
      const menuItemResponse = await client.getByID(menuItemRef.id);
      const menuItemData = menuItemResponse.data;
      return menuItemData;
    })
  );
}