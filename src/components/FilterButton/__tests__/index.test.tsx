import { fireEvent, render, screen } from '@testing-library/react';

import { faker } from '@faker-js/faker';
import FilterButton, { FilterButtonProps } from '..';

function makeSut({ title, onClick, icon, active }: FilterButtonProps) {
   render(
      <FilterButton
         title={title}
         onClick={onClick}
         icon={icon}
         active={active}
      />,
   );
}

describe('FilterButton', () => {
   it('Should render with icon and call onClick', () => {
      const onClick = jest.fn();
      makeSut({
         title: faker.lorem.words(2),
         onClick,
         icon: faker.image.avatar(),
      });

      expect(screen.queryByRole('img')).toBeInTheDocument();
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
   });

   it('Should render without icon', () => {
      const onClick = jest.fn();
      makeSut({
         title: faker.lorem.words(2),
         onClick,
      });

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
   });
});
