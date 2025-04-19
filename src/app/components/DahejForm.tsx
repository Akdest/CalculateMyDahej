'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const formatIndianCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN');
};

export default function DahejForm() {
  const [form, setForm] = useState({
    age: '',
    education: '',
    jobType: '',
    salary: '',
    assets: '',
    pets: '',
    govtJobInFamily: '',
    educationExpenses: '',
    maritalStatus: '',
    homeOwnership: '',
    carOwnership: '',
    location: '',
  });

  const [dahejResult, setDahejResult] = useState<string | null>(null);
  const [salaryError, setSalaryError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDahej = () => {
    const {
      salary,
      assets,
      pets,
      govtJobInFamily,
      education,
      jobType,
      educationExpenses,
      maritalStatus,
      homeOwnership,
      carOwnership,
      location,
      age,
    } = form;

    let dahej = '';
    let totalDahej = 0;
    let saaliCount = 2;

    if (jobType === 'unemployed' && salary && Number(salary) !== 0) {
      setSalaryError('If you are jobless, your salary must be entered as ₹0.');
      return;
    } else {
      setSalaryError(null);
    }

    // Base calculations
    if (salary && Number(salary) > 0) {
      totalDahej += Number(salary) * 0.1;
    }

    if (assets && Number(assets) > 0) {
      totalDahej += Number(assets) * 10000;
    }

    if (pets && Number(pets) > 0) {
      totalDahej += Number(pets) * 5000;
    }

    if (govtJobInFamily === 'yes') {
      totalDahej += 500000;
    }

    if (education === 'phd') {
      totalDahej += 200000;
      saaliCount += 2;
    } else if (education === 'masters') {
      totalDahej += 1000000;
      saaliCount += 1;
    } else if (education === 'bachelors') {
      totalDahej += 50000;
    }

    if (jobType === 'government' || govtJobInFamily === 'yes') {
      totalDahej += 1000000;
    } else if (jobType === 'business') {
      totalDahej += 500000;
    } else if (jobType === 'private') {
      totalDahej -= 500000;
    }

    if (educationExpenses && Number(educationExpenses) > 0) {
      totalDahej -= Number(educationExpenses) * 0.1;
    }

    // Marital status
    if (maritalStatus === 'married') {
      totalDahej -= 500000;
    } else if (maritalStatus === 'divorced') {
      totalDahej -= 1000000;
    } else if (maritalStatus === 'single') {
      totalDahej += 200000;
    }

    // Home and car ownership
    if (homeOwnership === 'owned') {
      totalDahej += 200000;
    }

    if (carOwnership === 'yes') {
      totalDahej += 500000;
    }

    // Location
    if (location === 'outside') {
      totalDahej += 1000000;
    } else if (location === 'india-rural') {
      totalDahej -= 500000;
    }

    // Age penalty
    if (age && Number(age) > 30) {
      const agePenalty = (Number(age) - 30) * 100000;
      totalDahej -= agePenalty;
    }

    // Final result message
    if (totalDahej >= 4000000) {
      totalDahej = 3000000;
      dahej = `₹${formatIndianCurrency(totalDahej)} + 10 Jewellery + 1 SUV Car + Virgin Girl + ${saaliCount} saalis + Abroad Trip + New Flat`;
    } else if (totalDahej >= 3000000) {
      totalDahej = 2500000;
      dahej = `₹${formatIndianCurrency(totalDahej)} + Cheque + Virgin Girl + Domestic Trip + Alto-800`;
    } else if (totalDahej >= 2000000) {
      totalDahej = 1500000;
      dahej = `₹${formatIndianCurrency(totalDahej)} + 1 Bike + Non-Virgin Girl + 1 TV + 1 Fridge`;
    } else if (totalDahej >= 1000000) {
      totalDahej = 800000;
      dahej = `₹${formatIndianCurrency(totalDahej)} + 1 Cycle + Cheque + Non-Virgin Girl`;
    } else if (totalDahej >= 25000) {
      dahej = `₹${formatIndianCurrency(totalDahej)} + 2nd hand cycle`;
    } else {
      dahej = `₹${formatIndianCurrency(totalDahej)}`;
    }

    setDahejResult(dahej);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateDahej();
  };

  return (
    <section id="form" className="w-full min-h-screen bg-white py-20 px-6 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Let&apos;s Begin the Evaluation 💍
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
              min="18"
            />
          </div>

          

          {/* Education */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Highest Education</label>
            <select
              name="education"
              value={form.education}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            >
              <option value="">Select</option>
              <option value="bachelors">Bachelor&apos;s Degree</option>
              <option value="masters">Master&apos;s Degree</option>
              <option value="phd">Ph.D</option>
              <option value="none">Other</option>
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Job Type</label>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            >
              <option value="">Select</option>
              <option value="private">Private Sector</option>
              <option value="government">Government Job</option>
              <option value="business">Self-Employed / Business</option>
              <option value="unemployed">Currently Not Working</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Monthly Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
              min="0"
              disabled={form.jobType === 'unemployed'}
            />
            {salaryError && <p className="text-red-500 text-sm mt-2">{salaryError}</p>}
          </div>

          {/* Assets */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Assets (in acres)</label>
            <input
              type="number"
              name="assets"
              value={form.assets}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
              min="0"
            />
          </div>

          {/* Pets */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Cow/Pet Animals</label>
            <input
              type="number"
              name="pets"
              value={form.pets}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
              min="0"
            />
          </div>

          {/* Government Job in Family */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Any Government Job in Family</label>
            <select
              name="govtJobInFamily"
              value={form.govtJobInFamily}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Education Expenses */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Education Expenses (₹)</label>
            <input
              type="number"
              name="educationExpenses"
              value={form.educationExpenses}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
              min="0"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Marital Status</label>
            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          {/* Home Ownership */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Home Ownership</label>
            <select
              name="homeOwnership"
              value={form.homeOwnership}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            >
              <option value="">Select</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
            </select>
          </div>

          {/* Car Ownership */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Car Ownership</label>
            <select
              name="carOwnership"
              value={form.carOwnership}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-semibold text-gray-800">Location</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-yellow-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
              required
            >
              <option value="">Select</option>
              <option value="india-urban">India - Urban</option>
              <option value="india-rural">India - Rural</option>
              <option value="outside">Outside India</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-800 transition-colors duration-300"
            >
              Show Me My Dahej 💸
            </button>
          </div>
        </form>

        {/* Result */}
        {dahejResult && (
          <div className="mt-8 text-center text-lg font-semibold text-gray-800">
            <h3>Your Dahej is:</h3>
            <p className="text-2xl text-yellow-700">{dahejResult}</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
