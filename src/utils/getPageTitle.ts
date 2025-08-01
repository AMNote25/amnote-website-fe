import { menuData } from "@/data/menuData";

interface PageTitle {
  title: string;
  icon: string;
  subtitle: string;
}

interface MenuItem {
  id: string;
  title: string;
  iconName?: string;
  type: string;
  link?: string;
  subtitle?: string;
  children?: MenuItem[];
}

export default function getPageTitle(pathname: string): PageTitle | null {
  let found: PageTitle | null = null;

  const search = (items: MenuItem[], parent?: MenuItem) => {
    for (const item of items) {
      if (item.link === pathname) {
        found = {
          title: item.title,
          icon: item.iconName || parent?.iconName || "question-mark-circle",
          // Ưu tiên subtitle của item, nếu không có thì lấy title của parent
          subtitle: item.subtitle || parent?.title || "",
        };
        return;
      }
      if (item.children) {
        search(item.children, item);
      }
    }
  };

  search(menuData);
  return found;
}
