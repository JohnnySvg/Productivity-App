import { useState, useEffect, useRef } from "react";

const months = Array.from({ length: 12 }, (_, i) =>
  new Date(2025, i).toLocaleString("default", { month: "long" })
);

export default function Calendar2025() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [notes, setNotes] = useState({});
  const containerRef = useRef(null);

  const daysInMonth = new Date(2025, monthIndex + 1, 0).getDate();

  useEffect(() => {
    const storedNotes = localStorage.getItem("calendarNotes2025");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        localStorage.setItem("calendarNotes2025", JSON.stringify(notes));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notes]);

  const handleMonthChange = (e) => {
    localStorage.setItem("calendarNotes2025", JSON.stringify(notes));
    setMonthIndex(parseInt(e.target.value));
  };

  const updateNote = (day, note) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [`${monthIndex}-${day}`]: note,
    }));
  };

  return (
    <div ref={containerRef}>
      <h2 className="text-2xl mb-2 text-white">Calendar 2025</h2>

      <select
        value={monthIndex}
        onChange={handleMonthChange}
        className="p-2 text-black border mb-4 rounded"
      >
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const key = `${monthIndex}-${day}`;
          const noteValue = notes[key] || "";

          return (
            <div
              key={day}
              className="border p-2 bg-gray-800 text-white rounded shadow"
            >
              <strong>{day}</strong>
              <textarea
                className="mt-2 w-full text-black p-1 border rounded bg-white"
                rows="2"
                placeholder="Notiță"
                value={noteValue}
                onChange={(e) => updateNote(day, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
