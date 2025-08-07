import { Shield, Skull, RulerDimensionLine, Eye } from "lucide-react";
import Card from "../../components/card";
import LineChartComponent from "../../components/LineChart";
export default function DashBoardContent({ breachData }: any) {
  const emailRecord = breachData?.email_record;
  const yearlyStat = breachData?.yearly_stat;
  const yearlyData = yearlyStat?.map((item: any) => ({
    year: item.year,
    count: item.count,
  }));
  return (
    <>
      {/* heading ho yo */}
      <div className=" min-h-[120px] mt-14  p-2">
        <h1 className="text-4xl font-bold text-gray-800">Breach Dashboard</h1>
        <p className="text-lg text-muted text-textforeground">
          A quick Overview of breaches.
        </p>
      </div>

      {/* 4 ota batta ko row */}
      <div className="m-4">
        <div className=" min-h-[140px] grid sm:grid-cols-4 gap-4 grid-cols-2">
          <Card
            title="Total Breach Detected"
            data={emailRecord.exposed_breaches.length}
            icon={Shield}
          />

          <Card
            title="Breach Risk"
            data={
              emailRecord.breach_risk_score == null
                ? 0
                : emailRecord.breach_risk_score
            }
            icon={Skull}
          />
          <Card
            title="Leaks Label"
            data={
              emailRecord.breach_risk_label == null
                ? "Low"
                : emailRecord.breach_risk_label
            }
            icon={RulerDimensionLine}
          />
          <Card
            title="Total Exposed Data"
            data={
              emailRecord?.exposed_data.length == null
                ? 0
                : emailRecord?.exposed_data.length
            }
            icon={Eye}
          />
        </div>

        {/* graph ko row */}
        <div className="grid sm:grid-cols-12 gap-4 grid-cols-1">
          <div className="sm:col-span-8 col-span-12 h-[400px] mt-4 bg-white shadow-md rounded-md px-2 pt-4 pb-10">
            <LineChartComponent data={yearlyData} />
          </div>
          <div className="bg-white  col-span-12 sm:col-span-4 h-[400px] mt-4 px-4 py-2 rounded-md shadow-md">
            <h1 className="text-lg font-bold">Exposed Data</h1>
            <h5 className="text-sm text-muted text-textforeground">
              Distribution of leak types detected
            </h5>
            <div className="text-center">
              {emailRecord.exposed_data.length == 0 ? (
                "No Leaks found"
              ) : (
                <div className="flex flex-col gap-2 h-[200px] justify-center items-start">
                  {emailRecord.exposed_data.map((item: any) => {
                    return <p>{item?.level2_name}</p>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* discription ho hai yo */}
        <div className="w-full bg-white h-[300px] my-2 rounded-md shadow-md p-4">
          <h1 className="text-lg font-bold">Breach Description</h1>
          <h1 className="text-sm text-muted text-textforeground">
            summary of the breach
          </h1>
          <div className="my-4">
            {emailRecord.exposed_breaches.length == 0
              ? "No details about leak found"
              : emailRecord?.exposed_breaches.map((item: any) => {
                  return (
                    <>
                      <div className="flex flex-col gap-2">
                        <h1 className="text-lg font-medi">{item.breach}</h1>
                        <p>{item.details}</p>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}
