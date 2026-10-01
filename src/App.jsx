import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchPanel from './components/SearchPanel';
import GraphCanvas from './components/GraphCanvas';
import InspectorDrawer from './components/InspectorDrawer';

export default function App() {
  const [wallet, setWallet] = useState("0x28c6c06298d514db089934071355e5743bf21d60");
  const [chain, setChain] = useState("ETH");
  const [hops, setHops] = useState(3);
  const [loading, setLoading] = useState(false);
  const [traceResult, setTraceResult] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleSearch = async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/sahyog/trace-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: wallet, blockchain: chain, max_hops: hops })
      });
      const data = await response.json();
      setTraceResult(data);
    } catch (err) {
      console.error("API Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/sahyog/download-notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: wallet, blockchain: chain, max_hops: hops })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Section_91_Notice_${wallet.slice(0, 8)}.pdf`;
      a.click();
    } catch (err) {
      console.error("PDF Download failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <SearchPanel
        wallet={wallet}
        setWallet={setWallet}
        chain={chain}
        setChain={setChain}
        hops={hops}
        setHops={setHops}
        onSearch={handleSearch}
        loading={loading}
      />
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        <GraphCanvas
          elements={traceResult?.cytoscape_elements}
          onNodeSelect={(node) => setSelectedNode(node)}
        />
        <InspectorDrawer
          traceResult={traceResult}
          selectedNode={selectedNode}
          onDownloadPDF={handleDownloadPDF}
        />
      </div>
    </div>
  );
}