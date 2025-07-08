import { useEffect, useState } from "react";
import { DateTime } from "luxon";


const zones = ['UTC', 'Europe/Bucharest', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

export default function Clock() {
  const [zone, setZone] = useState("UTC");
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        DateTime.now()
          .setZone(zone)
          .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [zone]);

  return (
    <div className="mb-6">
      <label className="block mb-1">Time Zone:</label>
      <select
        value={zone}
        onChange={e => setZone(e.target.value)}
        className="p-2 text-black border mb-2"
      >
        {zones.map(z => (
          <option key={z} value={z}>{z}</option>
        ))}
      </select>
      <div className="text-lg font-mono">{time}</div>
    </div>
  );
}
