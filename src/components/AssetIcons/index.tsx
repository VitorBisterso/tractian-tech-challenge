import { AssetStatus, SensorType } from '@/models';
import energyIcon from '@/assets/img/energy.png';
import vibrationIcon from '@/assets/img/vibration.png';

interface Props {
   sensorType?: SensorType;
   assetStatus?: AssetStatus;
}

export default function AssetIcon({ sensorType, assetStatus }: Props) {
   if (!sensorType) return null;

   return (
      <>
         <img
            src={sensorType === 'energy' ? energyIcon : vibrationIcon}
            alt="energy-sensor-icon"
            height="100%"
         />
         <div
            className={`w-2 h-2 rounded-full ${assetStatus === 'alert' ? 'bg-red-600' : 'bg-green-500'}`}
         />
      </>
   );
}
