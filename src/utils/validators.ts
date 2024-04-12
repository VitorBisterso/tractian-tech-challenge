import { Asset } from '@/models';

export function isComponent(asset: Asset) {
   return Boolean(asset.sensorType);
}

export function isRootAsset(asset: Asset) {
   return !asset.locationId && !asset.parentId;
}
