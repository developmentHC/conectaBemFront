 import { getMenuData } from "@/libs/getMenuData";
 import { getHomePlaceholderData } from "@/libs/getHomePlaceholderData";

 export const fetchInitialData = async () => {
   const menuData = await getMenuData();
   const homePlaceholderData = await getHomePlaceholderData();

   return {
     menuData,
     homePlaceholderData,
   };
 };