import { useEffect, useState } from "react";
import AppointmentForm from "./Appointment";

const Calendar = () => {
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [edit, setEdit] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
const monthName = today.toLocaleString("default", { month: "long", year: "numeric" });

  const startOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = startOfMonth.getDay(); 

  useEffect(() => {
    const save = JSON.parse(localStorage.getItem("appointments") || "{}");
    setAppointments(save);
  }, []);

  const handleSave = (data) => {
    const key = selectedDate.toDateString();
    const updated = { ...appointments, [key]: data };
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
   <div className="p-4 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold mb-3 text-center text-blue-600">📅 Appointment Calendar</h1>
  <h2 className="text-xl text-center text-gray-700 mb-4">{monthName}</h2>

  <div className="sm:hidden mb-4">
    <input
      type="date"
      className="w-full p-2 border rounded shadow-sm"
      value={selectedDate?.toISOString().split("T")[0] || today.toISOString().split("T")[0]}
      onChange={(e) => {
        const pickedDate = new Date(e.target.value);
        setSelectedDate(pickedDate);
        setEdit(true);
      }}
    />
  </div>

  <div className="hidden md:grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-700 mb-2">
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div key={day} className="text-gray-500">{day}</div>
    ))}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
    {Array(startDay).fill(null).map((_, i) => (
      <div key={`empty-${i}`} className="hidden md:block h-24"></div>
    ))}

    {[...Array(daysInMonth)].map((_, i) => {
      const date = new Date(year, month, i + 1);
      const appt = appointments[date.toDateString()];
      const isToday = date.toDateString() === today.toDateString();

      return (
        <div
          key={i}
          className={`border rounded-lg p-3 min-h-[6rem] flex flex-col justify-between cursor-pointer transition ${
            isToday ? "bg-blue-100 border-blue-400" : "bg-white"
          } hover:bg-blue-50`}
          onClick={() => {
            setSelectedDate(date);
            setEdit(true);
          }}
        >
          <div className="font-semibold text-blue-700">{i + 1}</div>

          {appt && (
            <div className="text-xs text-left text-gray-700 mt-1 space-y-1">
              <p className="font-medium truncate">{appt.patient}</p>
              <p className="text-gray-500">{appt.time}</p>
            </div>
          )}
        </div>
      );
    })}
  </div>

  {edit && selectedDate && (
    <AppointmentForm
      date={selectedDate}
      onClose={() => setEdit(false)}
      Save={handleSave}
      defaultValue={appointments[selectedDate.toDateString()]}
    />
  )}
</div>

  );
};

export default Calendar;
