import React, { useState } from 'react';

interface BasicInfoScreenProps {
  onBack: () => void;
  initialData: {
    gender: string;
    education: string;
    maritalStatus: string;
    kids: string;
    employment: string;
    monthlySalary: string;
    contact1Rel: string;
    contact1Name: string;
    contact2Rel: string;
    contact2Name: string;
  };
  onSave: (data: any) => void;
}

export const BasicInfoScreen: React.FC<BasicInfoScreenProps> = ({
  onBack,
  initialData,
  onSave,
}) => {
  const [gender, setGender] = useState(initialData.gender || 'Male');
  const [education, setEducation] = useState(initialData.education || 'Senior Secondary');
  const [maritalStatus, setMaritalStatus] = useState(initialData.maritalStatus || 'Married');
  const [kids, setKids] = useState(initialData.kids || '2');
  const [employment, setEmployment] = useState(initialData.employment || 'Others');
  const [monthlySalary, setMonthlySalary] = useState(
    initialData.monthlySalary || '30,000 - 50,000'
  );

  const [contact1Rel, setContact1Rel] = useState(initialData.contact1Rel || 'Spouse');
  const [contact1Name, setContact1Name] = useState(
    initialData.contact1Name || 'VB - 8080609607'
  );

  const [contact2Rel, setContact2Rel] = useState(initialData.contact2Rel || 'Friends');
  const [contact2Name, setContact2Name] = useState(
    initialData.contact2Name || 'Arvind Arvadiya - 977358...'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      gender,
      education,
      maritalStatus,
      kids,
      employment,
      monthlySalary,
      contact1Rel,
      contact1Name,
      contact2Rel,
      contact2Name,
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f7d2] pb-12 font-sans select-none text-gray-900 relative">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow-sm cursor-pointer hover:bg-white transition-all"
        >
          <svg className="w-5 h-5 text-gray-800" viewBox="0 0 10 18" fill="none">
            <path
              d="M8.5 1.5L2 9l6.5 7.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900 font-serif">Basic Info</h1>
        <div className="w-9 h-9" />
      </div>

      {/* Loan Amount Slider / Badge Header */}
      <div className="mx-4 mb-4 bg-gradient-to-r from-amber-100/80 to-yellow-50/80 p-3.5 rounded-2xl border border-amber-200/60 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-xs shadow">
            ₹
          </div>
          <span className="text-xs font-semibold text-gray-700">Credit Limit</span>
        </div>
        <div className="text-sm font-bold text-amber-800 font-mono">₹50,000</div>
      </div>

      <form onSubmit={handleSubmit} className="mx-4 space-y-4">
        {/* Main Details Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-5 shadow-lg border border-white space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Education</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Senior Secondary">Senior Secondary</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Marital Status</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Kids</label>
            <select
              value={kids}
              onChange={(e) => setKids(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Employment</label>
            <select
              value={employment}
              onChange={(e) => setEmployment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Others">Others</option>
              <option value="Salaried">Salaried</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Monthly Salary</label>
            <select
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="30,000 - 50,000">30,000 - 50,000</option>
              <option value="10,000 - 30,000">10,000 - 30,000</option>
              <option value="50,000+">50,000+</option>
            </select>
          </div>
        </div>

        {/* Emergency Contacts 1 */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-5 shadow-lg border border-white space-y-3">
          <h3 className="font-bold text-gray-900 text-sm font-serif">Emergency Contacts 1</h3>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Select Relationship</label>
            <select
              value={contact1Rel}
              onChange={(e) => setContact1Rel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Add Contact</label>
            <input
              type="text"
              value={contact1Name}
              onChange={(e) => setContact1Name(e.target.value)}
              placeholder="Name - Phone"
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
          </div>
        </div>

        {/* Emergency Contacts 2 */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-5 shadow-lg border border-white space-y-3">
          <h3 className="font-bold text-gray-900 text-sm font-serif">Emergency Contacts 2</h3>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Select Relationship</label>
            <select
              value={contact2Rel}
              onChange={(e) => setContact2Rel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Friends">Friends</option>
              <option value="Colleague">Colleague</option>
              <option value="Relative">Relative</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Add Contact</label>
            <input
              type="text"
              value={contact2Name}
              onChange={(e) => setContact2Name(e.target.value)}
              placeholder="Name - Phone"
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
