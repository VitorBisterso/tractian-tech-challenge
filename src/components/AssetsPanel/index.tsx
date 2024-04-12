import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Tree from '@/components/Tree';
import { mapTree } from '@/utils/mappers';
import { Asset, Item, Location } from '@/models';
import { selectItem } from '@/utils/helpers';

interface Props {
   locations: Array<Location>;
   assets: Array<Asset>;
}

export default function AssetsPanel({ locations, assets }: Props) {
   const [value, setValue] = useState('');
   const [filter] = useDebounce(value, 500);

   const [selectedItem, setSelectedItem] = useState('');
   const [data, setData] = useState<Array<Item>>([]);

   useEffect(() => {
      if (filter) {
         setSelectedItem('');
      }

      setData(mapTree(locations, assets, filter));
   }, [filter, locations, assets]);

   function onSelectItem(id: string) {
      setSelectedItem(id);
      const newData = selectItem(id, data);
      setData(newData);
   }

   return (
      <>
         <input
            type="text"
            className="border-2 border-solid border-stone-800 rounded p-1"
            onChange={(e) => {
               setValue(e.target.value);
            }}
         />
         <Tree
            items={data}
            selectedItem={selectedItem}
            onSelectItem={(id) => onSelectItem(id)}
         />
      </>
   );
}
