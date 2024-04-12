import { Asset, Location } from '@/models';

export function sortLocations(locations: Array<Location>): Array<Location> {
   const sorted: Array<Location> = [];

   function sortRecursively(parentId: string | null) {
      const children = locations.filter((loc) => loc.parentId === parentId);
      children.forEach((child) => {
         sorted.push(child);
         sortRecursively(child.id);
      });
   }

   sortRecursively(null);

   return sorted;
}

export function sortAssets(assets: Array<Asset>): Array<Asset> {
   const sorted: Array<Asset> = [];

   function sortRecursively(parentId: string | null) {
      const children = assets.filter((asset) => asset.parentId === parentId);
      children.forEach((child) => {
         sorted.push(child);
         sortRecursively(child.id);
      });
   }

   const rootParents = assets.filter((asset) => !asset.parentId);
   rootParents.forEach((rootParent) => {
      sorted.push(rootParent);
      sortRecursively(rootParent.id);
   });

   return sorted;
}
