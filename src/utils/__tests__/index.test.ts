import { faker } from '@faker-js/faker';

import { Asset } from '@/models';
import { isComponent, isRootAsset } from '../validators';

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
