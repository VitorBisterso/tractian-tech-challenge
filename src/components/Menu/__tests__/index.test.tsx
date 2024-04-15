import { fireEvent, render, screen } from '@testing-library/react';

import Menu, { MenuItem, MenuProps } from '..';

function makeSut({ items, activeItem }: MenuProps) {
   render(<Menu items={items} activeItem={activeItem} />);
}

describe('Menu', () => {
   it('Should render with some items and call onClick', () => {
      const onClick = jest.fn();
      const items: Array<MenuItem> = [
         {
            title: 'Menu 1',
            value: 'menu1',
            onClick,
         },
         {
            title: 'Menu 2',
            value: 'menu2',
            onClick,
         },
      ];

      makeSut({ items, activeItem: 'menu1' });
      const otherMenuItem = screen.getByText('Menu 2');
      fireEvent.click(otherMenuItem);
      expect(onClick).toHaveBeenCalled();
   });
});
