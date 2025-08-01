import { menuData } from "@/data/menuData";

interface PageTitle {
  title: string;
  icon: string;
  subtitle: string;
}

export default function getPageTitle(pathname: string): PageTitle | null {
  let found: PageTitle | null = null;

  const search = (items: any[], parent?: any) => {
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
