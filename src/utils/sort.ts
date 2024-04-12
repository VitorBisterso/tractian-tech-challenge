import { Asset, Location } from '@/models';

export function sortLocations(locations: Array<Location>): Array<Location> {
   const sorted: Array<Location> = [];

   // Function to recursively sort locations
   function sortRecursively(parentId: string | null) {
      const children = locations.filter((loc) => loc.parentId === parentId);
      children.forEach((child) => {
         sorted.push(child);
         sortRecursively(child.id);
      });
   }

   // Start sorting from root parents
   sortRecursively(null);

   return sorted;
}

export function sortAssets(assets: Array<Asset>): Array<Asset> {
   const sorted: Array<Asset> = [];

   // Function to recursively sort assets
   function sortRecursively(parentId: string | null) {
      const children = assets.filter((asset) => asset.parentId === parentId);
      children.forEach((child) => {
         sorted.push(child);
         sortRecursively(child.id);
      });
   }

   // Start sorting from root parents
   const rootParents = assets.filter((asset) => !asset.parentId);
   rootParents.forEach((rootParent) => {
      sorted.push(rootParent);
      sortRecursively(rootParent.id);
   });

   return sorted;
}
