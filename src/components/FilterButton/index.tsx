export interface FilterButtonProps {
   title: string;
   onClick: () => void;
   icon?: string;
   active?: boolean;
}

export default function FilterButton({
   title,
   onClick,
   icon,
   active,
}: FilterButtonProps) {
   return (
      <button
         className={`flex flex-row items-center gap-x-2 px-3 py-2 border border-solid rounded border-gray-400 font-semibold ${active ? 'text-white bg-sky-300' : 'text-gray-500 bg-white'} hover:bg-sky-200 hover:text transition-all`}
         type="button"
         onClick={onClick}
      >
         {icon && <img src={icon} alt={title} />}
         {title}
      </button>
   );
}
