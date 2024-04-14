interface Props {
   unit: string;
}

export default function Breadcrumb({ unit }: Props) {
   const unitText = `${unit.charAt(0).toUpperCase()}${unit.slice(1)} Unit`;

   return (
      <div className="flex flex-row items-center gap-x-3 my-3">
         <p className="font-bold text-2xl">Ativos</p>
         {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
         <p className="text-gray-400">/ {unitText}</p>
      </div>
   );
}
