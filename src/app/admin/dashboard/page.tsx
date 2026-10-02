"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth/authContext";
import { db } from "@/lib/db/store";
import { Shield, Database, Activity, Zap, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const artifacts = db.getArtifacts();
  const artisans = db.getArtisans();
  const logs = db.getAuditLogs();

  const counts = {
    verified: artifacts.filter(a => a.verificationStatus === "VERIFIED").length,
    pending: artifacts.filter(a => ["NEEDS_REVIEW","IN_REVIEW"].includes(a.verificationStatus)).length,
    rejected: artifacts.filter(a => a.verificationStatus === "REJECTED").length,
    artisans: artisans.length,
  };

  const craftDist = [
    { name: "Lucknow Chikankari", pct: 62 },
    { name: "Banarasi Brocade", pct: 31 },
    { name: "Other Heritage", pct: 7 },
  ];

  const integrations = [
    { name: "Vakh Collaborative Network", status: "OPERATIONAL", latency: "43ms", uptime: "99.97%" },
    { name: "Gemini 3.8 Flash Vision", status: "OPERATIONAL", latency: "1.2s", uptime: "99.91%" },
    { name: "GI Registry Lookup", status: "OPERATIONAL", latency: "88ms", uptime: "99.99%" },
    { name: "Cooperative Escrow Ledger", status: "OPERATIONAL", latency: "61ms", uptime: "100%" },
  ];

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-blush">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-wine bg-blush px-2.5 py-0.5 rounded-full font-bold inline-block mb-2">Protocol Governance</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-burgundy">Admin Control Panel</h1>
              <p className="text-sm text-ink-muted mt-1">{user?.name} · {user?.title}</p>
            </div>
            <div className="flex items-center gap-2 bg-night text-ivory px-4 py-2.5 rounded-2xl shadow-md border border-gold/30">
              <Activity size={14} className="text-green-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold">All Systems Nominal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <CheckCircle2 size={18} className="text-emerald-600" />, label: "Verified Artifacts", val: counts.verified, sub: "On public registry" },
              { icon: <AlertCircle size={18} className="text-amber-600" />, label: "Under Review", val: counts.pending, sub: "Awaiting curator" },
              { icon: <Shield size={18} className="text-red-700" />, label: "Rejected / Flagged", val: counts.rejected, sub: "Counterfeit or insufficient" },
              { icon: <Database size={18} className="text-blue-700" />, label: "Registered Artisans", val: counts.artisans, sub: "Cooperative verified" },
            ].map(kpi => (
              <div key={kpi.label} className="bg-white border border-wine/15 rounded-2xl p-5 shadow-xs flex items-start gap-3">
                <div className="shrink-0 mt-0.5">{kpi.icon}</div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-ink-muted mb-1">{kpi.label}</p>
                  <p className="font-serif text-3xl text-burgundy font-normal">{kpi.val}</p>
                  <p className="text-[11px] text-olive mt-1">{kpi.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white border border-wine/15 rounded-2xl p-6 shadow-xs">
              <h3 className="font-serif text-xl font-semibold text-burgundy mb-5">Craft Distribution</h3>
              {craftDist.map(c => (
                <div key={c.name} className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">{c.name}</span>
                    <span className="font-mono font-bold text-olive">{c.pct}%</span>
                  </div>
                  <div className="w-full bg-blush/40 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-wine/70 rounded-full transition-all" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-wine/15 rounded-2xl p-6 shadow-xs">
              <h3 className="font-serif text-xl font-semibold text-burgundy mb-5">Integration Health</h3>
              <div className="space-y-3">
                {integrations.map(i => (
                  <div key={i.name} className="flex items-center justify-between py-2 border-b border-blush last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                      <span className="text-xs font-medium">{i.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono">
                      <span className="text-emerald-700 font-bold">{i.status}</span>
                      <span className="text-ink-muted">{i.latency}</span>
                      <span className="text-olive">{i.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-wine/15 rounded-2xl shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-blush flex items-center gap-2">
              <Zap size={15} className="text-wine" />
              <h3 className="font-serif text-xl font-semibold text-burgundy">Recent Audit Trail</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-ivory border-b border-blush">
                  <tr>
                    {["Timestamp", "Actor", "Role", "Action", "Entity"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono uppercase tracking-wider text-ink-muted text-[10px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.slice(0, 8).map(log => (
                    <tr key={log.id} className="border-b border-blush/50 hover:bg-ivory/50">
                      <td className="px-4 py-3 font-mono text-ink-muted">{new Date(log.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                      <td className="px-4 py-3 font-semibold text-ink">{log.actorName}</td>
                      <td className="px-4 py-3 capitalize text-ink-muted">{log.actorRole}</td>
                      <td className="px-4 py-3 font-mono text-wine font-bold">{log.action}</td>
                      <td className="px-4 py-3 font-mono text-olive">{log.entityId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}