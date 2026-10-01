import React from 'react';
import { Search, Network, Sliders } from 'lucide-react';

export default function SearchPanel({ wallet, setWallet, chain, setChain, hops, setHops, onSearch, loading }) {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 p-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-center">
        {/* Wallet Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Paste Suspect Wallet Address (e.g., 0x28c6c062...)"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Chain & Hops Selectors */}
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            <option value="ETH">Ethereum (ETH)</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="TRX">TRON (TRX)</option>
          </select>

          <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
            <Sliders className="w-4 h-4 text-slate-400 mr-2" />
            <span className="text-xs text-slate-400 mr-2">Hops:</span>
            <select
              value={hops}
              onChange={(e) => setHops(Number(e.target.value))}
              className="bg-transparent text-white focus:outline-none font-bold"
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <button
            onClick={onSearch}
            disabled={loading}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all disabled:opacity-50"
          >
            {loading ? "Tracing..." : "Trace Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
}