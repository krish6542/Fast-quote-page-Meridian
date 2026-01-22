import React from 'react';

const Footer = () => (
    <footer className="mt-20 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-[1050px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 font-bold text-base">© 2024 Meridian Logistics International</p>
            <div className="flex gap-10">
                <a className="text-slate-400 hover:text-navy-900 font-bold transition-colors text-base" href="#">Safety First</a>
                <a className="text-slate-400 hover:text-navy-900 font-bold transition-colors text-base" href="#">Global Network</a>
                <a className="text-slate-400 hover:text-navy-900 font-bold transition-colors text-base" href="#">Sustainability</a>
            </div>
        </div>
    </footer>
);

export default Footer;
