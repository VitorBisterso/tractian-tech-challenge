export interface Location {
   id: string;
   name: string;
   parentId?: string; // caso tenha, é uma sub-localização
}

export type AssetStatus = 'alert' | 'operating';

export type SensorType = 'energy' | 'vibration';

export interface Asset {
   id: string;
   name: string;
   status: AssetStatus;
   parentId?: string;
   locationId?: string;
   sensorType?: SensorType; // caso tenha, é um componente
}

/*
   Tem sensorType: Componente.
      Não tem locationId e NEM parentId -> componente raiz
      Tem apenas locationId ou parentId -> componente com localização como pai ou asset como pai
   Senão:
      Tem locationId -> Asset com localização como pai
      Tem parentId -> Asset com outro asset como pai
*/
