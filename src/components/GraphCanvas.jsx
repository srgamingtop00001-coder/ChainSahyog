import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

export default function GraphCanvas({ elements, onNodeSelect }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !elements || elements.length === 0) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'color': '#ffffff',
            'font-size': '10px',
            'background-color': '#3b82f6',
            'text-valign': 'bottom',
            'text-margin-y': 5,
            'width': 35,
            'height': 35
          }
        },
        {
          selector: 'node[type="suspect"]',
          style: {
            'background-color': '#ef4444',
            'width': 45,
            'height': 45
          }
        },
        {
          selector: 'node[type="vasp"]',
          style: {
            'background-color': '#22c55e',
            'width': 50,
            'height': 50,
            'label': 'data(vasp_name)'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#64748b',
            'target-arrow-color': '#64748b',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '8px',
            'color': '#94a3b8'
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 30
      }
    });

    cy.on('tap', 'node', (evt) => {
      const nodeData = evt.target.data();
      if (onNodeSelect) onNodeSelect(nodeData);
    });

    return () => cy.destroy();
  }, [elements]);

  return (
    <div className="w-full h-full min-h-[450px] bg-slate-950 relative overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      {!elements || elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
          Enter a wallet address above to map transaction graph network
        </div>
      )}
    </div>
  );
}