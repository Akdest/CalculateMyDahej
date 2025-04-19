'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Function to format the number according to the Indian currency system
const formatIndianCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN'); // This uses the Indian locale formatting
};

export default function DahejForm() {
  const [form, setForm] = useState({
    education: '',
    jobType: '',
    salary: '',
    assets: '',
    pets: '',
    govtJobInFamily: '',
  });

  const [dahejResult, setDahejResult] = useState<string | null>(null);
  const [salaryError, setSalaryError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDahej = () => {
    const { salary, assets, pets, govtJobInFamily, education, jobType } = form;
    let dahej = '';
    let totalDahej = 0;
    let additionalItems = '';
    let saaliCount = 2; // Default number of saalis

    // Salary validation if jobless
    if (jobType === 'unemployed' && salary && Number(salary) !== 0) {
      setSalaryError('If you are jobless, your salary must be entered as ₹0.');
      return;
    } else {
      setSalaryError(null);
    }

    // Base calculation based on salary and assets
    if (salary && Number(salary) > 0) {
      totalDahej += Number(salary) * 0.1; // 10% of salary as Dahej
    }

    if (assets && Number(assets) > 0) {
      totalDahej += Number(assets) * 10000; // Add ₹10,000 per acre of property
    }

    // Add based on pets
    if (pets && Number(pets) > 0) {
      totalDahej += Number(pets) * 5000; // ₹5,000 per pet
    }

    // Check if there&apos;s a government job in the family
    if (govtJobInFamily === 'yes') {
      totalDahej += 500000; // Add ₹5,00,000 if there is a govt job in the family
      additionalItems += ' + Government Job in Family';
    }

    // Determine the impact of education level on Dahej
    if (education === 'phd') {
      totalDahej += 200000; // Additional ₹20 Lakh for Ph.D holders
      additionalItems += ' + Ph.D Education';
      saaliCount += 2; // More saalis for higher education
    } else if (education === 'masters') {
      totalDahej += 1000000; // Additional ₹10 Lakh for Master's Degree
      additionalItems += ' + Master&apos;s Degree';
      saaliCount += 1; // Increase saali count slightly for Master's
    } else if (education === 'bachelors') {
      totalDahej += 50000; // Additional ₹5 Lakh for Bachelor&apos;s Degree
      additionalItems += ' + Bachelor&apos;s Degree';
    }

    // Apply job type modifier (prioritizing government service)
    if (jobType === 'government' || govtJobInFamily === 'yes') {
      totalDahej += 1000000; // Boost for government job in family or self
      additionalItems += ' + Government Job';
    } else if (jobType === 'business') {
      totalDahej += 500000; // Business gets a decent boost
      additionalItems += ' + Business Owner';
    } else if (jobType === 'private') {
      totalDahej -= 500000; // Demoralize private sector with a deduction
      additionalItems += ' - Private Sector Job (Sorry!)';
    }

    // Determine the final Dahej output based on totalDahej
    if (totalDahej >= 4000000) {
      totalDahej = 3000000; // Reduce total Dahej to a more affordable value
      dahej = `₹${formatIndianCurrency(totalDahej)} + 10 Jewellery + 1 SUV Car + Virgin Girl + ${saaliCount} saalis + Abroad Trip + New Flat`;
    } else if (totalDahej >= 3000000) {
      totalDahej = 2500000; // Reduce total Dahej to a more affordable value
      dahej = `₹${formatIndianCurrency(totalDahej)} + 1 SUV Car + Virgin Girl + Domestic Trip + Auto Rickshaw + Nano Car`;
    } else if (totalDahej >= 2000000) {
      totalDahej = 1500000; // Reduce total Dahej to a more affordable value
      dahej = `₹${formatIndianCurrency(totalDahej)} + 1 Bike + Non-Virgin Girl + 1 TV + Domestic Trip`;
    } else if (totalDahej >= 1000000) {
      totalDahej = 800000; // Further reduce for smaller amounts
      dahej = `₹${formatIndianCurrency(totalDahej)} + 1 Cycle + Cheque + Non-Virgin Girl`;
    } else if (totalDahej >= 25000) {
      dahej = `₹${formatIndianCurrency(totalDahej)} + 2nd hand cycle`;
    } else {
      dahej = `₹${formatIndianCurrency(totalDahej)}`;
    }
// Salary validation if jobless
if (jobType === 'unemployed' && salary && Number(salary) !== 0) {
  setSalaryError('If you are jobless, your salary must be entered as ₹0.');
  return;
} else {
  setSalaryError(null);
}

// Penalize highly educated but unemployed individuals
if (
  (education === 'phd' || education === 'masters' || education === 'bachelors') &&
  jobType === 'unemployed' && govtJobInFamily === 'no'
) {
  totalDahej = 10000; // Super low Dahej
  dahej = `₹-6,00,000 `;
  setDahejResult(dahej);
  return;
}

if (
  (education === 'phd' || education === 'masters' || education === 'bachelors') &&
  jobType === 'unemployed' && govtJobInFamily === 'yes'
) {
  totalDahej = 10000; // Super low Dahej
  dahej = `₹-2,00,000 `;
  setDahejResult(dahej);
  return;
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

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-800 transition-colors duration-300"
            >
              Show Me My Dahej
            </button>
          </div>
        </form>

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
