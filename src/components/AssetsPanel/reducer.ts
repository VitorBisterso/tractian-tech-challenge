import { Item } from '@/models';

export enum Action {
   SET_DATA = 'SET_DATA',
   SELECT_ITEM = 'SELECT_ITEM',
   TOGGLE_SENSORS = 'TOGGLE_SENSORS',
   TOGGLE_CRITICAL = 'TOGGLE_CRITICAL',
   CLEAR_FILTERS = 'CLEAR_FILTERS',
}

export interface ReducerAction {
   type: Action;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   payload?: any;
}

export interface Filters {
   text: string;
   energySensors: boolean;
   onlyCritical: boolean;
}

export interface TreeState {
   data: Array<Item>;
   selectedItem: string;
   filters: Filters;
}

export function reducer(state: TreeState, action: ReducerAction) {
   const { type, payload } = action;

   switch (type) {
      case Action.SET_DATA:
         return {
            ...state,
            data: payload,
         };

      case Action.SELECT_ITEM:
         return {
            ...state,
            selectedItem: payload,
         };

      case Action.TOGGLE_SENSORS:
         return {
            ...state,
            filters: {
               ...state.filters,
               energySensors: !state.filters.energySensors,
            },
         };

      case Action.TOGGLE_CRITICAL:
         return {
            ...state,
            filters: {
               ...state.filters,
               onlyCritical: !state.filters.onlyCritical,
            },
         };

      case Action.CLEAR_FILTERS:
         return {
            ...state,
            filters: {
               text: '',
               energySensors: false,
               onlyCritical: false,
            },
         };

      default:
         return state;
   }
}
