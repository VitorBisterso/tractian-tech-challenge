import { faker } from '@faker-js/faker';

import { Asset, Location } from '@/models';
import { MenuItem } from '@/components/Menu';
import { isComponent, isRootAsset } from '../validators';
import { getMenuItems } from '../units';
import { sortAssets, sortLocations } from '../sort';

describe('Validators', () => {
   describe('isComponent', () => {
      it('Should return true as asset is a component', () => {
         const component: Asset = {
            id: faker.string.alphanumeric(24),
            name: faker.lorem.words(3),
            parentId: faker.string.alphanumeric(24),
            sensorType: 'energy',
            status: 'operating',
         };

         expect(isComponent(component)).toBeTruthy();
      });

      it('Should return false as asset is not a component', () => {
         const asset: Asset = {
            id: faker.string.alphanumeric(24),
            name: faker.lorem.words(3),
            locationId: faker.string.alphanumeric(24),
         };

         expect(isComponent(asset)).toBeFalsy();
      });
   });

   describe('isRootAsset', () => {
      it('Should return true as asset is a root one', () => {
         const asset: Asset = {
            id: faker.string.alphanumeric(24),
            name: faker.lorem.words(3),
         };

         expect(isRootAsset(asset)).toBeTruthy();
      });

      it('Should return false as asset is not a root one', () => {
         const asset: Asset = {
            id: faker.string.alphanumeric(24),
            name: faker.lorem.words(3),
            locationId: faker.string.alphanumeric(24),
         };

         expect(isRootAsset(asset)).toBeFalsy();
      });
   });
});

describe('Units', () => {
   it('Should get menu items', () => {
      const mockedSetActiveFn = jest.fn();
      const expectedResult: Array<MenuItem> = [
         {
            title: 'Apex Unit',
            value: 'apex',
            onClick: () => mockedSetActiveFn,
         },
         {
            title: 'Tobias Unit',
            value: 'tobias',
            onClick: () => mockedSetActiveFn,
         },
         {
            title: 'Jaguar Unit',
            value: 'jaguar',
            onClick: () => mockedSetActiveFn,
         },
      ];

      expect(JSON.stringify(getMenuItems(mockedSetActiveFn))).toEqual(
         JSON.stringify(expectedResult),
      );
   });
});

describe('Sort', () => {
   it('Should sort locations with the root as the first ones', () => {
      const locationName = faker.lorem.words(3);
      const locations: Array<Location> = [
         {
            id: 'filho mais abaixo',
            name: locationName,
            parentId: '2',
         },
         {
            id: '2',
            name: locationName,
            parentId: '1',
         },
         {
            id: '1',
            name: locationName,
            parentId: null,
         },
      ];

      const expectedResult: Array<Location> = [
         {
            id: '1',
            name: locationName,
            parentId: null,
         },
         {
            id: '2',
            name: locationName,
            parentId: '1',
         },
         {
            id: 'filho mais abaixo',
            name: locationName,
            parentId: '2',
         },
      ];

      expect(JSON.stringify(sortLocations(locations))).toBe(
         JSON.stringify(expectedResult),
      );
   });

   it('Should sort assets with the related to locations as the first ones, later the ones related to other assets and the root ones as the last ones', () => {
      const assetName = faker.lorem.words(3);
      const assets: Array<Asset> = [
         {
            id: 'A3',
            name: assetName,
            parentId: 'A2',
            locationId: null,
         },
         {
            id: 'A2',
            name: assetName,
            locationId: 'L1',
            parentId: null,
         },
         {
            id: 'A1',
            name: assetName,
            parentId: null,
            locationId: null,
         },
      ];

      const expectedResult: Array<Asset> = [
         {
            id: 'A2',
            name: assetName,
            locationId: 'L1',
            parentId: null,
         },
         {
            id: 'A3',
            name: assetName,
            parentId: 'A2',
            locationId: null,
         },
         {
            id: 'A1',
            name: assetName,
            parentId: null,
            locationId: null,
         },
      ];

      expect(JSON.stringify(sortAssets(assets))).toBe(
         JSON.stringify(expectedResult),
      );
   });
});
