import { render, screen } from '@testing-library/react';

import Breadcrumb from '..';

function makeSut(unit: string) {
   render(<Breadcrumb unit={unit} />);
}

describe('Breadcrumb', () => {
   it('Should render without error', () => {
      const unit = 'something';
      makeSut(unit);

      expect(screen.queryByText('/ Something Unit')).toBeInTheDocument();
   });
});
