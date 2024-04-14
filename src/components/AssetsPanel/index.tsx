import { Reducer, useEffect, useReducer, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Tree from '@/components/Tree';
import { mapTree } from '@/utils/mappers';
import { Asset, Location } from '@/models';
import { selectItem } from '@/utils/helpers';
import energyIcon from '@/assets/img/energy-outline.png';
import criticalIcon from '@/assets/img/critical.png';
import { Action, ReducerAction, TreeState, reducer } from './reducer';
import FilterButton from '../FilterButton';

interface Props {
   locations: Array<Location>;
   assets: Array<Asset>;
}

const initialState: TreeState = {
   data: [],
   selectedItem: '',
   filters: { text: '', energySensors: false, onlyCritical: false },
};

export default function AssetsPanel({ locations, assets }: Props) {
   const [state, dispatch] = useReducer<Reducer<TreeState, ReducerAction>>(
      reducer,
      initialState,
   );
   const [value, setValue] = useState('');
   const [textFilter] = useDebounce(value, 500);

   useEffect(() => {
      if (textFilter) {
         dispatch({ type: Action.SELECT_ITEM, payload: {} });
      }

      dispatch({
         type: Action.SET_DATA,
         payload: mapTree(locations, assets, {
            ...state.filters,
            text: textFilter,
         }),
      });
   }, [textFilter, state.filters, locations, assets]);

   function onSelectItem(id: string) {
      dispatch({ type: Action.SELECT_ITEM, payload: id });

      const newData = selectItem(id, state.data);
      dispatch({
         type: Action.SET_DATA,
         payload: newData,
      });
   }

   return (
      <div className="flex flex-col">
         <div className="flex flex-col md:flex-row mb-2 justify-between items-center">
            <input
               type="text"
               className="flex flex-1 border border-solid border-gray-400 rounded px-3 py-2 md:max-w-[50%]"
               value={value}
               placeholder="Buscar Ativo ou Local"
               onChange={(e) => {
                  setValue(e.target.value);
               }}
            />

            <div className="flex flex-1 flex-row items-center gap-x-2 justify-end">
               <FilterButton
                  title="Sensor de energia"
                  onClick={() => dispatch({ type: Action.TOGGLE_SENSORS })}
                  icon={energyIcon}
                  active={state.filters.energySensors}
               />
               <FilterButton
                  title="Crítico"
                  onClick={() => dispatch({ type: Action.TOGGLE_CRITICAL })}
                  icon={criticalIcon}
                  active={state.filters.onlyCritical}
               />
               <FilterButton
                  title="Limpar filtros"
                  onClick={() => {
                     setValue('');
                     dispatch({ type: Action.CLEAR_FILTERS });
                  }}
               />
            </div>
         </div>
         <div className="flex flex-col md:flex-row gap-x-3 justify-between">
            <div className="flex flex-1 bg-white rounded-sm border border-solid border-gray-400 pl-3 pr-6 py-2 overflow-auto md:max-w-[50%]">
               {state.data.length > 0 ? (
                  <Tree
                     items={state.data}
                     selectedItem={state.selectedItem}
                     onSelectItem={(id) => onSelectItem(id)}
                  />
               ) : (
                  <p>Nenhum resultado encontrado</p>
               )}
            </div>
            <div className="flex flex-1 bg-white rounded-sm border border-solid border-gray-400 px-3 py-2">
               details panel
            </div>
         </div>
      </div>
   );
}
