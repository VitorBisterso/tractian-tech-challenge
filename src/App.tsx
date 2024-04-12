import Tree from '@/components/Tree';
import { mapTree } from '@/utils/transform';

import locations from '@/data/units/jaguar/locations.json';
import assets from '@/data/units/jaguar/assets.json';

function App() {
   // @ts-expect-error status and sensorType
   const data = mapTree(locations, assets);

   return <Tree items={data} />;
}

export default App;
