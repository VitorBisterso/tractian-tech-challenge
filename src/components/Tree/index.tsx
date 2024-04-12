/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import RenderIfVisible from 'react-render-if-visible';

import { Item, ItemType } from '@/models';
import locationIcon from '@/assets/img/location.png';
import assetIcon from '@/assets/img/asset.png';
import componentIcon from '@/assets/img/component.png';

interface TreeProps {
   items: Array<Item>;
}

interface TreeItemProps {
   item: Item;
}

const icons: Record<ItemType, string> = {
   location: locationIcon,
   asset: assetIcon,
   component: componentIcon,
};

export default function Tree({ items }: TreeProps) {
   return (
      <ul className="flex flex-col pl-4">
         {items.map((item) => (
            <TreeItem key={item.id} item={item} />
         ))}
      </ul>
   );
}

function TreeItem({ item }: TreeItemProps) {
   const [childVisibility, setChildVisiblity] = useState(false);

   const hasChildren = (item.children ?? []).length > 0;

   return (
      <RenderIfVisible>
         <li className="px-2 py-1">
            <button
               type="button"
               className="flex btn-toggler"
               onClick={() => setChildVisiblity((visibility) => !visibility)}
            >
               {hasChildren && (
                  <div
                     className="inline mr-4 ml-[-22px]"
                     style={{ background: 'none' }}
                  >
                     {childVisibility ? '>' : 'v'}
                  </div>
               )}

               <div className="flex flex-row gap-x-4">
                  <img src={icons[item.type]} alt={`${item.type} icon`} />
                  <p className="">{item.name}</p>
               </div>
            </button>

            {hasChildren && childVisibility && <Tree items={item.children!} />}
         </li>
      </RenderIfVisible>
   );
}
