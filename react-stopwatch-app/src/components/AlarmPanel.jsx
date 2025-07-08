import { useEffect, useState, useRef } from 'react';
import { DateTime } from 'luxon';

export default function AlarmPanel() {
  const [alarms, setAlarms] = useState([]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.now().toFormat('HH:mm');
      const today = DateTime.now().toISODate();

      alarms.forEach((alarm, index) => {
        if (alarm.time === now && (alarm.recurring || alarm.date === today)) {
          const sound = new Audio('/alarm.mp3');
          sound.loop = true;
          audioRef.current = sound;
          sound.play();


          setTimeout(() => {
            alert(`🔔 ${alarm.title || 'Alarm'} at ${alarm.time}`);
            sound.pause();
            sound.currentTime = 0;

            if (!alarm.recurring) {
              setAlarms(prev => prev.filter((_, i) => i !== index));
            }
          }, 100);
        }
      });
    }, 60000); // La fiecare minut

    return () => clearInterval(interval);
  }, [alarms]);

  const addAlarm = () => {
    if (!time) return;
    setAlarms([...alarms, { title, time, date, recurring }]);
    setTitle('');
    setTime('');
    setDate('');
    setRecurring(false);
  };

  const deleteAlarm = (indexToRemove) => {
    setAlarms(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl mb-2">Alarms</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Alarm Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="text-black border p-1"
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="text-black border p-1"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="text-black border p-1"
        />
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={recurring}
            onChange={e => setRecurring(e.target.checked)}
          />
          <span>Recurring</span>
        </label>
        <button
          onClick={addAlarm}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Alarm
        </button>
      </div>

      <div className="space-y-2">
        {alarms.map((alarm, index) => (
          <div
            key={index}
            className="p-2 bg-gray-800 text-white border rounded flex justify-between items-center"
          >
            <div>
              <strong>{alarm.title || 'Untitled Alarm'}</strong>
              <div>🕒 {alarm.time} {alarm.date && `📅 ${alarm.date}`}</div>
              {alarm.recurring && <div>🔁 Recurring</div>}

            <button
              onClick={() => deleteAlarm(index)}
              className="ml-4 px-2 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
