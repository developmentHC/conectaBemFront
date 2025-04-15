import { getMenuData } from '@/libs/getMenuData';
import { getHomePlaceholderData } from '@/libs/getHomePlaceholderData';

export default async function MenuLoader() {
  const menuData = await getMenuData();
  console.log("---menuData", menuData);
  const homePlaceholderData = await getHomePlaceholderData();
  console.log("---homePlaceholderData", homePlaceholderData);
  return <div>MenuLoader</div>;
}