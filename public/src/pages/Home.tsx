import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, MessageSquare, Calendar, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>([]);

  const surveyQuestions = [
    {
      question: "What communication challenges are you experiencing?",
      options: [
        "Difficulty with speech clarity",
        "Trouble understanding others",
        "Voice problems",
        "Stuttering",
        "Other challenges"
      ]
    },
    {
      question: "How long have you been experiencing these challenges?",
      options: [
        "Less than 6 months",
        "6 months to 1 year",
        "1-3 years",
        "More than 3 years"
      ]
    },
    {
      question: "What is your preferred therapy format?",
      options: [
        "One-on-one online sessions",
        "Group therapy sessions",
        "Self-paced exercises",
        "Combination of formats"
      ]
    }
  ];

  const handleSurveyAnswer = (answer: string) => {
    const newAnswers = [...surveyAnswers, answer];
    setSurveyAnswers(newAnswers);
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      // Reset survey after completion
      setTimeout(() => {
        setSurveyStep(0);
        setSurveyAnswers([]);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your</span>
                  <span className="block text-teal-600">Communication Journey</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Expert speech therapy and support, delivered through our innovative online platform. Start your journey to clearer, more confident communication today.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Your Journey
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1516307365426-bea591f05011?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Speech therapy session"
          />
        </div>
      </div>

      {/* Survey Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Personalized Assessment</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Find Your Path to Better Communication
            </p>
          </div>

          <div className="mt-10 max-w-xl mx-auto">
            {surveyStep < surveyQuestions.length ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Question {surveyStep + 1} of {surveyQuestions.length}</span>
                    <span>{Math.round(((surveyStep + 1) / surveyQuestions.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {surveyQuestions[surveyStep].question}
                </h3>
                <div className="space-y-2">
                  {surveyQuestions[surveyStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSurveyAnswer(option)}
                      className="w-full text-left px-4 py-3 border rounded-lg hover:bg-teal-50 hover:border-teal-500 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        <ArrowRight className="h-4 w-4 text-teal-600" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Thank you for completing the assessment!
                </h3>
                <p className="text-gray-600">
                  Based on your responses, we recommend scheduling a consultation with one of our specialists.
                </p>
                <Link
                  to="/register"
                  className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  Schedule Consultation
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demo Stories Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Demo Stories</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              See How It Works
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Demo Story 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-teal-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Demo Case: Stuttering</h3>
              <p className="text-gray-600">
                "This demo shows how our platform helps with stuttering through personalized exercises and real-time feedback during online sessions."
              </p>
            </div>

            {/* Demo Story 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-teal-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Demo Case: Voice Therapy</h3>
              <p className="text-gray-600">
                "Experience how our voice therapy sessions work with interactive tools and specialized exercises for voice disorders."
              </p>
            </div>

            {/* Demo Story 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-teal-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Demo Case: Speech Clarity</h3>
              <p className="text-gray-600">
                "See how our platform helps improve speech clarity through targeted exercises and professional guidance."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;