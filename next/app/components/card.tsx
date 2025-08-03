import { LucideProps } from "lucide-react";
interface Props {
  title: string;
  data: number | string;
  icon: React.ElementType<LucideProps>;
}
export default function Card({ title, data, icon: Icon }: Props) {
  return (
    <div className="bg-white rounded-md shadow-md px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex felx-row justify-between">
          <div className="text-lg font-bold">{title}</div>
          <Icon className="text-red-500" />
        </div>
        <p className="text-4xl">{data}</p>
      </div>
    </div>
  );
}
