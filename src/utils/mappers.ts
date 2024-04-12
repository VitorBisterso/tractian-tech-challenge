/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { Asset, Item, ItemType, Location } from '@/models';
import { isComponent, isRootAsset } from './validators';
import { sortAssets, sortLocations } from './sort';
import { findItemById } from './helpers';

export function locationToItem(location: Location): Item {
   return {
      id: location.id,
      name: location.name,
      type: 'location',
      children: [],
   };
}

export function assetToItem(asset: Asset): Item {
   const type: ItemType = isComponent(asset) ? 'component' : 'asset';

   return {
      id: asset.id,
      name: asset.name,
      type,
      sensorType: asset.sensorType as never,
      status: asset.status as never,
      children: [],
   };
}

export function mapLocationsToItems(
   initialLocations: Array<Location>,
): Array<Item> {
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

export function mapAssetsToItems(
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

export function mapTree(
   locations: Array<Location>,
   assets: Array<Asset>,
): Array<Item> {
   const locationData = mapLocationsToItems(locations);
   return mapAssetsToItems(assets, locationData);
}
