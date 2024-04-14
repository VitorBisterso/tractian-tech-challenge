import { useState } from 'react';

import searchIcon from '@/assets/img/search.png';

interface Props {
   value: string;
   setValue: (newValue: string) => void;
}

export default function SearchInput({ value, setValue }: Props) {
   const [focused, setFocused] = useState(false);
   const onFocus = () => setFocused(true);
   const onBlur = () => setFocused(false);

   return (
      <div
         className={`flex flex-1 items-center justify-between pr-3 border border-solid border-gray-400 rounded md:max-w-[40%] ${focused && 'border-blue-400'}`}
      >
         <input
            type="text"
            className="flex flex-1 px-3 py-2 rounded focus:outline-none"
            value={value}
            placeholder="Buscar Ativo ou Local"
            onChange={(e) => {
               setValue(e.target.value);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
         />
         <img src={searchIcon} alt="search-icon" />
      </div>
   );
}
