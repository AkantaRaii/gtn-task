import { Trash2 } from "lucide-react";
import DeleteButton from "./deleteButton";
export default function ({
  data,
  deleteFunc,
}: {
  data: any;
  deleteFunc: (email: string) => void;
}) {
  return (
    <div className="col-span-7 rounded-md shadow-md bg-white p-4">
      <h1 className=" text-xl font-bold">Monitoring Emails</h1>
      <p className="text-md text-textforeground mb-2">
        List of all emails currently being monitored
      </p>
      <div className="border-2 border-gray-300 rounded-md">
        {/* Header */}
        <div className="flex h-12 px-4 items-center font-medium text-textforeground border-b">
          <div className="flex-1">Email Address</div>
          <div className="flex-1">Status</div>
          <div className="flex-1">Actions</div>
        </div>

        {/* Body */}
        {data.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex h-12 px-4 items-center border-b-2 border-gray-300  last:border-b-0"
          >
            <div className="flex-1">{item}</div>
            <div className="flex-1">
              <div className="rounded-xl bg-green-200 text-green-800 border border-green-400 w-fit px-2">
                scanned
              </div>
            </div>
            <div className="flex-1  pl-6">
              <DeleteButton email={item} deleteFunc={deleteFunc} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
