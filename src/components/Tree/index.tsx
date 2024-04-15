/* eslint-disable @typescript-eslint/no-use-before-define */
import { AssetStatus, Item, ItemType, SensorType } from '@/models';
import locationIcon from '@/assets/img/location.png';
import assetIcon from '@/assets/img/asset.png';
import componentIcon from '@/assets/img/component.png';
import arrowDownIcon from '@/assets/img/arrow-down.png';
import AssetIcon from '../AssetIcons';

interface TreeProps {
   items: Array<Item>;
   selectedItem: Item;
   onSelectItem: (item: Item) => void;
}

interface TreeItemProps {
   item: Item;
   selectedItem: Item;
   onSelectItem: (item: Item) => void;
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

   const isSelected = item.id === selectedItem.id || item.foundByFilter;
   return (
      <li className="px-2 py-1">
         <button
            type="button"
            className={`flex items-center btn-toggler rounded ${isSelected && 'bg-sky-300'} ${item.id === selectedItem.id && 'border border-sky-900'} hover:bg-sky-200 transition-all`}
            onClick={() => onSelectItem(item)}
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
               <AssetIcon
                  sensorType={item.sensorType as SensorType}
                  assetStatus={item.status as AssetStatus}
               />
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
