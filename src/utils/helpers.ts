/* eslint-disable no-restricted-syntax */
import { Item } from '@/models';

export function findItemById(id: string, items: Array<Item>): Item | null {
   for (const item of items) {
      if (item.id === id) {
         return item;
      }
      if (item.children) {
         const foundItem = findItemById(id, item.children);
         if (foundItem) {
            return foundItem;
         }
      }
   }
   return null;
}

export function selectItem(id: string, items: Array<Item>): Array<Item> {
   return items.map((item) => {
      const hasChildren = item.children.length > 0;
      if (item.id === id) {
         return {
            ...item,
            isOpened: hasChildren ? !item.isOpened : false,
         };
      }

      // Recursively update children
      const updatedChildren = selectItem(id, item.children);
      return { ...item, children: updatedChildren };
   });
}

export function filterItemsByName(
   items: Array<Item>,
   name: string,
): Array<Item> {
   const filteredItems: Array<Item> = [];

   items.forEach((item) => {
      if (item.name.toUpperCase().includes(name.toUpperCase())) {
         filteredItems.push({ ...item, children: [], foundByFilter: true });
         return;
      }

      const filteredChildren = filterItemsByName(item.children, name);
      if (filteredChildren.length > 0) {
         filteredItems.push({
            ...item,
            children: filteredChildren,
            isOpened: true,
         });
      }
   });

   return filteredItems;
}
