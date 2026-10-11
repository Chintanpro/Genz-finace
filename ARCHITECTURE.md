# Banknote Studio — Architecture Specification

This document details the software architecture, state lifecycle, mathematical models, and performance engineering of Banknote Studio Runway Personal Cashflow Clearance.

---

## 1. System Architecture & Component Hierarchy

The application follows a unidirectional, reactive component hierarchy:

```
[index.html]
    │
    ▼
[main.tsx]
    │
    ▼
[App.tsx] (Root State Orchestrator, Error Boundary, Skip-Link)
    │
    ├── [Header.tsx] (Telemetry, Sound Toggle, Responsive Drawer)
    │
    ├── [Suspense Boundary + LoadingSkeleton.tsx]
    │       │
    │       ├── [WhatIfLab.tsx]
    │       │       ├── [TokenVaultMatrix.tsx] (3D Spatial 10x10 Stage)
    │       │       ├── [MitigationStrategies.tsx]
    │       │       ├── [ExperimentParameters.tsx]
    │       │       ├── [VerdictBanner.tsx]
    │       │       └── [ConsequenceBoard.tsx]
    │       │
    │       ├── [HomeDashboard.tsx] (Ledger Manifest, JSON/CSV Export)
    │       ├── [BillsScreen.tsx] (Pausable Subscription Ring-Fence)
    │       ├── [GoalsScreen.tsx] (Sinking Funds, SIP Sliders)
    │       ├── [HealthRiskScreen.tsx] (VRI & Shock Testing Engine)
    │       └── [ScienceLabScreen.tsx] (PubChem, Europe PMC, UniProt)
    │
    ├── [Footer.tsx] (Engine Calibration & Legal Seal)
    │
    └── [Dialog Overlays]
            ├── [JudgeModeModal.tsx] (Tribunal Audit & Cooldown Challenge)
            ├── [TimeMachineModal.tsx] (Temporal Day Scrubber)
            └── [MathDetailModal.tsx] (Mathematical Derivation Dialog)
```

---

## 2. Mathematical Modeling & Core Formulations

All calculations enforce zero-sum cash envelope arithmetic within the ₹10,000 baseline budget.

### 2.1 Daily Allowance Velocity Formula
Protects subsistence food, transit, and survival needs without defaulting on scheduled fixed bills:

$$\text{Daily Allowance} = \max\left(0, \left\lfloor \frac{\text{Closing Liquid Balance} - \sum \text{Upcoming Unpaused Bills}}{\max(1, 30 - \text{Execution Day})} \right\rfloor\right)$$

### 2.2 Zero-Runway Collapse Point Detection
Traces daily liquidity consumption through Day 30:

$$\text{Cash}_{d} = \text{Cash}_{d-1} - \text{Bills}_{d} - \text{Subsistence Burn} \quad (\text{where Subsistence Burn} = ₹120/\text{day})$$

$$\text{Collapse Day} = \min \{ d \in [\text{Execution Day}, 30] \mid \text{Cash}_{d} \le 0 \}$$

### 2.3 Volatility Risk Index (VRI)
Quantifies exposure to unforeseen emergencies:

$$\text{VRI} = \min\left(98, \max\left(38, 38 + \left\lfloor \frac{\text{Discretionary Expense}}{\text{Total Budget}} \times 175 \right\rfloor\right)\right)$$

### 2.4 Financial Health Index (FHI)
A weighted composite measuring runway velocity (40%), emergency buffer health (35%), and debt servicing discipline (25%):

$$\text{FHI} = \max\left(20, 72 - \left\lfloor \frac{\text{Discretionary Expense}}{\text{Total Budget}} \times 115 \right\rfloor\right)$$

---

## 3. Public Science APIs & Provenance Standards

All scientific queries leverage authoritative open-access REST APIs without synthetic hallucinations:

1. **PubChem PUG REST API**:
   - `GET https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{name}/property/MolecularFormula,MolecularWeight,CanonicalSMILES,XLogP,TPSA,HBondDonorCount,HBondAcceptorCount,RotatableBondCount/JSON`
   - Real-time Lipinski Rule of 5 and Veber rules analysis.
   - 2D PNG structure diagrams dynamically sourced from NCBI PUG REST.

2. **Europe PMC REST API**:
   - `GET https://www.ebi.ac.uk/europepmc/webservices/rest/search?query={query}&format=json&pageSize=6`
   - Real peer-reviewed papers and bioRxiv/medRxiv preprints with DOIs and citation statistics.

3. **UniProtKB REST API & AlphaFold DB**:
   - `GET https://rest.uniprot.org/uniprotkb/search?query={gene}&format=json&size=4`
   - Authoritative gene, organism, sequence length, and AlphaFold DB 3D structure links.

---

## 4. Performance & Bundle Budget

| Strategy | Implementation | Benefit |
| :--- | :--- | :--- |
| **Route Code Splitting** | `React.lazy` on all major views | Sub-150KB initial JS payload |
| **Vendor Chunking** | Rollup `manualChunks` isolating React & Lucide | Improved browser cache retention |
| **CSS Code Splitting** | `build.cssCodeSplit: true` | Eliminates unused view styling |
| **Synthesized Audio** | Web Audio API Oscillator | 0 KB external audio asset requests |
| **Render Throttling** | `requestAnimationFrame` and CSS 3D transforms | Consistent 60 FPS transitions |

---

## 5. Security & Persistence

- **Encrypted Local Ledger**: All budget modifications remain client-side in browser memory without third-party tracking.
- **Export Formats**: Standard RFC 4180 CSV and structured JSON reports.
