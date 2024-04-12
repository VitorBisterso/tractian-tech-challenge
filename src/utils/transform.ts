/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Asset, Item, ItemType, Location } from '@/models';

function compareLocations(a: Location, b: Location): number {
   // If one of the items has null parentId, it's a root parent and should come first
   if (a.parentId === null && b.parentId !== null) {
      return -1;
   }
   if (a.parentId !== null && b.parentId === null) {
      return 1;
   }
   // If both have the same parentId, sort them by id
   if (a.parentId === b.parentId) {
      return parseInt(a.id, 10) - parseInt(b.id, 10);
   }
   // Otherwise, sort them by parentId
   return (a.parentId || '').localeCompare(b.parentId || '');
}

function sortLocations(locations: Array<Location>) {
   return locations.sort(compareLocations);
}

function compareAssets(a: Asset, b: Asset): number {
   // If one of the items has null parentId, it's a root parent and should come first
   if (a.parentId === null && b.parentId !== null) {
      return -1;
   }
   if (a.parentId !== null && b.parentId === null) {
      return 1;
   }
   // If both have the same parentId, sort them by locationId
   if (a.parentId === b.parentId) {
      if (a.locationId && b.locationId) {
         if (a.locationId !== b.locationId) {
            return parseInt(a.locationId, 10) - parseInt(b.locationId, 10);
         }
      }
      // If locationId is the same or missing, sort by id
      return parseInt(a.id, 10) - parseInt(b.id, 10);
   }
   // Otherwise, sort them by parentId
   return (a.parentId || '').localeCompare(b.parentId || '');
}

function sortAssets(assets: Array<Asset>) {
   return assets.sort(compareAssets);
}

function findItemById(id: string, items: Item[]): Item | null {
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

function isComponent(asset: Asset) {
   return Boolean(asset.sensorType);
}

function locationToItem(location: Location): Item {
   return {
      id: location.id,
      name: location.name,
      type: 'location',
      children: [],
   };
}

function assetToItem(asset: Asset): Item {
   const type: ItemType = isComponent(asset) ? 'component' : 'asset';

   return {
      id: asset.id,
      name: asset.name,
      type,
      sensorType: asset.sensorType,
      status: asset.status,
      children: [],
   };
}

function mapLocationsToItems(initialLocations: Array<Location>): Array<Item> {
   const items: Array<Item> = [];

   const locations = sortLocations(initialLocations);
   const rootLocations = locations.filter((location) => !location.parentId);
   items.push(...rootLocations.map(locationToItem));

   for (const location of locations) {
      if (!location.parentId) continue;

      const parentLocation = findItemById(location.parentId, items)!;
      parentLocation.children.push(locationToItem(location));
   }

   return items;
}

function isRootAsset(asset: Asset) {
   return !asset.locationId && !asset.parentId;
}

function mapAssetsToItems(
   initialAssets: Array<Asset>,
   locations: Array<Item>,
): Array<Item> {
   const tree = [...locations];

   const assets = sortAssets(initialAssets);
   const rootAssets = assets.filter(isRootAsset);
   tree.push(...rootAssets.map(assetToItem));

   for (const asset of assets) {
      if (isRootAsset(asset)) continue;

      if (asset.locationId) {
         const parentLocation = findItemById(asset.locationId, tree)!;
         parentLocation.children.push(assetToItem(asset));
      } else if (asset.parentId) {
         const parentAsset = findItemById(asset.parentId, tree)!;
         parentAsset.children.push(assetToItem(asset));
      }
   }

   return tree;
}

// eslint-disable-next-line import/prefer-default-export
export function mapTree(
   locations: Array<Location>,
   assets: Array<Asset>,
): Array<Item> {
   const locationData = mapLocationsToItems(locations);
   return mapAssetsToItems(assets, locationData);
}

// export function transformLocations(locations: Array<Location>): Array<Item> {
//    const map: { [id: string]: Item } = {};

//    locations.forEach((originalLocation) => {
//       map[originalLocation.id] = {
//          id: originalLocation.id,
//          name: originalLocation.name,
//          type: ItemType.Location,
//          children: [],
//       };
//    });

//    const tree: Item[] = [];

//    locations.forEach((originalLocation) => {
//       if (originalLocation.parentId) {
//          const parent = map[originalLocation.parentId];
//          if (parent) {
//             parent.children?.push(map[originalLocation.id]);
//          }
//       } else {
//          tree.push(map[originalLocation.id]);
//       }
//    });

//    return tree;
// }

// export function isComponent(asset: Asset) {
//    return Boolean(asset.sensorType);
// }

// function findItemById(root: Item, id: string): Item | undefined {
//    if (root.id === id) {
//       return root;
//    }

//    if (root.children) {
//       for (const child of root.children) {
//          const found = findItemById(child, id);
//          if (found) {
//             return found;
//          }
//       }
//    }

//    return undefined;
// }

// export function transformAssets(assets: Array<Asset>, locations: Array<Item>): Array<Item> {
//    const map: { [id: string]: Item } = {};

//    assets.forEach((originalAsset) => {
//       map[originalAsset.id] = {
//          id: originalAsset.id,
//          name: originalAsset.name,
//          type: isComponent(originalAsset) ? ItemType.Component : ItemType.Asset,
//          sensorType: originalAsset.sensorType,
//          status: originalAsset.status,
//          children: [],
//       };
//    });

//    const tree: Item[] = [];

//    assets.forEach((originalAsset) => {
//       if (originalAsset.parentId) {
//          const parent = map[originalAsset.parentId];
//          if (parent) {
//             parent.children?.push(map[originalAsset.id]);
//          }
//       } else if (originalAsset.locationId) {
//          const location
//       } else {
//          tree.push(map[originalAsset.id]);
//       }
//    });

//    return tree;
// }

// export function isRootComponent(asset: Asset) {
//    return isComponent(asset) && !asset.locationId && !asset.parentId;
// }

// export function filterRootComponents(assets: Array<Asset>): Array<Item> {
//    const rootComponents: Array<Item> = assets
//       .filter(isRootComponent)
//       .map((component) => ({
//          id: component.id,
//          name: component.name,
//          type: ItemType.Component,
//          sensorType: component.sensorType,
//          status: component.status,
//          children: [],
//       }));

//    return rootComponents;
// }

// export function isRootAsset(asset: Asset) {
//    return !isComponent(asset) && !asset.locationId && !asset.parentId;
// }

// export function filterRootAssets(assets: Array<Asset>): Array<Item> {
//    const rootAssets: Array<Item> = assets.filter(isRootAsset).map((assset) => ({
//       id: assset.id,
//       name: assset.name,
//       type: ItemType.Asset,
//       sensorType: assset.sensorType,
//       status: assset.status,
//       children: [],
//    }));

//    return rootAssets;
// }

// export function getRootData(
//    locations: Array<Location>,
//    assets: Array<Asset>,
// ): Array<Item> {
//    const allLocations = transformLocations(locations);
//    const allAssets = transformAssets(assets);

//    // items.push(...filterRootComponents(assets));
//    // items.push(...filterRootAssets(assets));

//    return [...allLocations, ...allAssets];
// }
