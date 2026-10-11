Runway

Make ₹10,000 last 30 days.

Runway is a decision tool for Gen Z money. It is built for students, interns and first-jobbers who live on a fixed ₹10,000 for a 30-day cycle. It is not an expense tracker. You test a decision before you make it, and you see exactly how it ripples through your balance, daily allowance, savings goals, 30-day forecast, financial risk and overall financial health.

The app is a single index.html file with a real-time 3D scene (Three.js) and a normal 2D interface around it.

Contents
Features
Quick start
How it works
The six Vitals
The financial engine
The simulator
The 3D scene
Using the app
Demo month
Architecture
Testing
Accessibility and performance
Browser support
Data and privacy
Customising the model
Troubleshooting
Limitations
Disclaimer
Features
One connected model. Income, balance, spending, commitments, subscriptions, savings goals, unexpected expenses, risk and health all feed one calculation. Changing one thing moves the others.
Decision simulator ("What if?"). Test a purchase, subscription change, BNPL split, habit change, income delay or stress test before committing. The preview matches the real result exactly once you commit.
3D Runway Terrain. Each day is a column whose height is your money. Past days are solid, today pulses, and future days are translucent forecasts with a range of likely outcomes.
Goal pillars, subscription orbit and risk atmosphere. Goals, subscriptions and risk level each have a 3D form that encodes real data.
Six live Vitals. Spendable balance, daily allowance, savings goals, 30-day forecast, financial risk and financial health, each with ▲▼ change chips.
Quick-add spending. Keypad, category chips, merchant shortcuts (Swiggy, Zomato, Rapido, Chai, Blinkit) and need / want / impulse tags.
Plan manager. Commitments and subscriptions, with usage meters and "simulate first" before any cancellation.
Undo, activity feed and Month Wrapped. Every committed change can be undone. Day 30 ends with a recap.
Insights. Ranked risk drivers, health sub-scores, and rule-based nudges ordered by rupee impact.
Fallbacks. A 2D SVG chart replaces the 3D scene if WebGL is unavailable, and a table view is available on demand.
Quick start
Download index.html.
Double-click it, or open it in a current browser.
Choose Load demo month to explore a populated 30-day cycle, or Start fresh to build your own plan.

No install, build step or server is required. The app loads Three.js and fonts from public CDNs, so you need an internet connection on first load.

To check the internals, open the browser console and run:

js
runSelfTests()
How it works

Runway follows one rule: there is a single source of truth.

A single state object holds your day, ledger, commitments, subscriptions, incomes, goals and safety net.
A pure function, derive(state), computes all six Vitals from that state. The interface never calculates or hard-codes a number.
A simulation is the same engine run on a copy of the state with a hypothetical decision applied. Committing applies that decision to the real state.

Because every number comes from the same function, the preview and the outcome cannot disagree.

The six Vitals
Vital	What it tells you	Where to see it
Spendable balance	Money in your wallet right now, with the total including locked pots shown alongside	Balance card, wallet segments in the terrain
Daily allowance	How much you can spend today and still stay on track	Allowance card, Plan line in the terrain
Savings goals	Whether each goal is on track by its deadline	Goals tab, goal pillars
30-day forecast	Likely wallet balance across the month, with a range	Forecast card, uncertainty shells
Financial risk (0–100)	How likely things go wrong ahead	Risk card, cliff days, atmosphere
Financial health (0–100)	How you are doing now	Health card, Insights sub-scores

Risk and health are different things. Health measures where you stand today. Risk measures how likely things are to go wrong in the coming weeks.

The financial engine

The engine is pure logic with no DOM access. All formulas are commented in the source.

Money model

Total cash = wallet (spendable) + locked pots (goals and safety net).

Goal contributions move money from the wallet into a pot. They are scheduled outflows, but they are not counted as spending.

Daily allowance
allowance = max(0, (wallet − unpaid scheduled outflows + confirmed income not yet received) / days left including today)

Scheduled outflows are commitments, subscription renewals and planned goal contributions through Day 30. Uncertain income is excluded.

Goals

For each goal, the engine projects the funded amount at its deadline from scheduled contributions and labels it On track, Tight or Off track. It also reports the shortfall and projected completion day.

Forecast

A seeded Monte Carlo simulation runs 500 times.

Seed: a fixed constant plus the current day. It never depends on the decision, so the baseline and any what-if use identical random draws.
Daily discretionary spend: log-normal around a base of 0.7 × trailing 7-day average + 0.3 × month-to-date average (₹150 if there is no history), multiplied by a weekday factor (Mon–Thu 0.9, Fri 1.1, Sat 1.25, Sun 1.15).
Shocks: a 4% daily chance of an unexpected expense between ₹250 and ₹1,500.
Income: uncertain income arrives with 60% probability.

