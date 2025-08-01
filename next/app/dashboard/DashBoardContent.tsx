import { Shield, Skull, RulerDimensionLine, Eye } from "lucide-react";
import Card from "../components/card";
export default function DashBoardContent({ breachData }: any) {
  console.log("akjsdfh");
  console.log(breachData);
  return (
    <>
      {/* <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center m-4"> */}
      <div className=" min-h-[120px] m-4 p-2">
        <h1 className="text-4xl font-bold text-gray-800">Breach Dashboard</h1>
        <p className="text-lg text-muted text-gray-600">
          A quick Overview of breaches.
        </p>
      </div>
      <div className="m-4 ">
        <div className=" min-h-[140px] grid sm:grid-cols-4 gap-4 grid-cols-2">
          <Card
            title="Total Breach Detected"
            data={breachData.exposed_breaches.length}
            icon={Shield}
          />

          <Card
            title="Breach Risk"
            data={
              breachData.breach_risk_score == null
                ? 0
                : breachData.breach_risk_score
            }
            icon={Skull}
          />
          <Card
            title="Leaks Label"
            data={
              breachData.breach_risk_label == null
                ? "Low"
                : breachData.breach_risk_label
            }
            icon={RulerDimensionLine}
          />
          <Card
            title="Total Exposed Data"
            data={
              breachData?.exposed_data.length == null
                ? 0
                : breachData?.exposed_data.length
            }
            icon={Eye}
          />
        </div>

        <div className="min-h-[600px] grid sm:grid-cols-12 gap-4 grid-col-1">
          <div className="bg-pink-300"></div>
          <div className="bg-blue-400"></div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
