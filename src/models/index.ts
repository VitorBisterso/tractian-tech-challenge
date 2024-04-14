export interface Location {
   id: string;
   name: string;
   parentId?: string | null;
}

export type AssetStatus = 'alert' | 'operating';

export type SensorType = 'energy' | 'vibration';

export interface Asset {
   id: string;
   name: string;
   status?: AssetStatus | null;
   parentId?: string | null;
   locationId?: string | null;
   sensorType?: SensorType | null;
}

/*
   Tem sensorType: Componente.
      Não tem locationId e NEM parentId -> componente raiz
      Tem apenas locationId ou parentId -> componente com localização como pai ou asset como pai
   Senão:
      Tem locationId -> Asset com localização como pai
      Tem parentId -> Asset com outro asset como pai
*/

export type ItemType = 'location' | 'asset' | 'component';

export interface Item {
   id: string;
   name: string;
   type: ItemType;
   sensorType?: SensorType | null;
   status?: AssetStatus | null;
   children: Array<Item>;

   // styling
   foundByFilter?: boolean;
   isOpened?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type UNIT_TYPE = 'apex' | 'tobias' | 'jaguar';
