import { useState } from "react";
import { doctors,patients  } from "../assets/data/Data";
import { toast } from "react-toastify";

const AppointmentForm = ({ date, onClose, Save, defaultValue }) => {
  const [patient, setPatient] = useState(defaultValue?.patient || "");
  const [doctor, setDoctor] = useState(defaultValue?.doctor || "");
  const [time, setTime] = useState(defaultValue?.time || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !doctor || !time) return toast.info('All fields required',{position:'top-left'});
    Save({ patient, doctor, time });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10 ">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg  w-120 space-y-4">
        <h3 className="text-2xl font-semibold border-b  text-blue-600 pb-2  mb-6">Appointment on {date.toDateString()}</h3>
        <select className="w-full border p-2 rounded mb-6" value={patient} onChange={(e) => setPatient(e.target.value)}>
          <option value="">Select Patient</option>
          {patients.map((patient) => <option key={patient}>{patient}</option>)}
        </select>
        <select className="w-full border p-2 rounded mb-6 " value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => <option key={doctor}>{doctor}</option>)}
        </select>
        <input
          type="time"
          className="w-full border p-2 rounded mb-6 "
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button type="button" className="text-gray-500" onClick={onClose}>Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
