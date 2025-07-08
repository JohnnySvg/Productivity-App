import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [time, setTime] = useState(0); // milliseconds
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const start = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // Update every 10ms for smoother ms tracking
    }
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (running) {
      setLaps((prev) => [...prev, time]);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl mb-2">Stopwatch</h2>
      <div className="text-3xl font-mono mb-4">{formatTime(time)}</div>
      <div className="flex gap-2 mb-4">
        <button onClick={start} className="px-3 py-1 bg-green-500 text-white rounded">Start</button>
        <button onClick={stop} className="px-3 py-1 bg-red-500 text-white rounded">Stop</button>
        <button onClick={reset} className="px-3 py-1 bg-gray-600 text-white rounded">Reset</button>
        <button onClick={lap} className="px-3 py-1 bg-yellow-500 text-white rounded">Lap</button>
      </div>

      {laps.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Laps</h3>
          <ul className="list-decimal list-inside space-y-1">
            {laps.map((lapTime, index) => (
              <li key={index} className="font-mono">{formatTime(lapTime)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}