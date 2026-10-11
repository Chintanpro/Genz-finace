import React, { useState, useEffect } from 'react';
import {
  ChemicalProperty,
  LiteratureArticle,
  ProteinTarget,
  searchPubChem,
  searchEuropePmc,
  searchUniProt,
  SAMPLE_CHEMICALS,
} from '../services/scienceApi';

interface ScienceLabScreenProps {
  onSimulateScientificExpense: (name: string, amount: number, category: string) => void;
  currentDay: number;
}

export const ScienceLabScreen: React.FC<ScienceLabScreenProps> = ({
  onSimulateScientificExpense,
  currentDay,
}) => {
  const [subTab, setSubTab] = useState<'chemistry' | 'literature' | 'proteins'>('chemistry');

  // Chemistry State
  const [chemQuery, setChemQuery] = useState('Aspirin');
  const [activeChem, setActiveChem] = useState<ChemicalProperty>(SAMPLE_CHEMICALS['aspirin']);
  const [chemLoading, setChemLoading] = useState(false);

  // Literature State
  const [litQuery, setLitQuery] = useState('AlphaFold');
  const [articles, setArticles] = useState<LiteratureArticle[]>([]);
  const [litLoading, setLitLoading] = useState(false);

  // Protein State
  const [proteinQuery, setProteinQuery] = useState('TP53');
  const [proteins, setProteins] = useState<ProteinTarget[]>([]);
  const [proteinLoading, setProteinLoading] = useState(false);

  // Load initial literature & protein data
  useEffect(() => {
    handleSearchLiterature('AlphaFold');
    handleSearchProtein('TP53');
  }, []);

  const handleSearchChem = async (name: string) => {
    setChemLoading(true);
    const res = await searchPubChem(name);
    setActiveChem(res);
    setChemLoading(false);
  };

  const handleSearchLiterature = async (query: string) => {
    setLitLoading(true);
    const res = await searchEuropePmc(query);
    setArticles(res);
    setLitLoading(false);
  };

  const handleSearchProtein = async (query: string) => {
    setProteinLoading(true);
    const res = await searchUniProt(query);
    setProteins(res);
    setProteinLoading(false);
  };

  return (
    <div
      role="tabpanel"
      id="panel-science-lab"
      aria-labelledby="tab-science-lab"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn"
    >
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#ffffff] p-5 rounded-xl border border-[#e0e2ec] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[10px] font-bold">
              LAB PROTOCOL 07 · SCIENCE SKILLS
            </span>
            <span className="text-[#47464e] font-body-sm text-[12px]">·</span>
            <span className="text-[#47464e] font-label-caps text-[10px]">
              DEEPMIND SCIENCE ENGINE
            </span>
          </div>
          <h1 className="font-headline-lg text-[26px] text-[#181c23] tracking-tight">
            Scientific Research & Lab Runway Suite
          </h1>
          <p className="font-body-md text-[13px] text-[#47464e] mt-1 max-w-2xl">
            Live public scientific databases integrated directly into your cashflow trajectory. Query
            small molecules on <span className="font-semibold text-[#181c23]">PubChem</span>, explore
            peer-reviewed literature on <span className="font-semibold text-[#181c23]">Europe PMC</span>,
            and inspect 3D structural targets on <span className="font-semibold text-[#181c23]">UniProt & AlphaFold</span>—then
            simulate how reagent purchases and research stipends impact your 30-day velocity envelope.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#dce1fc] text-[#141b2e] font-label-caps text-[10px] font-bold">
            DAY {currentDay} / 30 EXPEDITION
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-[#e0e2ec] pb-2">
        {[
          { id: 'chemistry', label: 'PubChem Chemistry & Lipinski Rules', icon: 'science' },
          { id: 'literature', label: 'Europe PMC Research Literature', icon: 'menu_book' },
          { id: 'proteins', label: 'UniProt & AlphaFold Protein Targets', icon: 'hub' },
        ].map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[13px] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#17173d] text-white font-bold shadow-xs'
                  : 'bg-[#ffffff] text-[#47464e] border border-[#e0e2ec] hover:text-[#181c23]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: Chemistry & Drug Discovery */}
      {subTab === 'chemistry' && (
        <div className="space-y-4">
          {/* Quick-try pills */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-[#ffffff] rounded-lg border border-[#e0e2ec]">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              QUICK-TRY COMPOUNDS:
            </span>
            {['Aspirin', 'Caffeine', 'Imatinib', 'Metformin'].map((pill) => (
              <button
                key={pill}
                onClick={() => {
                  setChemQuery(pill);
                  handleSearchChem(pill);
                }}
                className={`px-2.5 py-1 rounded font-label-caps text-[10px] cursor-pointer transition-colors ${
                  chemQuery.toLowerCase() === pill.toLowerCase()
                    ? 'bg-[#17173d] text-white font-bold'
                    : 'bg-[#f1f3fd] text-[#181c23] hover:bg-[#e0e2ec]'
                }`}
              >
                {pill}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <input
                type="text"
                value={chemQuery}
                onChange={(e) => setChemQuery(e.target.value)}
                placeholder="Search compound (e.g. Paracetamol)..."
                className="px-2.5 py-1 text-[12px] bg-[#f1f3fd] rounded border border-[#e0e2ec] outline-none w-48 text-[#181c23]"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchChem(chemQuery)}
              />
              <button
                onClick={() => handleSearchChem(chemQuery)}
                disabled={chemLoading}
                className="px-3 py-1 bg-[#17173d] text-white rounded font-label-caps text-[10px] font-bold hover:bg-[#000000] cursor-pointer"
              >
                {chemLoading ? 'FETCHING...' : 'QUERY'}
              </button>
            </div>
          </div>

          {/* Compound Details Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left: 2D Depiction & Identity (5 cols) */}
            <div className="lg:col-span-5 bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#e0e2ec] pb-2">
                <div>
                  <h3 className="font-headline-sm text-[20px] text-[#181c23] font-bold">
                    {activeChem.name}
                  </h3>
                  <span className="font-mono text-[11px] text-[#47464e]">
                    PubChem CID: {activeChem.CID}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[10px]">
                  {activeChem.MolecularFormula}
                </span>
              </div>

              {/* 2D Structure Canvas */}
              <div className="bg-[#f9f9ff] rounded-lg p-3 border border-[#e0e2ec] flex items-center justify-center min-h-[220px]">
                <img
                  src={activeChem.structurePngUrl}
                  alt={`${activeChem.name} 2D Structure`}
                  className="max-h-[200px] object-contain drop-shadow-sm"
                  onError={(e) => {
                    // Fallback visual container if external CDN has issues
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Canonical SMILES */}
              <div>
                <span className="font-label-caps text-[10px] text-[#47464e] block mb-1">
                  CANONICAL SMILES STRING
                </span>
                <div className="p-2.5 bg-[#f1f3fd] rounded font-mono text-[11px] text-[#17173d] break-all border border-[#e0e2ec]">
                  {activeChem.CanonicalSMILES}
                </div>
              </div>

              {/* Reagent Cost & Simulation Trigger */}
              <div className="p-3.5 bg-[#ebedf7] rounded-lg border border-[#c8c5cf] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[10px] text-[#47464e]">
                    STANDARD REAGENT REQUISITION
                  </span>
                  <span className="font-display-lg text-[20px] text-[#ba1a1a] font-bold tabular-numbers">
                    ₹{activeChem.labReagentCost.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() =>
                    onSimulateScientificExpense(
                      `Lab Reagent: ${activeChem.name}`,
                      activeChem.labReagentCost,
                      'SCIENCE · REAGENTS'
                    )
                  }
                  className="w-full py-2 rounded bg-[#17173d] text-white font-label-caps text-[10px] font-bold hover:bg-[#000000] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[15px]">send</span>
                  <span>SIMULATE REAGENT PURCHASE IN WHAT-IF LAB</span>
                </button>
              </div>
            </div>

            {/* Right: Physicochemical Properties & Lipinski / Veber Rules (7 cols) */}
            <div className="lg:col-span-7 bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#e0e2ec] pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#17173d] text-[20px]">
                    biotech
                  </span>
                  <h3 className="font-headline-sm text-[18px] text-[#181c23]">
                    Physicochemical Properties & Drug-Likeness
                  </h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded font-label-caps text-[10px] font-bold ${
                    activeChem.lipinskiPass
                      ? 'bg-[#a6e34b]/30 text-[#2c6b1e]'
                      : 'bg-[#ffdad6] text-[#93000a]'
                  }`}
                >
                  {activeChem.lipinskiPass ? 'LIPINSKI: PASS' : 'LIPINSKI: VIOLATION'}
                </span>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
                  <span className="font-label-caps text-[9px] text-[#47464e] block">
                    MOLECULAR WEIGHT
                  </span>
                  <span className="font-display-lg text-[20px] text-[#181c23] font-bold tabular-numbers">
                    {activeChem.MolecularWeight}{' '}
                    <span className="text-[11px] font-normal text-[#47464e]">Da</span>
                  </span>
                  <span className="text-[10px] text-[#47464e] block mt-0.5">
                    Threshold: ≤ 500 Da
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
                  <span className="font-label-caps text-[9px] text-[#47464e] block">
                    XLOGP (LIPOPHILICITY)
                  </span>
                  <span className="font-display-lg text-[20px] text-[#181c23] font-bold tabular-numbers">
                    {activeChem.XLogP ?? 'N/A'}
                  </span>
                  <span className="text-[10px] text-[#47464e] block mt-0.5">
                    Threshold: ≤ 5.0
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
                  <span className="font-label-caps text-[9px] text-[#47464e] block">
                    TPSA (POLAR SURFACE)
                  </span>
                  <span className="font-display-lg text-[20px] text-[#181c23] font-bold tabular-numbers">
                    {activeChem.TPSA}{' '}
                    <span className="text-[11px] font-normal text-[#47464e]">Å²</span>
                  </span>
                  <span className="text-[10px] text-[#47464e] block mt-0.5">
                    Veber Rule: ≤ 140 Å²
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
                  <span className="font-label-caps text-[9px] text-[#47464e] block">
                    H-BOND DONORS (HBD)
                  </span>
                  <span className="font-display-lg text-[20px] text-[#181c23] font-bold tabular-numbers">
                    {activeChem.HBondDonorCount}
                  </span>
                  <span className="text-[10px] text-[#47464e] block mt-0.5">
                    Threshold: ≤ 5
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
                  <span className="font-label-caps text-[9px] text-[#47464e] block">
                    H-BOND ACCEPTORS (HBA)
                  </span>
                  <span className="font-display-lg text-[20px] text-[#181c23] font-bold tabular-numbers">
                    {activeChem.HBondAcceptorCount}
                  </span>
                  <span className="text-[10px] text-[#47464e] block mt-0.5">
                    Threshold: ≤ 10
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
                  <span className="font-label-caps text-[9px] text-[#47464e] block">
                    ROTATABLE BONDS
                  </span>
                  <span className="font-display-lg text-[20px] text-[#181c23] font-bold tabular-numbers">
                    {activeChem.RotatableBondCount}
                  </span>
                  <span className="text-[10px] text-[#47464e] block mt-0.5">
                    Veber Rule: ≤ 10
                  </span>
                </div>
              </div>

              {/* Rule Interpretations */}
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-[#f1f3fd] rounded-lg border border-[#e0e2ec]">
                  <h4 className="font-label-caps text-[10px] text-[#181c23] font-bold mb-1">
                    LIPINSKI'S RULE OF FIVE EVALUATION
                  </h4>
                  <p className="font-body-sm text-[12px] text-[#47464e]">
                    {activeChem.lipinskiPass
                      ? 'Compliant with oral bioavailability guidelines. Molecule has standard molecular mass and permeation profile.'
                      : `Violations: ${activeChem.lipinskiViolations.join(', ')}`}
                  </p>
                </div>

                <div className="p-3 bg-[#f1f3fd] rounded-lg border border-[#e0e2ec]">
                  <h4 className="font-label-caps text-[10px] text-[#181c23] font-bold mb-1">
                    VEBER ORAL BIOAVAILABILITY ASSESSMENT
                  </h4>
                  <p className="font-body-sm text-[12px] text-[#47464e]">
                    {activeChem.veberPass
                      ? 'Conformational rigidity and polar surface area fall within optimal therapeutic window (Rotatable Bonds ≤ 10 & TPSA ≤ 140 Å²).'
                      : `Violations: ${activeChem.veberViolations.join(', ')}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Europe PMC Literature Scout */}
      {subTab === 'literature' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 p-3 bg-[#ffffff] rounded-lg border border-[#e0e2ec]">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              SEARCH BIOMEDICAL LITERATURE:
            </span>
            {['AlphaFold', 'CRISPR Cas9', 'Metabolic Economics', 'Cancer Immunotherapy'].map((pill) => (
              <button
                key={pill}
                onClick={() => {
                  setLitQuery(pill);
                  handleSearchLiterature(pill);
                }}
                className={`px-2.5 py-1 rounded font-label-caps text-[10px] cursor-pointer transition-colors ${
                  litQuery.toLowerCase() === pill.toLowerCase()
                    ? 'bg-[#17173d] text-white font-bold'
                    : 'bg-[#f1f3fd] text-[#181c23] hover:bg-[#e0e2ec]'
                }`}
              >
                {pill}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <input
                type="text"
                value={litQuery}
                onChange={(e) => setLitQuery(e.target.value)}
                placeholder="Search Europe PMC..."
                className="px-2.5 py-1 text-[12px] bg-[#f1f3fd] rounded border border-[#e0e2ec] outline-none w-48 text-[#181c23]"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchLiterature(litQuery)}
              />
              <button
                onClick={() => handleSearchLiterature(litQuery)}
                disabled={litLoading}
                className="px-3 py-1 bg-[#17173d] text-white rounded font-label-caps text-[10px] font-bold hover:bg-[#000000] cursor-pointer"
              >
                {litLoading ? 'SEARCHING...' : 'SEARCH'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-[#ffffff] rounded-xl p-4 border border-[#e0e2ec] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                        art.isOpenAccess
                          ? 'bg-[#a6e34b]/30 text-[#2c6b1e]'
                          : 'bg-[#ffdad6] text-[#93000a]'
                      }`}
                    >
                      {art.isOpenAccess ? 'OPEN ACCESS (FREE)' : 'SUBSCRIPTION / APC REQUIRED'}
                    </span>
                    <span className="font-label-caps text-[10px] text-[#47464e]">
                      {art.pubYear} · {art.journalTitle}
                    </span>
                  </div>

                  <h4 className="font-headline-sm text-[16px] text-[#181c23] mb-1 leading-snug">
                    {art.title}
                  </h4>

                  <p className="font-body-sm text-[11px] text-[#47464e] mb-3 line-clamp-2">
                    {art.authorString}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-[#47464e] mb-4">
                    <span className="flex items-center gap-1 font-semibold text-[#181c23]">
                      <span className="material-symbols-outlined text-[14px]">format_quote</span>
                      {art.citedByCount.toLocaleString('en-IN')} Citations
                    </span>
                    {art.doi && <span>DOI: {art.doi}</span>}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e0e2ec] flex items-center justify-between gap-2">
                  <a
                    href={art.europePmcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-[#17173d] hover:underline flex items-center gap-1"
                  >
                    <span>Read Record</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>

                  {art.apcCost > 0 && (
                    <button
                      onClick={() =>
                        onSimulateScientificExpense(
                          `Publication APC: ${art.journalTitle}`,
                          art.apcCost,
                          'SCIENCE · PUBLICATION'
                        )
                      }
                      className="px-2.5 py-1 rounded bg-[#ebedf7] hover:bg-[#e0e2ec] text-[#181c23] font-label-caps text-[9px] font-bold transition-colors cursor-pointer"
                    >
                      SIMULATE APC (-₹{art.apcCost})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: UniProt & AlphaFold Protein Scout */}
      {subTab === 'proteins' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 p-3 bg-[#ffffff] rounded-lg border border-[#e0e2ec]">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              SEARCH TARGET GENES / PROTEINS:
            </span>
            {['TP53', 'BRCA1', 'EGFR', 'INS', 'ABL1'].map((pill) => (
              <button
                key={pill}
                onClick={() => {
                  setProteinQuery(pill);
                  handleSearchProtein(pill);
                }}
                className={`px-2.5 py-1 rounded font-label-caps text-[10px] cursor-pointer transition-colors ${
                  proteinQuery.toUpperCase() === pill.toUpperCase()
                    ? 'bg-[#17173d] text-white font-bold'
                    : 'bg-[#f1f3fd] text-[#181c23] hover:bg-[#e0e2ec]'
                }`}
              >
                {pill}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <input
                type="text"
                value={proteinQuery}
                onChange={(e) => setProteinQuery(e.target.value)}
                placeholder="Gene / Protein (e.g. EGFR)..."
                className="px-2.5 py-1 text-[12px] bg-[#f1f3fd] rounded border border-[#e0e2ec] outline-none w-48 text-[#181c23]"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchProtein(proteinQuery)}
              />
              <button
                onClick={() => handleSearchProtein(proteinQuery)}
                disabled={proteinLoading}
                className="px-3 py-1 bg-[#17173d] text-white rounded font-label-caps text-[10px] font-bold hover:bg-[#000000] cursor-pointer"
              >
                {proteinLoading ? 'SEARCHING...' : 'QUERY'}
              </button>
            </div>
          </div>

          {/* AlphaFold Canonical pLDDT Rubric Banner */}
          <div className="p-3 bg-[#ffffff] rounded-xl border border-[#e0e2ec] shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#17173d] text-[20px]">
                architecture
              </span>
              <span className="font-label-caps text-[10px] text-[#181c23] font-bold">
                ALPHAFOLD pLDDT CONFIDENCE COLOR SCALE:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0053d6]" />
                Very High (&gt;90)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65cbf3]" />
                Confident (70–90)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffdb13]" />
                Low (50–70)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff7d45]" />
                Very Low (&lt;50)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proteins.map((prot) => (
              <div
                key={prot.primaryAccession}
                className="bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#cde5ff] text-[#001d32] font-label-caps text-[10px] font-bold">
                      {prot.geneName} · {prot.uniProtkbId}
                    </span>
                    <span className="font-mono text-[11px] text-[#47464e]">
                      {prot.primaryAccession}
                    </span>
                  </div>

                  <h4 className="font-headline-sm text-[18px] text-[#181c23] mb-1">
                    {prot.proteinName}
                  </h4>

                  <p className="font-body-sm text-[12px] text-[#47464e] mb-3">
                    Organism: <span className="text-[#181c23] font-medium">{prot.organism}</span> ·
                    Sequence length: <span className="text-[#181c23] font-medium">{prot.sequenceLength} aa</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e0e2ec] flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={prot.alphaFoldUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold text-[#17173d] hover:underline flex items-center gap-1"
                  >
                    <span>AlphaFold 3D Model</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>

                  <button
                    onClick={() =>
                      onSimulateScientificExpense(
                        `GPU Cluster Folding: ${prot.geneName}`,
                        prot.computeCost,
                        'SCIENCE · COMPUTE'
                      )
                    }
                    className="px-3 py-1.5 rounded bg-[#17173d] text-white font-label-caps text-[10px] font-bold hover:bg-[#000000] cursor-pointer"
                  >
                    SIMULATE CLOUD RUNWAY (-₹{prot.computeCost})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
