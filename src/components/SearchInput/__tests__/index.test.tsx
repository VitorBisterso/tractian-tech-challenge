import { fireEvent, render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import SearchInput from '..';

function makeSut(setValue: (v: string) => void) {
   render(<SearchInput value="" setValue={setValue} />);
}

describe('SearchInput', () => {
   it('Should call setValue when editing', () => {
      const setValue = jest.fn();

      makeSut(setValue);

      const newValue = faker.lorem.sentence(3);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: newValue } });

      expect(setValue).toHaveBeenCalledWith(newValue);
   });
});
