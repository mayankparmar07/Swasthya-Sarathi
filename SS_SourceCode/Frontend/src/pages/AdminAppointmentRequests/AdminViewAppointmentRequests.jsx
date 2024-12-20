import Card from "./Component/Card";
import "./AdminViewAppointmentRequests.css";
import { getHospitalAppointments } from "./../../assets/data/admin_app.jsx";

export default function AdminViewAppointmentRequests() {
  const { appointments, loading, error } = getHospitalAppointments();

  if (loading) return <div className="view-appointment-requests-page">Loading...</div>;
  if (error) return <div className="view-appointment-requests-page">Error: {error}</div>;

  // Sort appointments by status
  const sortedAppointments = appointments.sort((a, b) => {
    const statusOrder = ['pending', 'approved', 'completed', 'rejected'];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  return (
    <div className="view-appointment-requests-page">
      <div className="view-appointment-requests-container">
        <div className="view-appointment-requests-title">Appointment Requests</div>
        <div className="view-appointment-requests-list">
          {sortedAppointments.map((appointment) => (
            <Card
              key={appointment._id}
              appointmentID={appointment._id}
              patientName={appointment.patient?.name || "Unknown Patient"}
              doctorName={appointment.doctor?.name || "Unknown Doctor"}
              date={new Date(appointment.date).toLocaleDateString()}
              time={appointment.time}
              status={appointment.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}