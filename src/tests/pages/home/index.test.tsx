import { render, screen } from '@testing-library/react';

import HomePage from '@/App';

function makeSut() {
   render(<HomePage />);
}

describe('Home page', () => {
   it('Should render without error', () => {
      makeSut();

      expect(screen.getByAltText('company logo')).toBeInTheDocument();
      expect(screen.getByText('Apex Unit')).toBeInTheDocument();
      expect(screen.getByText('Tobias Unit')).toBeInTheDocument();
      expect(screen.getByText('Jaguar Unit')).toBeInTheDocument();

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
         screen.getByText('Selecione um item na árvore'),
      ).toBeInTheDocument();
   });
});
