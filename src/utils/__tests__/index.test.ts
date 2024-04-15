import { faker } from '@faker-js/faker';

import { Asset, Item, Location } from '@/models';
import { MenuItem } from '@/components/Menu';
import { isComponent, isRootAsset } from '../validators';
import { getMenuItems } from '../units';
import { sortAssets, sortLocations } from '../sort';
import {
   filterItemsByName,
   filterItemsByTrait,
   findItemById,
   selectItem,
} from '../helpers';
import { mapTree } from '../mappers';

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

describe('Helpers', () => {
   const id = faker.string.alphanumeric(24);
   const item: Item = {
      id,
      name: 'Component 1',
      type: 'component',
      sensorType: 'energy',
      status: 'operating',
      children: [],
      isOpened: false,
      foundByFilter: false,
   };
   const tree: Array<Item> = [
      {
         id: faker.string.alphanumeric(24),
         name: 'Location',
         type: 'location',
         children: [
            {
               id: faker.string.alphanumeric(24),
               name: 'Asset 1',
               type: 'asset',
               children: [item],
            },
         ],
      },
   ];

   describe('findItemById', () => {
      it('Should find a deep nested child by id', () => {
         expect(findItemById(id, tree)).toBe(item);
      });

      it('Should return null when not finding child', () => {
         expect(findItemById('id inexistente', tree)).toBe(null);
      });
   });

   describe('selectItem', () => {
      it('Should select a nested child', () => {
         const result = selectItem(tree[0].children[0].id, tree);

         expect(result[0].children[0].isOpened).toBeTruthy();
      });

      it('Should not select if a nested child does not contain any children', () => {
         const result = selectItem(id, tree);

         expect(result[0].children[0].children[0].isOpened).toBeFalsy();
      });
   });

   describe('filterItemsByName', () => {
      it('Should return items until the child, not returning its children', () => {
         const result = filterItemsByName(tree, 'Asset 1');

         const jsonResult = JSON.stringify(result);
         const expected = JSON.stringify([
            {
               id: tree[0].id,
               name: 'Location',
               type: 'location',
               children: [
                  {
                     id: tree[0].children[0].id,
                     name: 'Asset 1',
                     type: 'asset',
                     children: [],
                     foundByFilter: true,
                  },
               ],
               isOpened: true,
            },
         ]);
         expect(jsonResult).toBe(expected);
      });

      it('Should return empty array when not finding the result', () => {
         const result = filterItemsByName(tree, 'Asset inexistente');

         const jsonResult = JSON.stringify(result);
         const expected = JSON.stringify([]);
         expect(jsonResult).toBe(expected);
      });
   });

   describe('filterItemsByTrait', () => {
      const newTree: Array<Item> = [
         {
            id: 'asset1',
            name: 'Asset 1',
            type: 'asset',
            children: [
               {
                  id: 'component1',
                  name: 'Component 1',
                  type: 'component',
                  sensorType: 'energy',
                  status: 'alert',
                  children: [],
               },
               {
                  id: 'component2',
                  name: 'Component 2',
                  type: 'component',
                  sensorType: 'vibration',
                  status: 'alert',
                  children: [],
               },
            ],
         },
      ];
      it('Should return items until the child, not returning its children', () => {
         const result = filterItemsByTrait(newTree, 'sensorType', 'energy');

         const expectedResult: Array<Item> = [
            {
               id: 'asset1',
               name: 'Asset 1',
               type: 'asset',
               children: [
                  {
                     id: 'component1',
                     name: 'Component 1',
                     type: 'component',
                     sensorType: 'energy',
                     status: 'alert',
                     children: [],
                     foundByFilter: true,
                  },
               ],
               isOpened: true,
            },
         ];

         expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
      });

      it('Should return empty array when not finding the result', () => {
         const result = filterItemsByTrait(newTree, 'status', 'operating');

         expect(JSON.stringify(result)).toBe(JSON.stringify([]));
      });
   });
});

describe('Mappers', () => {
   describe('mapTree', () => {
      it('Should gather locations and assets into a single tree', () => {
         const locations: Array<Location> = [
            {
               id: 'L2',
               name: 'Location 2',
               parentId: 'L1',
            },
            {
               id: 'L1',
               name: 'Location 1',
               parentId: null,
            },
         ];

         const assets: Array<Asset> = [
            {
               id: 'C1',
               name: 'Component 1',
               parentId: 'A1',
               sensorType: 'energy',
               status: 'alert',
            },
            {
               id: 'A1',
               name: 'Asset 1',
               locationId: 'L2',
            },
         ];

         const expectedTree: Array<Item> = [
            {
               id: 'L1',
               name: 'Location 1',
               type: 'location',
               children: [
                  {
                     id: 'L2',
                     name: 'Location 2',
                     type: 'location',
                     children: [
                        {
                           id: 'A1',
                           name: 'Asset 1',
                           sensorType: undefined,
                           status: undefined,
                           type: 'asset',
                           children: [
                              {
                                 id: 'C1',
                                 name: 'Component 1',
                                 type: 'component',
                                 children: [],
                                 sensorType: 'energy',
                                 status: 'alert',
                              },
                           ],
                        },
                     ],
                  },
               ],
            },
         ];

         const result = mapTree(locations, assets, {
            text: '',
            energySensors: false,
            onlyCritical: false,
         });

         expect(result[0]).toStrictEqual(expectedTree[0]);
      });
   });
});
