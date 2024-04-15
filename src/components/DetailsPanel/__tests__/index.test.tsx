import { render, screen } from '@testing-library/react';

import { Item } from '@/models';
import { faker } from '@faker-js/faker';
import DetailsPanel from '..';

function makeSut(item: Item) {
   render(<DetailsPanel item={item} />);
}

describe('DetailsPanel', () => {
   it('Should render empty panel', () => {
      makeSut({} as Item);

      expect(
         screen.queryByText('Selecione um item na árvore'),
      ).toBeInTheDocument();
   });

   it('Should render with location details', () => {
      const item: Item = {
         id: faker.string.alphanumeric(24),
         name: 'Location 1',
         type: 'location',
         children: [{} as Item],
      };
      makeSut(item);

      expect(screen.queryByText('Location 1')).toBeInTheDocument();
      expect(screen.queryByRole('img')).toBeInTheDocument();
      expect(screen.queryByText('Itens associados')).toBeInTheDocument();
      expect(
         screen.queryByText(item.children.length.toString()),
      ).toBeInTheDocument();
   });

   it('Should render with asset details', () => {
      const item: Item = {
         id: faker.string.alphanumeric(24),
         name: 'Asset 1',
         type: 'asset',
         children: [{} as Item],
      };
      makeSut(item);

      expect(screen.queryByText('Asset 1')).toBeInTheDocument();
      expect(screen.queryByRole('img')).toBeInTheDocument();
      expect(screen.queryByText('Itens associados')).toBeInTheDocument();
      expect(
         screen.queryByText(item.children.length.toString()),
      ).toBeInTheDocument();
   });

   it('Should render details with energy component and critical status', () => {
      const item: Item = {
         id: faker.string.alphanumeric(24),
         name: 'Component 1',
         type: 'component',
         sensorType: 'energy',
         status: 'alert',
         children: [],
      };
      makeSut(item);

      expect(screen.queryByText('Component 1')).toBeInTheDocument();
      expect(screen.queryAllByRole('img').length).toBe(4);
      expect(screen.queryByText('Motor elétrico')).toBeInTheDocument();
      expect(screen.queryByText('Elétrica')).toBeInTheDocument();
   });

   it('Should render details with vibration component and critical status', () => {
      const item: Item = {
         id: faker.string.alphanumeric(24),
         name: 'Component 1',
         type: 'component',
         sensorType: 'vibration',
         status: 'alert',
         children: [],
      };
      makeSut(item);

      expect(screen.queryByText('Component 1')).toBeInTheDocument();
      expect(screen.queryAllByRole('img').length).toBe(4);
      expect(screen.queryByText('Sensor de vibração')).toBeInTheDocument();
      expect(screen.queryByText('Mecânica')).toBeInTheDocument();
   });

   it('Should render details with energy component and operating status', () => {
      const item: Item = {
         id: faker.string.alphanumeric(24),
         name: 'Component 1',
         type: 'component',
         sensorType: 'energy',
         status: 'operating',
         children: [],
      };
      makeSut(item);

      expect(screen.queryByText('Component 1')).toBeInTheDocument();
      expect(screen.queryAllByRole('img').length).toBe(4);
      expect(screen.queryByText('Motor elétrico')).toBeInTheDocument();
      expect(screen.queryByText('Elétrica')).toBeInTheDocument();
   });

   it('Should render details with vibration component and operating status', () => {
      const item: Item = {
         id: faker.string.alphanumeric(24),
         name: 'Component 1',
         type: 'component',
         sensorType: 'vibration',
         status: 'operating',
         children: [],
      };
      makeSut(item);

      expect(screen.queryByText('Component 1')).toBeInTheDocument();
      expect(screen.queryAllByRole('img').length).toBe(4);
      expect(screen.queryByText('Sensor de vibração')).toBeInTheDocument();
      expect(screen.queryByText('Mecânica')).toBeInTheDocument();
   });
});
