import { faker } from '@faker-js/faker';

import { Asset, Location } from '@/models';

export function mockLocations(): Array<Location> {
   return [
      {
         id: 'L2',
         name: faker.lorem.words(3),
         parentId: 'L1',
      },
      {
         id: 'L1',
         name: faker.lorem.words(3),
         parentId: null,
      },
   ];
}

export function mockAssets(): Array<Asset> {
   return [
      {
         id: 'C1',
         name: faker.lorem.words(3),
         sensorType: 'energy',
         status: 'alert',
         parentId: 'A2',
         locationId: null,
      },
      {
         id: 'A2',
         name: faker.lorem.words(3),
         parentId: null,
         locationId: 'L1',
      },
      {
         id: 'A1',
         name: faker.lorem.words(3),
         parentId: null,
         locationId: null,
      },
   ];
}
