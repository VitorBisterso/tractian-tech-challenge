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

export function filterItemsByName(items: Item[], name: string): Item[] {
   const filteredItems: Item[] = [];

   items.forEach((item) => {
      if (item.name.toUpperCase().includes(name.toUpperCase())) {
         filteredItems.push(item);
      }

      const filteredChildren = filterItemsByName(item.children, name);
      if (filteredChildren.length > 0) {
         filteredItems.push({
            ...item,
            children: filteredChildren,
         });
      }
   });

   return filteredItems;
}
