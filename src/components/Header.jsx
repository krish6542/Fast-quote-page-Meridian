import React from 'react';

const Header = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-[1050px] mx-auto px-4 h-18 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-navy-900 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg transform -rotate-3">M</div>
                <span className="font-black text-xl tracking-tighter text-navy-900">MERIDIAN</span>
            </div>
            <nav className="hidden lg:flex items-center gap-10">
                <a className="text-electric font-bold flex items-center gap-2 text-base bg-blue-50 px-3 py-1.5 rounded-full" href="#">
                    <span className="material-symbols-outlined font-bold text-xl">bolt</span> Fast Quote
                </a>
                <a className="text-slate-600 hover:text-navy-900 font-bold transition-colors text-base" href="#">Shipments</a>
                <a className="text-slate-600 hover:text-navy-900 font-bold transition-colors text-base" href="#">Tracking</a>
            </nav>
            <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-3 pr-6 border border-slate-200">
                    <img alt="User" className="w-11 h-11 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUk8vUSj15TLVv8ffPsHcq8k3SQ2skDlxJskRkZaKoTqiv4on8rvX_oZl9J_bQSJiPd4El-4OoUz0wDCbY4HEFidTFzNYFW39IZgmVDVoMTMgZaophPdQhalZ6wzAnMl0PQgH_PI3b8gey540AAawA0Zl0FATqnLj7gJOzYVCUZjSWoXlqWX1muTJ33Tf_08mDRlHHxGhBZg0aQopNUnAiyYf9U3Wn9-W1sQdH6Y8Q6-wEG_mO6eOiPm_Wi-zTgLWfImywNsxy05o2" />
                    <div className="hidden sm:block">
                        <p className="text-sm font-bold text-navy-900 leading-none">Senin C Simon</p>
                        <button className="text-xs font-bold text-coral uppercase tracking-tighter mt-1 hover:text-red-600 transition-colors text-left">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
