 import { getMenuData } from "@/libs/getMenuData";
 import { getHomePlaceholderData } from "@/libs/getHomePlaceholderData";

 export const fetchInitialData = async () => {
   const menuData = await getMenuData();
   console.log(menuData);
   
   const homePlaceholderData = await getHomePlaceholderData();

   return {
     menuData,
     homePlaceholderData,
   };
 };