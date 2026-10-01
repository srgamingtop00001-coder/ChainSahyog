import React from 'react';
import { Shield, Smartphone, Monitor } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <Shield className="w-8 h-8 text-blue-500" />
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide leading-none">CHAIN<span className="text-blue-500">Sahyog</span></h1>
          <p className="text-xs text-slate-400 mt-0.5">SIH26182 • MHA Cyber Intelligence Portal</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center space-x-2 bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-300">
        <Monitor className="w-3.5 h-3.5 text-green-400" />
        <span>Responsive Desktop & Mobile Mode Active</span>
      </div>
    </nav>
  );
}