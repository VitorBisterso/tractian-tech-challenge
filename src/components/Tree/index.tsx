/* eslint-disable @typescript-eslint/no-use-before-define */
import { AssetStatus, Item, ItemType, SensorType } from '@/models';
import locationIcon from '@/assets/img/location.png';
import assetIcon from '@/assets/img/asset.png';
import componentIcon from '@/assets/img/component.png';
import energyIcon from '@/assets/img/energy.png';
import vibrationIcon from '@/assets/img/vibration.png';
import arrowDownIcon from '@/assets/img/arrow-down.png';

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

      return (
         <>
            <img
               src={sensorType === 'energy' ? energyIcon : vibrationIcon}
               alt="energy-sensor-icon"
               height="100%"
            />
            <div
               className={`w-2 h-2 rounded-full ${assetStatus === 'alert' ? 'bg-red-600' : 'bg-green-500'}`}
            />
         </>
      );
   }

   const isSelected = item.id === selectedItem || item.foundByFilter;
   return (
      <li className="px-2 py-1">
         <button
            type="button"
            className={`flex items-center btn-toggler rounded ${isSelected && 'bg-sky-300'} ${item.id === selectedItem && 'border border-sky-900'} hover:bg-sky-200`}
            onClick={() => onSelectItem(item.id)}
         >
            {hasChildren && (
               <div
                  className={`inline mr-4 ml-[-22px] ${item.isOpened && '-rotate-90'}`}
                  style={{ background: 'none' }}
               >
                  <img src={arrowDownIcon} alt="toggle tree" />
               </div>
            )}

            <div className="flex flex-row items-center gap-x-4 p-1">
               <img src={icons[item.type]} alt={`${item.type} icon`} />
               <p className={`truncate ${isSelected && 'text-white'}`}>
                  {item.name}
               </p>
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
   );
}
