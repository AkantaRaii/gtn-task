"use client";
import { useState } from "react";
import { fetchClient } from "@/lib/fetch-client";

export default function DashBoardContent() {
  const [email, setEmail] = useState("");
  const [breachData, setBreachData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    console.log("clicked a buttn");
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    console.log("aasdfa77");

    setLoading(true);
    setError("");
    setBreachData(null);
    try {
      const res = await fetchClient(
        "http://127.0.0.1:8000/api/breach/check-email-breach/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const data = await res.json();
      setBreachData(data);
    } catch (err) {
      setError("Could not fetch data. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* <NavBar /> */}
      {/* <main className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10"> */}
      {/* <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10"> */}

      <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center m-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Breach Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
      </div>
      {breachData && (
        <section className="space-y-6">
          {/* email summary (always show) */}
          <div className="bg-white p-6 m-4 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Email: <span className="text-blue-700">{breachData.email}</span>
            </h2>
            <p className="text-gray-700">
              Risk Level:{" "}
              <strong className="text-red-600">
                {breachData.breach_risk_label ?? "None"}
              </strong>{" "}
              (Score: {breachData.breach_risk_score ?? "0"})
            </p>
            <p className="text-gray-700">
              Paste Exposures: {breachData.paste_count}
            </p>
          </div>

          {/* breaches and exposed data (with fallbacks) */}
          <div className="grid sm:grid-cols-2 gap-2 m-4">
            {/* Exposed Breaches */}
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Exposed Breaches
              </h3>
              {breachData.exposed_breaches.length > 0 ? (
                <ul className="list-disc list-inside space-y-3">
                  {breachData.exposed_breaches.map((breach: any) => (
                    <li key={breach.breach}>
                      <strong>{breach.breach}</strong> ({breach.industry}) –{" "}
                      <span className="text-gray-600">
                        {breach.xposed_date}
                      </span>
                      <br />
                      <em className="text-sm text-gray-500">
                        {breach.details}
                      </em>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">✅ No breaches found.</p>
              )}
            </div>

            {/* Exposed Data */}
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Exposed Data
              </h3>
              {breachData.exposed_data.length > 0 ? (
                <div className="space-y-4">
                  {breachData.exposed_data.map((cat: any) => (
                    <div key={cat.id}>
                      <p className="font-medium text-gray-700">
                        {cat.level2_name}
                      </p>
                      <ul className="ml-5 list-disc text-sm text-gray-600">
                        {cat.items.map((item: any) => (
                          <li key={item.id}>
                            {item.name}{" "}
                            <span className="text-xs text-gray-400">
                              (Group: {item.group})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">✅ No exposed data found.</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* </div> */}
      {/* </main> */}
    </>
  );
}
