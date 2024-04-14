import { Reducer, useEffect, useReducer, useState } from 'react';
import { useDebounce } from 'use-debounce';

import Tree from '@/components/Tree';
import { mapTree } from '@/utils/mappers';
import { Asset, Location } from '@/models';
import { selectItem } from '@/utils/helpers';
import { Action, ReducerAction, TreeState, reducer } from './reducer';

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
      <>
         <div className="flex flex-row">
            <input
               type="text"
               className="border-2 border-solid border-stone-800 rounded p-1"
               value={value}
               onChange={(e) => {
                  setValue(e.target.value);
               }}
            />
            <button
               className="px-1 py-3 border-2 border-solid border-stone-800 rounded"
               type="button"
               onClick={() => dispatch({ type: Action.TOGGLE_SENSORS })}
            >
               Sensor de energia
            </button>
            <button
               className="px-1 py-3 border-2 border-solid border-stone-800 rounded"
               type="button"
               onClick={() => dispatch({ type: Action.TOGGLE_CRITICAL })}
            >
               Crítico
            </button>
            <button
               className="px-1 py-3 border-2 border-solid border-stone-800 rounded"
               type="button"
               onClick={() => {
                  setValue('');
                  dispatch({ type: Action.CLEAR_FILTERS });
               }}
            >
               Limpar filtros
            </button>
         </div>
         {state.data.length > 0 ? (
            <Tree
               items={state.data}
               selectedItem={state.selectedItem}
               onSelectItem={(id) => onSelectItem(id)}
            />
         ) : (
            <p>Nenhum resultado encontrado</p>
         )}
      </>
   );
}
