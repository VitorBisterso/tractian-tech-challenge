import { useMemo } from 'react';

import Tree from '@/components/Tree';
import { mapTree } from '@/utils/mappers';
import locations from '@/data/units/tobias/locations.json';
import assets from '@/data/units/tobias/assets.json';

function App() {
   const data = useMemo(() => mapTree(locations, assets), []);

   return <Tree items={data} />;
}

export default App;
