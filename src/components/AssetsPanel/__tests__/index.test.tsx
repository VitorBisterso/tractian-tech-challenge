import { act, fireEvent, render, screen } from '@testing-library/react';

import { mockAssets, mockLocations } from '@/tests/mocks';
import AssetsPanel, { AssetsPanelProps } from '..';

function makeSut({ locations, assets }: AssetsPanelProps) {
   render(<AssetsPanel locations={locations} assets={assets} />);
}

describe('AssetsPanel', () => {
   beforeEach(() => {
      jest.useFakeTimers();
   });

   it('Should filter for a child in the tree by its name and select the item', async () => {
      const locations = mockLocations();
      const assets = mockAssets();

      makeSut({ locations, assets });

      const locationName = locations[0].name;
      const input = screen.getByRole('textbox');

      await act(async () => {
         fireEvent.change(input, { target: { value: locationName } });
      });

      await act(async () => {
         jest.advanceTimersByTime(1000);
      });

      const item = screen.getByTestId(locationName);
      expect(item).toBeVisible();

      await act(async () => {
         fireEvent.click(item);
      });
   });

   it('Should filter for a child in the tree by clicking the energy filter button', async () => {
      const locations = mockLocations();
      const assets = mockAssets();

      makeSut({ locations, assets });

      const button = screen.getByText('Sensor de energia');

      await act(async () => {
         fireEvent.click(button);
      });

      await act(async () => {
         jest.advanceTimersByTime(1000);
      });

      const item = screen.getByTestId(assets[0].name);
      expect(item).toBeVisible();
   });

   it('Should filter for a child in the tree by clicking the only critical filter button', async () => {
      const locations = mockLocations();
      const assets = mockAssets();

      makeSut({ locations, assets });

      const button = screen.getByText('Crítico');

      await act(async () => {
         fireEvent.click(button);
      });

      await act(async () => {
         jest.advanceTimersByTime(1000);
      });

      const item = screen.getByTestId(assets[0].name);
      expect(item).toBeVisible();
   });

   it('Should filter for a child in the tree and then clear filters', async () => {
      const locations = mockLocations();
      const assets = mockAssets();

      makeSut({ locations, assets });

      const onlyCriticalButton = screen.getByText('Crítico');
      await act(async () => {
         fireEvent.click(onlyCriticalButton);
      });

      await act(async () => {
         jest.advanceTimersByTime(1000);
      });

      const item = screen.getByTestId(assets[0].name);
      expect(item).toBeVisible();

      const clearFiltersButton = screen.getByText('Limpar filtros');
      await act(async () => {
         fireEvent.click(clearFiltersButton);
      });

      await act(async () => {
         jest.advanceTimersByTime(1000);
      });
      expect(item).not.toBeVisible();
   });
});
