import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video } from 'lucide-react';

const Dashboard = () => {
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'Speech Therapy',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-03-21',
      time: '2:30 PM',
      type: 'Audiology Consultation',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <Link
                to="/appointments"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {appointment.patientName}
                      </h3>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{appointment.date}</span>
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <Link
                      to={`/consultation/${appointment.id}`}
                      className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Join
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              to="/schedule"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Schedule Appointment
            </Link>
            <Link
              to="/messages"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View Messages
            </Link>
            <Link
              to="/profile"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;