Outputs include the median, 10th and 90th percentile wallet balance for each day, the chance of running dry before Day 30, the first dry-out day on the 10th-percentile path, the median end balance, and the plan path (the wallet if you spend exactly your allowance every day).

Risk score
risk = 100 × (0.40 × runDryChance
            + 0.15 × overspendPressure
            + 0.15 × commitmentLoad
            + 0.10 × cliffExposure
            + 0.10 × incomeDependency
            + 0.10 × safetyNetDepletion)

Each term is normalised to 0–1:

overspendPressure: trailing 7-day average spend against allowance.
commitmentLoad: unpaid scheduled outflows divided by wallet plus confirmed income.
cliffExposure: number of 3-day windows in the next 10 days where outflows exceed about 20% of the wallet, capped at 3, divided by 3.
incomeDependency: uncertain income divided by total expected income plus wallet.
safetyNetDepletion: 1 minus the safety-net balance divided by its target.
Score	Level
0–24	Low
25–49	Moderate
50–74	High
75–100	Critical

The top three drivers are shown, each with a plain-English explanation and a suggested fix.

Health score
health = Runway (25) + Discipline (25) + Commitments (20) + Savings momentum (20) + Resilience (10)

Each sub-score runs from 0 to 100 using documented piecewise-linear rules.

Runway: median end balance of ₹0 or less scores 0; ₹1,500 or more scores 100.
Discipline: share of past days within allowance, plus a streak bonus, minus a penalty for impulse purchases.
Commitments: committed share of the ₹10,000. 30% or less scores 100; 60% or more scores 0. Rarely used subscriptions count double.
Savings momentum: goal progress against expected pace.
Resilience: safety-net coverage.
Score	Grade
80+	Thriving
60–79	Steady
40–59	Wobbly
Below 40	Red zone
Rules of the world
Unexpected expenses hit the safety net first. You can override this. Any overflow hits the wallet, and the interface states exactly what absorbed what.
A spend larger than your wallet is blocked, and you choose one of three options: use the safety net, add an IOU (which creates a repayment commitment), or cancel.
Next day posts that day's scheduled items, shows an end-of-day recap (spent against allowance, streak, rollover), and prompts you to log any missed spending.
Uncertain income asks on its due day whether it was received, delayed (by a number of days) or fell through.
Past days are read-only. Future days show the forecast.
The simulator

Open What if? to test a decision. Each run shows the following, in this order.

Vitals before and after, with ▲▼ change chips.
Cause and effect chain. For example: Purchase ▸ Balance −₹2,499 ▸ Allowance −₹113 ▸ Runs dry Day 24 ▸ Risk +31 ▸ Trip fund off track ▸ Health −9. (Illustrative.)
Verdict: Safe, Tight, Risky or Not recommended, with a one-line reason.
Smarter alternatives. Two or three variants, such as waiting until income lands, splitting the purchase, or cancelling a rarely used subscription to offset it. Each variant is run through the engine and shows its own resulting Vitals.
Actions: Commit, Discard, or Compare A vs B.
Decision types
One-time purchase (amount, day, need or want)
Subscription add, cancel or pause
BNPL / EMI split into instalments, with a visible fee of about 3% so the cost of credit is shown
Habit change (plus or minus a percentage on remaining daily spend)
Goal contribution change
Income event (add, delay or fall through)
Unexpected-expense stress test
Splitting a social plan with friends
Presets
Preset	Expected verdict
Sneakers ₹2,499 today	Not recommended
Same sneakers in 3 BNPL parts	Tight
Cancel Netflix + Prime	Safe
Weekend trip ₹1,200 on Day 13	Tight
Phone screen cracks ₹1,800 on Day 14	Risky (safety net absorbs ₹1,000; wallet takes ₹800)
Freelance payment slips 10 days	Varies with your plan

The simulator re-runs as you move sliders, debounced to about 80 ms. Each run completes in under 50 ms.

Commit writes the decision to the activity feed, plays a transition, shows an Impact receipt with the six changes, and can be undone.

The 3D scene

The camera uses an elevated three-quarter view with damped orbit controls, clamped angles and zoom, a Reset view button, and a slow idle drift. The camera moves on its own only during onboarding.

