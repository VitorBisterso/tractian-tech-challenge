import { useMemo, useState } from 'react';

import Menu from '@/components/Menu';
import AssetsPanel from '@/components/AssetsPanel';
import { getMenuItems, unitsData } from '@/utils/units';
import { UNIT_TYPE } from '@/models';

function App() {
   const [activeMenu, setActiveMenu] = useState<UNIT_TYPE>('apex');
   const menuItems = useMemo(() => getMenuItems(setActiveMenu), []);

   const { locations, assets } = unitsData[activeMenu];
   return (
      <>
         <Menu items={menuItems} activeItem={activeMenu} />
         <AssetsPanel locations={locations} assets={assets} />
      </>
   );
}

export default App;
