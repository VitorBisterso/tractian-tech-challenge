import { useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

import { AssetStatus, Item, ItemType, SensorType } from '@/models';
import { isComponent } from '@/utils/validators';
import locationImage from '@/assets/img/location.jpg';
import assetImage from '@/assets/img/genericAsset.png';
import energyImage from '@/assets/img/energyAsset.png';
import vibrationImage from '@/assets/img/vibrationAsset.png';
import sensorIcon from '@/assets/img/sensor.png';
import routerIcon from '@/assets/img/router.png';
import AssetIcon from '../AssetIcons';

interface Props {
   item: Item;
}

const genericImages: Record<ItemType, string> = {
   location: locationImage,
   asset: assetImage,
   component: '',
};

const componentImages: Record<SensorType, string> = {
   energy: energyImage,
   vibration: vibrationImage,
};

function DetailTitle({ text }: { text: string }) {
   return <p className="font-bold text-lg">{text}</p>;
}

function DetailInfo({ text }: { text: string }) {
   return <p className="text-lg text-gray-400">{text}</p>;
}

export default function DetailsPanel({ item }: Props) {
   const itemIsComponent = useMemo(() => isComponent(item), [item]);

   function getImageSrc() {
      if (itemIsComponent) return componentImages[item.sensorType!];

      return genericImages[item.type];
   }

   if (!item.name)
      return (
         <p className="text-2xl font-bold px-3 py-2">
            Selecione um item na árvore
         </p>
      );

   function renderFirstDetails() {
      if (!itemIsComponent)
         return (
            <div className="flex flex-col">
               <DetailTitle text="Itens associados" />
               <DetailInfo text={item.children.length.toString()} />
            </div>
         );

      const isEnergy = item.sensorType === 'energy';
      return (
         <div className="flex flex-col flex-1">
            <div className="flex flex-col mb-3 pb-3 border-b border-solid border-gray-200">
               <DetailTitle text="Tipo de equipamento" />
               <DetailInfo
                  text={isEnergy ? 'Motor elétrico' : 'Sensor de vibração'}
               />
            </div>
            <div className="flex flex-col flex-1">
               <DetailTitle text="Responsáveis" />
               <div className="flex flex-row items-center mt-2">
                  <div className="w-[32px] h-[32px] grid place-items-center text-white rounded-full bg-sky-500 mr-3">
                     {isEnergy ? 'E' : 'V'}
                  </div>
                  <DetailInfo text={isEnergy ? 'Elétrica' : 'Mecânica'} />
               </div>
            </div>
         </div>
      );
   }

   function renderBottomInfo(text: string, icon: string) {
      return (
         <div className="flex flex-col">
            <DetailTitle text={text} />
            <div className="flex flec-row items-center gap-x-2">
               <img src={icon} alt={`${text.toLowerCase()}-icon`} />
               <DetailInfo text={faker.string.alpha(7).toUpperCase()} />
            </div>
         </div>
      );
   }

   function renderOtherDetails() {
      if (!itemIsComponent) return null;

      return (
         <>
            {renderBottomInfo('Sensor', sensorIcon)}
            {renderBottomInfo('Receptor', routerIcon)}
         </>
      );
   }

   return (
      <div className="flex flex-col flex-1 pb-5">
         <div className="flex flex-row items-center gap-x-4 mb-5 py-2 border-b border-solid border-gray-200">
            <p className="text-2xl font-bold px-3 py-2">{item.name}</p>
            <AssetIcon
               sensorType={item.sensorType as SensorType}
               assetStatus={item.status as AssetStatus}
            />
         </div>
         <div className="flex flex-col md:flex-row items-center px-5 py-2 gap-x-7">
            <img
               src={getImageSrc()}
               className="object-cover max-w-[50%] max-h-[50%] md:max-w-[335px] md:max-h-[230px]"
               alt={item.name}
            />
            <div className="flex flex-col">{renderFirstDetails()}</div>
         </div>
         <div className="flex flex-col min-[350px]:flex-row px-5 gap-x-[35%] mt-5 pt-3 border-t border-solid border-gray-200">
            {renderOtherDetails()}
         </div>
      </div>
   );
}
