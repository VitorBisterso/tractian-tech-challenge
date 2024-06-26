import logo from '@/assets/img/logo.png';
import unitIcon from '@/assets/img/unit.png';

export interface MenuItem {
   title: string;
   value: string;
   onClick: () => void;
}

export interface MenuProps {
   items: Array<MenuItem>;
   activeItem: string;
}

export default function Menu({ items, activeItem }: MenuProps) {
   return (
      <div className="flex flex-row items-center justify-center bg-indigo-950 p-3 md:justify-between">
         <img src={logo} alt="company logo" className="hidden md:block" />
         <div className="flex flex-row items-center gap-x-4">
            {items.map((item) => {
               const isActive = item.value === activeItem;
               return (
                  <button
                     key={item.value}
                     type="button"
                     onClick={item.onClick}
                     className={`${isActive && 'bg-blue-700'} flex flex-row items-center rounded-sm text-white gap-x-3 px-2 py-1 hover:bg-blue-900 transition-all`}
                  >
                     <img src={unitIcon} alt={`unit-${item.title}`} />
                     {item.title}
                  </button>
               );
            })}
         </div>
      </div>
   );
}