Runway Terrain (hero). Thirty day-columns run along the X axis, with height representing money.
Each column is stacked: locked money at the base (safety net in amber, goal pots in violet), spendable wallet on top.
Past days are solid. Today pulses. Future days are translucent holograms at the median forecast, with a faint shell spanning the 10th to 90th percentile.
Column tops are coloured against plan: lime at or above plan, amber up to 15% below, coral more than 15% below or under ₹0.
A stepped Plan line shows the path of spending exactly your allowance each day.
A red floor marks ₹0. Where the forecast reaches it, a dry-out marker shows the day and the chance.
Bills, subscriptions and goal transfers appear as pins on their due days. Income appears as a coin fountain, with a dashed outline if it is uncertain.
Clusters of outflows appear as cliffs.
Goal pillars. A finish line beyond Day 30, with one pillar per goal. Height is the target, fill is the amount saved, a translucent cap shows projected funding at the deadline, and a flag marks the deadline.
Subscription orbit. Moons orbit a central hub, with radius proportional to monthly cost. Rarely used subscriptions look dusty. A tether links each moon to its renewal day. Cancelling makes the moon implode and shows "+₹199 kept".
Risk atmosphere. Fog, sky gradient, light colour and particle weather follow the risk level: clear lime at low risk, amber haze at moderate, coral storm with faint lightning at high and critical levels. Transitions take at least 600 ms and never obscure data.
Simulation ghost layer. While you simulate, a cyan hologram of the alternative future overlays the terrain, goal caps and orbit. Commit morphs the ghost into the real scene.
Vital linking. Hovering a Vital highlights its objects: Risk highlights cliff days, Goals highlights pillars, Forecast highlights uncertainty shells, Allowance highlights the Plan line, and Balance highlights the wallet segments.

Interaction: hover or tap a column for a tooltip. Click a column to glide the camera to it and open the Day Inspector.

Using the app
Desktop (1100px and wider)
Left: navigation rail
Centre: 3D canvas, with the Vitals bar overlaid at the top and a Day 1–30 timeline scrubber at the bottom (markers for bills and income, plus the Next day control)
Right: contextual panel (Day Inspector, Simulator, Goal, Subscription or Insight)
Mobile (narrower than 768px)
The canvas occupies the top 45% of the screen
Vitals appear as a snap-scrolling chip row
A draggable bottom sheet has three snap points
A bottom tab bar and a floating + button for quick-add
The canvas never traps page scrolling
Tabs
Home: Vitals, terrain, timeline and today's allowance
Plan: commitments and subscription manager
What if?: simulator
Goals: goal list and pillars
Insights: risk drivers, health sub-scores, nudges ranked by rupee impact (each with Simulate this), and Show me the math for every Vital
Core flows
Quick-add a spend (keypad, category, merchant, need / want / impulse tag, optional day)
Add or edit a commitment, subscription, income or goal
Cancel or pause a subscription (you are always offered "simulate first")
Next day, undo, and the activity feed (transactions and committed decisions together)
Onboarding

A skippable tour of about 20 seconds. The camera glides along the runway while three captions appear:

"Here's your ₹10,000."
"This much is already spoken for."
"This is what you can actually spend today."

Then choose Load demo month or Start fresh. A fresh start begins on Day 1 with an empty plan and a checklist to add income, commitments, subscriptions and goals.

Demo month

The demo is a fictional but realistic month. Day 1 is a Monday, and today is Day 9.

Opening cash: ₹10,000, of which ₹1,000 is the safety net and ₹400 is already saved for Concert tickets.
Days 1–8: about ₹960 of discretionary spending, plus a ₹400 metro pass and Spotify at ₹59.
Commitments: mobile recharge ₹299 (D12), gym ₹600 (D14), BNPL earbuds instalment ₹500 (D20), roommate WiFi and electricity share ₹350 (D25).
Subscriptions: Netflix ₹199 (D11, rarely used), Prime ₹299 (D22, used weekly), cloud storage ₹130 (D27, passive), Spotify ₹59 (daily, already paid this cycle).
Income: freelance payment ₹1,500 on D18, uncertain.
Goals: Concert tickets ₹1,500 by D28 (₹300 planned on D10, D17 and D24). Trip fund ₹1,000 by D30 (₹250 planned on D13, D20 and D27).

What you should see on load:

Spendable balance of about ₹7,100
Daily allowance of about ₹140–170
Both goals marked Tight
Risk Moderate (30–45)
Health Steady (60–70)
Two visible cliffs, on D12–14 and D20–22
Architecture

The code is organised in four layers. Each layer depends only on the layers before it.

engine   →   store   →   views (HTML UI)  +  scene (Three.js)
(pure)      (state,      (read store,         (read store,
            undo,        dispatch actions)    dispatch actions)
            storage)
Layer	Responsibility	DOM access
Engine	derive(state), simulation, forecast, risk, health. Pure functions.	None
Store	State, actions, undo stack, persistence to localStorage (with an in-memory fallback)	None
Views	HTML panels, Vitals bar, timeline, forms, feed	Yes
Scene	Three.js terrain, pillars, orbit, atmosphere, ghost layer	Canvas only

