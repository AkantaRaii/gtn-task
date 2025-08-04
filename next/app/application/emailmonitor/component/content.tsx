"use client";
import Card from "@/app/components/card";
import { Mail, ShieldAlert, Shield, Trash2 } from "lucide-react";
import AddEmail from "./AddEmail";
import EmailList from "./EmailList";
import { useState } from "react";
export default function MonioringContent({ data }: any) {
  const [emails, setEmails] = useState<string[]>(
    data.MonitoredEmailBreach.map((item: any) => item.email_breach.email)
  );

  const handleEmailAdded = (newEmail: any) => {
    setEmails((prev: any) => [...prev, newEmail]);
  };
  return (
    <div className="p-2 ">
      <h1 className="text-3xl mb-1 font-bold">Email Leaks discovery</h1>
      <p className="text-md text-textforeground mb-4">
        Monitor your emails for potential data breaches and leaks
      </p>

      {/* first ko 3 ota batta */}
      <div className=" grid sm:grid-cols-3 grid-cols-1 gap-3 mb-10">
        <Card
          title="Total Monitoring Emails"
          data={data.noOfMonitoredEmails}
          icon={Mail}
          color="red-700"
        />
        <Card
          title="Total Breaches"
          data={
            data?.MonitoredEmailBreach?.reduce(
              (sum: number, item: any) =>
                sum + item.email_breach.exposed_breaches.length,
              0
            ) ?? 0
          }
          icon={ShieldAlert}
          color="red-700"
        />
        <Card
          title="Emails Breached"
          data={
            data?.MonitoredEmailBreach?.reduce(
              (sum: number, item: any) =>
                item.email_breach.exposed_breaches.length > 0 ? sum + 1 : sum,
              0
            ) ?? 0
          }
          icon={Shield}
          color="red-700"
        />
      </div>
      <div className="grid sm:grid-cols-12 gris-cols-1 gap-3">
        {/* list of email */}
        <EmailList data={emails} />
        <div className="col-span-5 w-full bg-white shadow-md rounded-md p-6">
          <h1 className=" text-xl font-bold text-red-700">
            Add Email to Monitor
          </h1>
          <p className="text-md text-textforeground mb-2">
            List of all emails currently being monitored
          </p>
          <AddEmail onEmailAdded={handleEmailAdded} />
        </div>
      </div>
    </div>
  );
}
