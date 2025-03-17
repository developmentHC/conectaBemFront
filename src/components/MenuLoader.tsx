import { getMenuData } from '@/libs/prismic';
// import Menu from './Menu';

export default async function MenuLoader() {
  const menuData = await getMenuData();
  console.log("---menuData", menuData);
  return <div>MenuLoader</div>;
  
  // return <Menu menuData={menuData} />;
}