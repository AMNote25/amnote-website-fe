import * as LucideIcons from 'lucide-react';

// Convert kebab-case to PascalCase for Lucide icon names
export const getIconComponent = (iconName?: string) => {
  if (!iconName) return LucideIcons.Circle;
  
  // Convert kebab-case to PascalCase
  const pascalCaseName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Check if the icon exists in Lucide icons
  const IconComponent = (LucideIcons as any)[pascalCaseName];
  
  // Return the icon component or fallback to Circle
  return IconComponent || LucideIcons.Circle;
};
