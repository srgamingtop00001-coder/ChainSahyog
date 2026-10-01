import React from 'react';
import { FileText, Award, Building, Hash } from 'lucide-react';

export default function InspectorDrawer({ traceResult, selectedNode, onDownloadPDF }) {
  const vasp = traceResult?.attributed_vasp;

  return (
    <div className="w-full md:w-96 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto">
      <div>
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Attribution & Inspection Panel</h2>
        
        {/* VASP Summary Card */}
        {vasp ? (
          <div className="bg-slate-950 border border-green-500/30 rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                VASP Matched
              </span>
              <span className="text-xs text-slate-400">Hop Distance: {vasp.path_distance_hops}</span>
            </div>
            
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-green-400" />
              {vasp.vasp_name}
            </h3>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-xs text-slate-400">Confidence Score:</span>
              <span className="text-xl font-extrabold text-green-400">{vasp.confidence_score}%</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-500" 
                style={{ width: `${vasp.confidence_score}%` }} 
              />
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center text-xs text-slate-400 mb-5">
            No direct VASP matched yet. Try increasing Hop Depth.
          </div>
        )}

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase">Selected Node</h4>
            <div>
              <p className="text-xs text-slate-500">Address Hash:</p>
              <p className="text-xs text-slate-200 font-mono break-all">{selectedNode.full_address}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Node Classification:</p>
              <p className="text-xs text-blue-400 capitalize">{selectedNode.type}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5">
        <button
          onClick={onDownloadPDF}
          disabled={!vasp}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-40 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-green-900/20"
        >
          <FileText className="w-4 h-4" />
          Export Sec 91 CrPC PDF Notice
        </button>
      </div>
    </div>
  );
}