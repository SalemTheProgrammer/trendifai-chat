"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Video, Phone } from "lucide-react";
import { useState } from "react";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

const meetingTypes = [
  {
    icon: Video,
    label: "Video Call",
    description: "Meet via Google Meet or Zoom"
  },
  {
    icon: Phone,
    label: "Phone Call",
    description: "Traditional phone consultation"
  }
];

export function MeetingScheduler() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <section id="meeting-scheduler" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-20" />
      <div className="absolute inset-0 grid-overlay opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Book a Meeting with Us
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Schedule a time that works for you, and let's discuss how AI can transform your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative dark-card p-8 rounded-2xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur transition-all duration-200" />
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold text-white">Select Date & Time</h3>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-md border border-gray-600 bg-white/5 text-white px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        selectedTime === time
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Meeting Type Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative dark-card p-8 rounded-2xl"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur transition-all duration-200" />
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold text-white">Meeting Details</h3>
              </div>

              <div className="space-y-4 mb-6">
                {meetingTypes.map((type) => (
                  <button
                    key={type.label}
                    onClick={() => setSelectedType(type.label)}
                    className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 ${
                      selectedType === type.label
                        ? 'bg-purple-600/20 border border-purple-500'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <type.icon className="w-6 h-6 text-purple-500 mr-4" />
                    <div className="text-left">
                      <p className="font-medium text-white">{type.label}</p>
                      <p className="text-sm text-gray-400">{type.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedDate || !selectedTime || !selectedType}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Schedule Meeting
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 


