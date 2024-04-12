import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Tree from '@/components/Tree';
import { mapTree } from '@/utils/mappers';

import locations from '@/data/units/apex/locations.json';
import assets from '@/data/units/apex/assets.json';

function App() {
   const [value, setValue] = useState('');
   const [filter] = useDebounce(value, 500);

   const data = useMemo(() => mapTree(locations, assets, filter), [filter]);

   return (
      <>
         <input
            type="text"
            className="border-2 border-solid border-stone-800 rounded"
            onChange={(e) => {
               setValue(e.target.value);
            }}
         />
         <Tree items={data} />
      </>
   );
}

export default App;
