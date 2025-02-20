import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Calendar, Clock, Video, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  const upcomingAppointments = [
    {
      id: '1',
      date: '2024-03-15T10:00:00',
      type: 'speech',
      therapistName: 'Dr. Sarah Johnson',
    },
    {
      id: '2',
      date: '2024-03-17T14:30:00',
      type: 'audiology',
      therapistName: 'Dr. Michael Chen',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {user?.name}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Consultation
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Video className="h-6 w-6 text-blue-600" />
                <span className="ml-2 text-sm font-medium text-blue-600">Upcoming Sessions</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">2</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-green-600" />
                <span className="ml-2 text-sm font-medium text-green-600">Hours Completed</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Users className="h-6 w-6 text-gray-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.therapistName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/consultation/${appointment.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Join
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;