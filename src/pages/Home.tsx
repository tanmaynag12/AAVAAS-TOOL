import React from 'react';
import { Link } from 'react-router-dom';
import { Video, MessageSquare, Calendar, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          AAVAAS
          <span className="block text-2xl mt-2 text-blue-600">
            Accessible Audiology And Voice Assistance For All Speech Therapy
          </span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-xl text-gray-600 font-medium md:mt-5 md:max-w-3xl">
          Voice Your World, Hear Every Word
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            to="/login"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 tracking-tight">Video Consultations</h3>
                <p className="mt-5 text-base text-gray-500">
                  High-quality video calls with professionals for personalized therapy sessions.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 tracking-tight">Real-time Chat</h3>
                <p className="mt-5 text-base text-gray-500">
                  Instant messaging for quick communication and follow-ups with your therapist.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg transform -translate-y-1/2">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 tracking-tight">Easy Scheduling</h3>
                <p className="mt-5 text-base text-gray-500">
                  Flexible appointment booking system that works around your schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-12 max-w-xl mx-auto sm:px-6 lg:px-8 lg:max-w-screen-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 lg:h-96">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Speech therapy session"
              />
            </div>
            <div className="lg:mt-0">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Expert Care at Your Fingertips
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Our platform connects you with certified speech pathologists and audiologists.
                Get professional therapy and support from the comfort of your home.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Award className="flex-shrink-0 h-5 w-5 text-blue-600" />
                  <span className="ml-3 text-base font-medium text-gray-900">
                    Certified Professionals
                  </span>
                </div>
                <div className="flex items-center">
                  <Video className="flex-shrink-0 h-5 w-5 text-blue-600" />
                  <span className="ml-3 text-base font-medium text-gray-900">
                    HD Video Quality
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="flex-shrink-0 h-5 w-5 text-blue-600" />
                  <span className="ml-3 text-base font-medium text-gray-900">
                    Flexible Scheduling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;