The engine never imports from the store, views or scene. Views and the scene never change state directly; they dispatch actions to the store.

Tech
Vanilla JavaScript in an inline <script type="module">. No frameworks and no build step.
Three.js r160 via import map, with OrbitControls, CSS2DRenderer, and an EffectComposer chain (RenderPass → UnrealBloomPass → OutputPass).
Google Fonts: Sora for headings and large numbers, Inter for body text. System fallbacks are included.
Money is formatted with Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).
Textures and glows are generated procedurally. There are no image assets.
Testing

Run this in the browser console:

js
runSelfTests()

It checks that:

The ledger sums match the balances.
simulate(noop) produces zero deltas.
simulate(decision).after equals derive(commit(decision)).
The forecast is deterministic for the same state and seed.

If a test fails, the console shows which check failed and its expected and actual values.

Manual smoke test
Load the demo month.
Log a ₹350 spend.
Run the Sneakers preset and watch the ghost layer.
Commit, then undo.
Cancel Netflix and watch the moon implode.
Run the screen-crack stress test. The safety net should absorb ₹1,000.
Advance with Next day through Day 30.
Check the Month Wrapped recap.
Accessibility and performance

Accessibility

WCAG AA contrast throughout
Full keyboard operation with visible focus indicators
aria-live announcements when Vitals change
prefers-reduced-motion is respected: no idle drift, shake or particles
Colour is never the only signal; every change also has a ▲▼ chip and a text label

Performance targets

60 fps on a mid-range laptop
30 fps or better on a mid-range phone
No console errors or warnings
Responsive from 360px to 1920px wide

Scene controls

"Low-power" mode turns off bloom and particles and sets pixel ratio to 1.
Pixel ratio is capped at 2.
The scene pauses when the tab is hidden.
Columns and shells are rendered with instanced meshes, and data changes tween the existing instances rather than rebuilding them.
If WebGL is unavailable, the app switches to a 2D SVG chart of the same data.
Browser support

Current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile. WebGL 2 is needed for the 3D scene. Without it, the SVG fallback is used.

Data and privacy
Demo and personal data stay on your device, in localStorage. If storage is blocked, the app keeps data in memory for the current session only.
The app makes no requests to a server for your data. It fetches Three.js, fonts and nothing else from public CDNs.
Clearing site data resets the app.
Customising the model

Model constants are grouped at the top of the engine file. Common ones to adjust:

Constant	Default	Effect
SEED_BASE	fixed constant	Base seed for the Monte Carlo runs
RUNS	500	Number of forecast simulations
SHOCK_CHANCE	0.04	Daily probability of an unexpected expense
INCOME_PROB	0.60	Chance uncertain income arrives
WEEKDAY_MULT	Mon–Thu 0.9, Fri 1.1, Sat 1.25, Sun 1.15	Spending by weekday
RISK_WEIGHTS	0.40 / 0.15 / 0.15 / 0.10 / 0.10 / 0.10	Weight of each risk term
HEALTH_WEIGHTS	25 / 25 / 20 / 20 / 10	Weight of each health sub-score
WALLET_TOTAL	10000	Monthly cash budget

Changing these shifts the seed story. After any change, run runSelfTests() and check the demo month figures above.

Troubleshooting

The 3D scene does not appear. Your browser may not support WebGL 2, or hardware acceleration may be off. The app should switch to the 2D chart automatically. Turn on hardware acceleration in your browser settings, or use the table view.

Fonts look like defaults. The Google Fonts request was blocked or failed. The app falls back to system fonts, and the layout still works.

Nothing changes after a spend. Check that the spend's day is not in the past, since past days are read-only.

The page is slow on a phone. Turn on Low-power mode from the settings menu.

My data disappeared. Browser storage may have been cleared, or the app is running in a private window that discards storage when closed.

runSelfTests() fails after a change. A constant or formula was edited without updating the expected values. Revert the change or update the expected values in the test file.

Limitations
Runway models your own month, using your inputs. It cannot see your real bank account.
The forecast is probabilistic. Results are ranges, not promises.
Spending categories and merchant shortcuts are examples. You define the categories you need.
Prices, risk weights and health thresholds are illustrative and should be tuned for your situation.
The app works on one device. It does not sync between devices.
Disclaimer

Runway is an educational planning tool. It is not financial advice, and it does not recommend specific financial products. Figures in the demo are fictional. For decisions with significant consequences, such as loans, large purchases or debt, speak with a qualified financial adviser.

Demo data stays on your device.
