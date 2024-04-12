/* eslint-disable @typescript-eslint/no-use-before-define */
import RenderIfVisible from 'react-render-if-visible';

import { AssetStatus, Item, ItemType, SensorType } from '@/models';
import locationIcon from '@/assets/img/location.png';
import assetIcon from '@/assets/img/asset.png';
import componentIcon from '@/assets/img/component.png';
import energyIcon from '@/assets/img/energy.png';

interface TreeProps {
   items: Array<Item>;
   selectedItem: string;
   onSelectItem: (id: string) => void;
}

interface TreeItemProps {
   item: Item;
   selectedItem: string;
   onSelectItem: (id: string) => void;
}

const icons: Record<ItemType, string> = {
   location: locationIcon,
   asset: assetIcon,
   component: componentIcon,
};

export default function Tree({ items, selectedItem, onSelectItem }: TreeProps) {
   return (
      <ul className="flex flex-col pl-4">
         {items.map((item) => (
            <TreeItem
               key={item.id}
               item={item}
               selectedItem={selectedItem}
               onSelectItem={onSelectItem}
            />
         ))}
      </ul>
   );
}

function TreeItem({ item, selectedItem, onSelectItem }: TreeItemProps) {
   const hasChildren = (item.children ?? []).length > 0;

   function renderIcon(sensorType?: SensorType, assetStatus?: AssetStatus) {
      if (!sensorType) return null;

      // eslint-disable-next-line prettier/prettier
      if (sensorType === 'energy') return <img src={energyIcon} alt="energy-sensor-icon" height="100%" />;

      return (
         <div
            className={`w-2 h-2 rounded-full ${assetStatus === 'alert' ? 'bg-red-600' : 'bg-green-500'}`}
         />
      );
   }

   const isSelected = item.id === selectedItem || item.foundByFilter;
   return (
      <RenderIfVisible>
         <li className="px-2 py-1">
            <button
               type="button"
               className={`flex btn-toggler ${isSelected && 'bg-sky-300 rounded'} ${item.id === selectedItem && 'border-2 border-green-600'}`}
               onClick={() => onSelectItem(item.id)}
            >
               {hasChildren && (
                  <div
                     className="inline mr-4 ml-[-22px]"
                     style={{ background: 'none' }}
                  >
                     {item.isOpened ? '>' : 'v'}
                  </div>
               )}

               <div className="flex flex-row items-center gap-x-4 p-1">
                  <img src={icons[item.type]} alt={`${item.type} icon`} />
                  <p className={`${isSelected && 'text-white'}`}>{item.name}</p>
                  {renderIcon(
                     item.sensorType as SensorType,
                     item.status as AssetStatus,
                  )}
               </div>
            </button>

            {hasChildren && item.isOpened && (
               <Tree
                  items={item.children!}
                  selectedItem={selectedItem}
                  onSelectItem={onSelectItem}
               />
            )}
         </li>
      </RenderIfVisible>
   );
}
