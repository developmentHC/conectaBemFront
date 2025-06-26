import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/libs/prismic";
import { QueryClient } from "@tanstack/react-query";
import { MenuItem } from "@/components/Header/types";

export const queryClient = new QueryClient();

async function fetchMenuData(): Promise<MenuItem[]> {
  const client = createClient();
  const menuResponse = await client.getAllByType("navegationmenu");

  if (!menuResponse[0]) {
    throw new Error("Menu document not found");
  }

  const menuArray = menuResponse[0].data.menu;

  return Promise.all(
    menuArray.map(async (menuItem: any) => {
      const menuItemRef = menuItem["menu-item"];
      const menuItemResponse = await client.getByID(menuItemRef.id);
      return menuItemResponse.data;
    })
  );
}

export function useMenuData() {
  return useQuery<MenuItem[], Error>({
    queryKey: ["navigationMenu"],
    queryFn: fetchMenuData,
    staleTime: 7 * 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
