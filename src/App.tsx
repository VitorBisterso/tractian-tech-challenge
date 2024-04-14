import { useMemo, useState } from 'react';

import Menu from '@/components/Menu';
import Breadcrumb from '@/components/Breadcrumb';
import AssetsPanel from '@/components/AssetsPanel';
import { getMenuItems, unitsData } from '@/utils/units';
import { UNIT_TYPE } from '@/models';

function App() {
   const [activeMenu, setActiveMenu] = useState<UNIT_TYPE>('apex');
   const menuItems = useMemo(() => getMenuItems(setActiveMenu), []);

   const { locations, assets } = unitsData[activeMenu];
   return (
      <div className="bg-stone-200 min-h-screen pb-1">
         <Menu items={menuItems} activeItem={activeMenu} />
         <div className="m-2 py-2 px-4 bg-white rounded-sm border border-solid border-gray-300">
            <Breadcrumb unit={activeMenu} />
            <AssetsPanel locations={locations} assets={assets} />
         </div>
      </div>
   );
}

export default App;
