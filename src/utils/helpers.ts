/* eslint-disable no-restricted-syntax */
import { Item } from '@/models';

// eslint-disable-next-line import/prefer-default-export
export function findItemById(id: string, items: Item[]): Item | null {
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
