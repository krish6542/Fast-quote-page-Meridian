import React, { useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

const CITY_MAPPING = {
  'AE-United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
  'US-United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
  'GB-United Kingdom': ['London', 'Manchester', 'Birmingham', 'Glasgow'],
  'CN-China': ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
  'DE-Germany': ['Berlin', 'Munich', 'Frankfurt', 'Hamburg']
};

const CITY_TO_CODE = {
  'Dubai': 'DXB', 'Abu Dhabi': 'AUH', 'Sharjah': 'SHJ', 'Ajman': 'AJM',
  'New York': 'JFK', 'Los Angeles': 'LAX', 'Chicago': 'ORD', 'Houston': 'IAH', 'Miami': 'MIA',
  'London': 'LHR', 'Manchester': 'MAN', 'Birmingham': 'BHX', 'Glasgow': 'GLA',
  'Shanghai': 'PVG', 'Beijing': 'PEK', 'Guangzhou': 'CAN', 'Shenzhen': 'SZX',
  'Berlin': 'BER', 'Munich': 'MUC', 'Frankfurt': 'FRA', 'Hamburg': 'HAM'
};

function App() {
  const [formData, setFormData] = useState({
    origin: { country: '', city: '', postalCode: '' },
    destination: { country: '', city: '', postalCode: '' },
    service: 'Air Freight',
    packages: [{ weight: 0, length: 0, width: 0, height: 0, quantity: 1 }],
    cargoType: 'General'
  });

  const [errors, setErrors] = useState({});

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { weight: 0, length: 0, width: 0, height: 0, quantity: 1 }]
    }));
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const updatePackage = (index, field, value) => {
    setFormData(prev => {
      const newPackages = [...prev.packages];
      newPackages[index] = { ...newPackages[index], [field]: value };
      return { ...prev, packages: newPackages };
    });
  };

  const updateFormData = (key, value) => {
    setFormData(prev => {
      const newState = { ...prev, [key]: value };

      // Reset city if country changed
      if (key === 'origin' && value.country !== prev.origin.country) {
        newState.origin.city = '';
      }
      if (key === 'destination' && value.country !== prev.destination.country) {
        newState.destination.city = '';
      }

      return newState;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.origin.country) newErrors.originCountry = 'Origin country is required';
    if (!formData.origin.city) newErrors.originCity = 'Origin city is required';
    if (!formData.origin.postalCode) newErrors.originPostal = 'Origin postal code is required';

    if (!formData.destination.country) newErrors.destinationCountry = 'Destination country is required';
    if (!formData.destination.city) newErrors.destinationCity = 'Destination city is required';
    if (!formData.destination.postalCode) newErrors.destinationPostal = 'Destination postal code is required';

    formData.packages.forEach((pkg, index) => {
      if (!pkg.weight || pkg.weight <= 0) newErrors[`package${index}Weight`] = `Package ${index + 1} weight is required`;
      if (!pkg.length || pkg.length <= 0) newErrors[`package${index}Length`] = `Package ${index + 1} length is required`;
      if (!pkg.width || pkg.width <= 0) newErrors[`package${index}Width`] = `Package ${index + 1} width is required`;
      if (!pkg.height || pkg.height <= 0) newErrors[`package${index}Height`] = `Package ${index + 1} height is required`;
      if (!pkg.quantity || pkg.quantity <= 0) newErrors[`package${index}Quantity`] = `Package ${index + 1} quantity is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetQuote = () => {
    if (validateForm()) {
      alert('Form is valid! Quote calculation would happen here.');
      // Here you could send data to backend or calculate quote
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[1050px] mx-auto px-4 py-9">
        <button className="group flex items-center gap-2 text-slate-500 hover:text-navy-900 transition-colors mb-6">
          <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="font-bold text-sm uppercase tracking-wide">Back</span>
        </button>
        <div className="mb-9">
          <h1 className="text-4xl lg:text-5xl font-black text-navy-900 tracking-tight mb-3">Instant Quote</h1>
          <p className="text-lg lg:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">Enter your location details and cargo dimensions to get an immediate, guaranteed shipping rate.</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-16 items-start">
          <div className="flex-1 w-full space-y-12">
            {/* Step 1: Route */}
            <div className="flex gap-5 md:gap-6 group step-active">
              <div className="flex flex-col items-center pt-1.5">
                <div className="step-indicator">1</div>
                <div className="w-1 h-full bg-slate-200 mt-3 rounded-full group-hover:bg-blue-200 transition-colors"></div>
              </div>
              <div className="flex-1 glass-card p-6 md:p-8 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-navy-900">
                  <span className="material-symbols-outlined text-3xl text-electric p-2.5 bg-blue-50 rounded-xl">map</span>
                  Where is it going?
                </h2>
                <div className="space-y-9">
                  {/* Origin */}
                  <div>
                    <h3 className="text-lg font-extrabold text-navy-900 mb-5 flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-electric rounded-full ring-4 ring-blue-100"></span>
                      Origin Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide ml-1">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">public</span>
                          <select
                            className="form-input-large pl-12 appearance-none cursor-pointer"
                            value={formData.origin.country}
                            onChange={(e) => updateFormData('origin', { ...formData.origin, country: e.target.value })}
                          >
                            <option value="">Select Country</option>
                            <option value="AE-United Arab Emirates">AE-United Arab Emirates</option>
                            <option value="US-United States">US-United States</option>
                            <option value="GB-United Kingdom">GB-United Kingdom</option>
                            <option value="CN-China">CN-China</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                        {errors.originCountry && <p className="text-red-500 text-xs mt-1">{errors.originCountry}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide ml-1">City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">location_city</span>
                          <select
                            className="form-input-large pl-12 appearance-none cursor-pointer"
                            value={formData.origin.city}
                            onChange={(e) => updateFormData('origin', { ...formData.origin, city: e.target.value })}
                          >
                            <option value="">Select City</option>
                            {(CITY_MAPPING[formData.origin.country] || []).map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                        {errors.originCity && <p className="text-red-500 text-xs mt-1">{errors.originCity}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide ml-1">Postal Code <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">pin_drop</span>
                          <input
                            className="form-input-large pl-12"
                            placeholder="Enter postal code"
                            type="text"
                            value={formData.origin.postalCode}
                            onChange={(e) => updateFormData('origin', { ...formData.origin, postalCode: e.target.value })}
                          />
                        </div>
                        {errors.originPostal && <p className="text-red-500 text-xs mt-1">{errors.originPostal}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <h3 className="text-lg font-extrabold text-navy-900 mb-5 flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-coral rounded-full ring-4 ring-red-100"></span>
                      Destination Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide ml-1">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">public</span>
                          <select
                            className="form-input-large pl-12 appearance-none cursor-pointer"
                            value={formData.destination.country}
                            onChange={(e) => updateFormData('destination', { ...formData.destination, country: e.target.value })}
                          >
                            <option value="">Select Country</option>
                            <option value="US-United States">US-United States</option>
                            <option value="GB-United Kingdom">GB-United Kingdom</option>
                            <option value="AE-United Arab Emirates">AE-United Arab Emirates</option>
                            <option value="DE-Germany">DE-Germany</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                        {errors.destinationCountry && <p className="text-red-500 text-xs mt-1">{errors.destinationCountry}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide ml-1">City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">location_city</span>
                          <select
                            className="form-input-large pl-12 appearance-none cursor-pointer"
                            value={formData.destination.city}
                            onChange={(e) => updateFormData('destination', { ...formData.destination, city: e.target.value })}
                          >
                            <option value="">Select City</option>
                            {(CITY_MAPPING[formData.destination.country] || []).map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                        </div>
                        {errors.destinationCity && <p className="text-red-500 text-xs mt-1">{errors.destinationCity}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-extrabold text-slate-600 uppercase tracking-wide ml-1">Postal Code <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">pin_drop</span>
                          <input
                            className="form-input-large pl-12"
                            placeholder="Enter postal code"
                            type="text"
                            value={formData.destination.postalCode}
                            onChange={(e) => updateFormData('destination', { ...formData.destination, postalCode: e.target.value })}
                          />
                        </div>
                        {errors.destinationPostal && <p className="text-red-500 text-xs mt-1">{errors.destinationPostal}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-9 border-t border-slate-100 pt-8">
                  <label className="block text-base font-black text-navy-900 mb-5">Preferred Service</label>
                  <div className="relative">
                    <select
                      className="form-input-large pl-5 appearance-none cursor-pointer"
                      value={formData.service}
                      onChange={(e) => updateFormData('service', e.target.value)}
                    >
                      <option value="Air Freight">Air Freight</option>
                      <option value="Road Freight (GCC)">Road Freight (GCC)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Package Sizes */}
            <div className="flex gap-5 md:gap-6 group step-active">
              <div className="flex flex-col items-center pt-1.5">
                <div className="step-indicator">2</div>
                <div className="w-1 h-full bg-slate-200 mt-3 rounded-full group-hover:bg-blue-200 transition-colors"></div>
              </div>
              <div className="flex-1 glass-card p-6 md:p-8 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-center mb-8 gap-3">
                  <h2 className="text-2xl font-black flex items-center gap-3 text-navy-900">
                    <span className="material-symbols-outlined text-3xl text-electric p-2.5 bg-blue-50 rounded-xl">inventory_2</span>
                    Package Sizes
                  </h2>
                  <button
                    onClick={addPackage}
                    className="bg-navy-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-navy-800 transition-all shadow-lg shadow-navy-900/20"
                  >
                    <span className="material-symbols-outlined text-xl">add_circle</span> Add Package
                  </button>
                </div>
                <div className="space-y-5">
                  {formData.packages.map((pkg, index) => (
                    <div key={index} className="bg-slate-50 p-7 rounded-2xl border-2 border-dashed border-slate-200 relative group/pkg">
                      {formData.packages.length > 1 && (
                        <button
                          onClick={() => removePackage(index)}
                          className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover/pkg:opacity-100 z-10"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">close</span>
                        </button>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center block">Weight (kg) <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <input
                              className="form-input-large text-center !text-xl !py-3 shadow-sm"
                              type="number"
                              value={pkg.weight}
                              onChange={(e) => updatePackage(index, 'weight', e.target.value)}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">kg</span>
                          </div>
                          {errors[`package${index}Weight`] && <p className="text-red-500 text-xs mt-1">{errors[`package${index}Weight`]}</p>}
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center block">Length (cm) <span className="text-red-500">*</span></label>
                          <input
                            className="form-input-large text-center !text-xl !py-3 shadow-sm"
                            placeholder="0"
                            type="number"
                            value={pkg.length}
                            onChange={(e) => updatePackage(index, 'length', e.target.value)}
                          />
                          {errors[`package${index}Length`] && <p className="text-red-500 text-xs mt-1">{errors[`package${index}Length`]}</p>}
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center block">Width (cm) <span className="text-red-500">*</span></label>
                          <input
                            className="form-input-large text-center !text-xl !py-3 shadow-sm"
                            placeholder="0"
                            type="number"
                            value={pkg.width}
                            onChange={(e) => updatePackage(index, 'width', e.target.value)}
                          />
                          {errors[`package${index}Width`] && <p className="text-red-500 text-xs mt-1">{errors[`package${index}Width`]}</p>}
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center block">Height (cm) <span className="text-red-500">*</span></label>
                          <input
                            className="form-input-large text-center !text-xl !py-3 shadow-sm"
                            placeholder="0"
                            type="number"
                            value={pkg.height}
                            onChange={(e) => updatePackage(index, 'height', e.target.value)}
                          />
                          {errors[`package${index}Height`] && <p className="text-red-500 text-xs mt-1">{errors[`package${index}Height`]}</p>}
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center block">Quantity <span className="text-red-500">*</span></label>
                          <input
                            className="form-input-large text-center !text-xl !py-3 shadow-sm"
                            placeholder="1"
                            type="number"
                            value={pkg.quantity}
                            onChange={(e) => updatePackage(index, 'quantity', e.target.value)}
                          />
                          {errors[`package${index}Quantity`] && <p className="text-red-500 text-xs mt-1">{errors[`package${index}Quantity`]}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Type of Cargo */}
            <div className="flex gap-5 md:gap-6 group step-active">
              <div className="flex flex-col items-center pt-1.5">
                <div className="step-indicator">3</div>
              </div>
              <div className="flex-1 glass-card p-6 md:p-8 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-black mb-9 flex items-center gap-3 text-navy-900">
                  <span className="material-symbols-outlined text-3xl text-electric p-2.5 bg-blue-50 rounded-xl">category</span>
                  Type of Cargo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { id: 'General', label: 'General', icon: 'package_2', desc: 'Standard goods, safe handling items.', color: 'blue' },
                    { id: 'Dangerous', label: 'Dangerous', icon: 'warning', desc: 'Hazardous materials or chemicals.', color: 'orange' },
                    { id: 'Non-Stack', label: 'Non-Stack', icon: 'layers_clear', desc: 'Fragile items that cannot be stacked.', color: 'teal' },
                  ].map((card) => (
                    <div
                      key={card.id}
                      className={`cargo-card ${formData.cargoType === card.id ? 'cargo-card-active' : 'border-2 border-slate-100 hover:border-slate-300'}`}
                      onClick={() => updateFormData('cargoType', card.id)}
                    >
                      {formData.cargoType === card.id && (
                        <div className="absolute top-4 right-4 text-electric">
                          <span className="material-symbols-outlined text-2xl font-bold">check_circle</span>
                        </div>
                      )}
                      <div className={`w-20 h-20 rounded-full bg-${card.color}-100 flex items-center justify-center mb-5 shadow-inner`}>
                        <span className={`material-symbols-outlined text-4xl text-${card.color}-600`}>{card.icon}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-navy-900 mb-1.5">{card.label}</h3>
                      <p className="text-center text-sm font-bold text-slate-500 leading-tight px-1">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <aside className="w-full xl:w-[300px] xl:sticky xl:top-28 space-y-6">
            <div className="bg-navy-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden ring-4 ring-navy-900/5">
              <div className="absolute -top-18 -right-18 w-48 h-48 bg-electric/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-18 -left-18 w-48 h-48 bg-coral/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black tracking-tight">Summary</h3>
                  <span className="text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/10">Draft</span>
                </div>
                <div className="space-y-6 mb-9">
                  <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Weight</p>
                      <p className="text-3xl font-black tracking-tight">{formData.packages.reduce((sum, pkg) => sum + (parseFloat(pkg.weight) || 0), 0).toFixed(1)} <span className="text-base font-bold text-slate-500">kg</span></p>
                    </div>
                    <span className="material-symbols-outlined text-coral text-4xl opacity-90">scale</span>
                  </div>
                  <div className="space-y-5 px-1.5">
                    <div className="flex justify-between items-start">
                      <span className="text-slate-400 font-bold text-base">Route</span>
                      <div className="text-right">
                        <p className="font-black text-lg">
                          {(CITY_TO_CODE[formData.origin.city] || '---')} → {(CITY_TO_CODE[formData.destination.city] || '---')}
                        </p>
                        <p className="text-xs text-slate-400 font-bold mt-0.5 uppercase">
                          {formData.origin.city || 'Select Origin'} to {formData.destination.city || 'Select Destination'}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                      <span className="text-slate-400 font-bold text-base">Service</span>
                      <span className="text-right font-black text-base flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-electric rounded-full shadow-[0_0_8px_#3b82f6]"></span> {formData.service}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                      <span className="text-slate-400 font-bold text-base">Cargo</span>
                      <span className="text-right font-black text-base">{formData.cargoType}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-electric hover:bg-blue-600 text-white font-black py-4 px-6 rounded-xl text-xl shadow-xl-glow transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group" onClick={handleGetQuote}>
                  GET QUOTE
                  <span className="material-symbols-outlined text-3xl group-hover:translate-x-1.5 transition-transform">arrow_forward_ios</span>
                </button>
                <p className="text-center text-xs font-bold text-slate-500 mt-6 px-3 leading-relaxed">
                  By clicking, you agree to our <a className="text-white hover:text-coral transition-colors underline decoration-2 underline-offset-4" href="#">Privacy Policy &amp; Terms</a>.
                </p>
              </div>
            </div>
            <div className="p-6 bg-white border-2 border-slate-100 rounded-[2rem] flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center text-coral shrink-0">
                <span className="material-symbols-outlined text-3xl font-bold">support_agent</span>
              </div>
              <div>
                <h4 className="font-black text-navy-900 text-lg">Need Help?</h4>
                <p className="text-slate-500 font-bold text-sm mt-0.5">Call us at <span className="text-navy-900">800-MERIDIAN</span></p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
