import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Tree from '@/components/Tree';
import { mapTree } from '@/utils/mappers';
import { Asset, Location } from '@/models';

interface Props {
   locations: Array<Location>;
   assets: Array<Asset>;
}

export default function AssetsPanel({ locations, assets }: Props) {
   const [value, setValue] = useState('');
   const [filter] = useDebounce(value, 500);

   const data = useMemo(
      () => mapTree(locations, assets, filter),
      [filter, locations, assets],
   );

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
