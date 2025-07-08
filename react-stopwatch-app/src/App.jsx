import Clock from "./components/Clock";
import Stopwatch from "./components/Stopwatch";
import AlarmPanel from "./components/AlarmPanel";
import Calendar2025 from "./components/Calendar2025";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6">🕒 Productivity App</h1>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <Clock />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <Stopwatch />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <AlarmPanel />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <Calendar2025 />
        </div>
      </div>
    </div>
  );
}

export default App;