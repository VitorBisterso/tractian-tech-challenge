import AssetsPanel from '@/components/AssetsPanel';
import locations from '@/data/units/apex/locations.json';
import assets from '@/data/units/apex/assets.json';

function App() {
   return <AssetsPanel locations={locations} assets={assets} />;
}

export default App;
