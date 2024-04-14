import { MenuItem } from '@/components/Menu';
import { UNIT_TYPE, Asset, Location } from '@/models';
import apexLocations from '@/data/units/apex/locations.json';
import apexAssets from '@/data/units/apex/assets.json';
import tobiasLocations from '@/data/units/tobias/locations.json';
import tobiasAssets from '@/data/units/tobias/assets.json';
import jaguarLocations from '@/data/units/jaguar/locations.json';
import jaguarAssets from '@/data/units/jaguar/assets.json';

const units: Record<UNIT_TYPE, string> = {
   apex: 'Apex Unit',
   tobias: 'Tobias Unit',
   jaguar: 'Jaguar Unit',
};

export const unitsData: Record<
   UNIT_TYPE,
   { locations: Array<Location>; assets: Array<Asset> }
> = {
   apex: {
      locations: apexLocations,
      assets: apexAssets,
   },
   tobias: {
      locations: tobiasLocations,
      // @ts-expect-error status string, undefined, null
      assets: tobiasAssets,
   },
   jaguar: {
      locations: jaguarLocations,
      // @ts-expect-error status string, undefined, null
      assets: jaguarAssets,
   },
};

export function getMenuItems(
   setActiveMenu: (key: UNIT_TYPE) => void,
): Array<MenuItem> {
   return Object.keys(units).map((key) => {
      const unitTypeKey = key as UNIT_TYPE;
      const title = units[unitTypeKey];
      return {
         title,
         value: key,
         onClick: () => setActiveMenu(unitTypeKey),
      };
   });
}
