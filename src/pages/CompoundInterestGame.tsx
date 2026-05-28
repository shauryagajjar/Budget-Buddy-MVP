import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Play, RotateCcw, TrendingUp, Wallet, Sparkles, Target, AlertTriangle, Gift, PiggyBank, Lightbulb, Trophy, Star, BookOpen, Crown, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface GameState {
  year: number;
  balance: number;
  totalInvested: number;
  totalInterest: number;
  monthlyHistory: { year: number; balance: number; interest: number }[];
  decisions: { year: number; event: string; choice: string; impact: number; isGood: boolean }[];
  currentEvent: GameEvent | null;
  gamePhase: "start" | "playing" | "event" | "result" | "end";
  investmentType: "index" | "fd" | "gold";
}

interface GameEvent {
  id: string;
  type: "save" | "investment" | "discipline" | "risk" | "bonus";
  title: string;
  description: string;
  options: { label: string; impact: number; isGood: boolean; description: string }[];
}

interface GameSettings {
  startingMoney: number;
  monthlySaving: number;
  returnRate: number;
  compoundingFrequency: "daily" | "monthly" | "yearly";
  duration: number;
}

const EVENTS: GameEvent[] = [
  { id: "festival", type: "save", title: "Festival Bonus! 🎉", description: "You received ₹1,000 as a festival gift from your family!",
    options: [
      { label: "Save Full Amount", impact: 1000, isGood: true, description: "Add ₹1,000 to your savings" },
      { label: "Save Half", impact: 500, isGood: true, description: "Add ₹500, spend ₹500" },
      { label: "Spend It All", impact: 0, isGood: false, description: "Enjoy now, save nothing" }
    ]},
  { id: "investment", type: "investment", title: "Investment Choice 📊", description: "It's time to decide where to put your money this year.",
    options: [
      { label: "Index Fund (8%)", impact: 8, isGood: true, description: "Higher returns, compounding yearly" },
      { label: "Fixed Deposit (6%)", impact: 6, isGood: true, description: "Safe but simple interest" },
      { label: "Gold (4%)", impact: 4, isGood: false, description: "Stable but lower growth" }
    ]},
  { id: "discipline", type: "discipline", title: "Savings Slip 😅", description: "Oops! You skipped saving for 2 months due to expenses.",
    options: [
      { label: "Adjust Budget & Continue", impact: 0, isGood: true, description: "No penalty, learn from it" },
      { label: "Ignore & Move On", impact: -400, isGood: false, description: "Lose 2 months of savings (₹400)" }
    ]},
  { id: "market_dip", type: "risk", title: "Market Dip! 📉", description: "The market temporarily drops by 5%. What do you do?",
    options: [
      { label: "Stay Invested", impact: 0, isGood: true, description: "Market recovers, no loss" },
      { label: "Panic Sell", impact: -5, isGood: false, description: "Lock in 5% loss permanently" }
    ]},
  { id: "freelance", type: "bonus", title: "Side Hustle Success! 💼", description: "You earned ₹2,000 from freelance work!",
    options: [
      { label: "Invest All", impact: 2000, isGood: true, description: "Grow your wealth faster" },
      { label: "Save Half", impact: 1000, isGood: true, description: "Balance saving and spending" },
      { label: "Spend It", impact: 0, isGood: false, description: "Treat yourself, save nothing" }
    ]},
  { id: "birthday", type: "save", title: "Birthday Money! 🎂", description: "You received ₹1,500 for your birthday!",
    options: [
      { label: "Invest It All", impact: 1500, isGood: true, description: "Add ₹1,500 to investments" },
      { label: "Save Some", impact: 750, isGood: true, description: "Save ₹750, spend ₹750" },
      { label: "Party Time", impact: 0, isGood: false, description: "Celebrate now, save later" }
    ]},
  { id: "expense", type: "discipline", title: "Unexpected Expense 🔧", description: "Your phone screen cracked! Repair costs ₹800.",
    options: [
      { label: "Use Emergency Fund", impact: -800, isGood: true, description: "Pay from savings (smart!)" },
      { label: "Skip This Month's Saving", impact: -200, isGood: false, description: "Delay investing, borrow rest" }
    ]},
  { id: "opportunity", type: "bonus", title: "Learning Opportunity 📚", description: "A ₹500 online course could boost your skills.",
    options: [
      { label: "Invest in Yourself", impact: -500, isGood: true, description: "Spend on learning (future gains!)" },
      { label: "Skip It", impact: 0, isGood: false, description: "Save money, miss opportunity" }
    ]},
  { id: "hot_tip", type: "risk", title: "Hot Stock Tip! 🔥", description: "A friend says a tiny crypto coin will '10x next month'. Will you bet?",
    options: [
      { label: "Stick to Your Plan", impact: 0, isGood: true, description: "Boring beats broke" },
      { label: "Gamble ₹500", impact: -500, isGood: false, description: "Coin tanks. Money gone." }
    ]},
  { id: "sip_upgrade", type: "investment", title: "SIP Upgrade Time 📈", description: "Your monthly income grew. Want to upgrade your SIP?",
    options: [
      { label: "Boost SIP by ₹500", impact: 500, isGood: true, description: "Compounding loves more fuel" },
      { label: "Keep It Same", impact: 0, isGood: true, description: "Steady is okay" },
      { label: "Reduce SIP", impact: -300, isGood: false, description: "More fun money, less future money" }
    ]},
  { id: "scam", type: "risk", title: "Scam Alert! ⚠️", description: "A WhatsApp message promises 'Double your money in 30 days, guaranteed!'",
    options: [
      { label: "Ignore & Report", impact: 0, isGood: true, description: "Smart move. There's no guarantee in investing." },
      { label: "Try with ₹1,000", impact: -1000, isGood: false, description: "It was a scam. Money lost." }
    ]},
  { id: "gift", type: "bonus", title: "Diwali Bonanza! 🪔", description: "Relatives gifted you ₹3,000 total this festival!",
    options: [
      { label: "Invest ₹2,500, Treat ₹500", impact: 2500, isGood: true, description: "Balance future + fun" },
      { label: "Invest All", impact: 3000, isGood: true, description: "Maximum compounding!" },
      { label: "Buy New Gadget", impact: -200, isGood: false, description: "Gadget value drops fast" }
    ]},
  { id: "friend_loan", type: "discipline", title: "Friend Needs ₹500 🤝", description: "Best friend asks to borrow ₹500. Promises to return next month.",
    options: [
      { label: "Lend, Note It Down", impact: -500, isGood: true, description: "Helping is good, tracking is smart" },
      { label: "Politely Decline", impact: 0, isGood: true, description: "Money + friendship safe" },
      { label: "Lend, Forget It", impact: -700, isGood: false, description: "Unspoken loans = lost money" }
    ]},
  { id: "subscription", type: "discipline", title: "Subscription Sneak 📺", description: "You found 3 unused subscriptions costing ₹600/year total.",
    options: [
      { label: "Cancel All Three", impact: 600, isGood: true, description: "Found money!" },
      { label: "Keep Just In Case", impact: -600, isGood: false, description: "Quiet money leak continues" }
    ]},
  { id: "market_boom", type: "risk", title: "Market Boom! 🚀", description: "Stocks surged 15%! Everyone is buying more.",
    options: [
      { label: "Stay the Course", impact: 3, isGood: true, description: "Keep investing your usual SIP" },
      { label: "Buy at the Peak", impact: -2, isGood: false, description: "Buy high, regret later" }
    ]},
  { id: "skill_paid_off", type: "bonus", title: "Skill Paid Off! 💪", description: "Your online course landed you a ₹4,000 project!",
    options: [
      { label: "Invest All", impact: 4000, isGood: true, description: "Snowball it" },
      { label: "Split 50/50", impact: 2000, isGood: true, description: "Half invest, half celebrate" },
      { label: "Lifestyle Upgrade", impact: 0, isGood: false, description: "New gadget = old habit" }
    ]},
  { id: "health", type: "save", title: "Health First 🏥", description: "A small fever needs ₹400 in medicine.",
    options: [
      { label: "Pay From Emergency Fund", impact: -400, isGood: true, description: "Exactly what it's for" },
      { label: "Skip Doctor, Save Money", impact: -800, isGood: false, description: "Got worse, cost more later" }
    ]},
  { id: "tax_save", type: "investment", title: "Tax-Save ELSS Option 🧾", description: "You can put ₹1,500 in an ELSS fund (3-year lock-in, ~12% growth).",
    options: [
      { label: "Invest ₹1,500", impact: 1500, isGood: true, description: "Tax-saver + equity growth" },
      { label: "Park in Savings", impact: 0, isGood: false, description: "Misses both tax & growth" }
    ]}
];

const SMART_TIPS = [
  "💡 Compounding needs time, not genius. Start early!",
  "💡 Staying invested beats timing the market.",
  "💡 Saving habits matter more than income at your age.",
  "💡 Panic selling destroys returns. Stay calm!",
  "💡 Rule of 72: Divide 72 by interest rate = years to double.",
  "💡 Small monthly savings grow huge with compounding.",
  "💡 Compound interest is interest on interest!",
  "💡 The earlier you start, the less you need to save.",
  "💡 Consistency beats perfection in investing.",
  "💡 Your money works while you sleep!",
  "💡 If it sounds too good to be true — it is.",
  "💡 Diversification: don't put all eggs in one basket.",
  "💡 Boring index funds beat exciting hot tips long-term.",
  "💡 Emergency fund FIRST, investing second.",
  "💡 Lifestyle inflation is the silent wealth killer."
];


// Glassmorphism card classes
const glass = "bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 shadow-2xl shadow-black/40";
const glassSoft = "bg-white/[0.03] backdrop-blur-lg border border-white/10";

const CompoundInterestGame = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<"default" | "custom" | "advanced">("default");
  const [settings, setSettings] = useState<GameSettings>({
    startingMoney: 500, monthlySaving: 200, returnRate: 8, compoundingFrequency: "monthly", duration: 10
  });

  const [gameState, setGameState] = useState<GameState>({
    year: 0, balance: 500, totalInvested: 500, totalInterest: 0,
    monthlyHistory: [{ year: 0, balance: 500, interest: 0 }],
    decisions: [], currentEvent: null, gamePhase: "start", investmentType: "index"
  });

  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [playthroughs, setPlaythroughs] = useState(0);
  const [savedGame, setSavedGame] = useState<{ state: GameState; settings: GameSettings; mode: typeof mode } | null>(null);

  // Load best score, playthroughs, and any in-progress save
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("simulator_history")
        .select("simulation_type, choices, outcome, created_at")
        .eq("user_id", user.id)
        .in("simulation_type", ["compound_adventure_save", "compound_adventure_final"])
        .order("created_at", { ascending: false });

      if (!data) return;
      const finals = data.filter((r) => r.simulation_type === "compound_adventure_final");
      const saves = data.filter((r) => r.simulation_type === "compound_adventure_save");
      setPlaythroughs(finals.length);
      if (finals.length) {
        const best = Math.max(...finals.map((r) => (r.outcome as any)?.balance ?? 0));
        setBestScore(best);
      }
      if (saves.length) {
        const latest = saves[0];
        const out = latest.outcome as any;
        if (out?.state && out.state.gamePhase !== "end") {
          setSavedGame({ state: out.state, settings: out.settings, mode: out.mode });
        }
      }
    })();
  }, [user]);

  const persistSave = async (state: GameState) => {
    if (!user) return;
    await supabase.from("simulator_history").insert({
      user_id: user.id,
      simulation_type: "compound_adventure_save",
      choices: { decisions: state.decisions } as any,
      outcome: { state, settings, mode } as any,
    });
  };

  const persistFinal = async (state: GameState) => {
    if (!user) return;
    await supabase.from("simulator_history").insert({
      user_id: user.id,
      simulation_type: "compound_adventure_final",
      choices: { decisions: state.decisions } as any,
      outcome: {
        balance: state.balance,
        totalInvested: state.totalInvested,
        totalInterest: Math.round(state.totalInterest),
        mistakes: state.decisions.filter((d) => !d.isGood).length,
        settings, mode,
      } as any,
    });
    setPlaythroughs((p) => p + 1);
    setBestScore((prev) => (prev === null ? state.balance : Math.max(prev, state.balance)));
  };

  const startGame = () => {
    const initial = mode === "custom" || mode === "advanced" ? settings.startingMoney : 500;
    setGameState({
      year: 1, balance: initial, totalInvested: initial, totalInterest: 0,
      monthlyHistory: [{ year: 0, balance: initial, interest: 0 }],
      decisions: [], currentEvent: null, gamePhase: "event", investmentType: "index"
    });
    triggerRandomEvent();
    setSavedGame(null);
  };

  const resumeGame = () => {
    if (!savedGame) return;
    setSettings(savedGame.settings);
    setMode(savedGame.mode);
    setGameState(savedGame.state);
    toast.success("Resumed your saved adventure!");
  };

  const triggerRandomEvent = () => {
    const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    setGameState(prev => ({ ...prev, currentEvent: randomEvent, gamePhase: "event" }));
  };

  const handleChoice = (option: { label: string; impact: number; isGood: boolean; description: string }) => {
    const monthlySaving = mode !== "default" ? settings.monthlySaving : 200;
    const returnRate = mode !== "default" ? settings.returnRate : 8;

    setGameState(prev => {
      let newBalance = prev.balance;
      let nextInvestmentType = prev.investmentType;

      if (prev.currentEvent?.type === "investment") {
        nextInvestmentType = option.label.includes("Index") ? "index" :
                              option.label.includes("Fixed") ? "fd" : "gold";
      } else if (prev.currentEvent?.type === "risk" && option.impact < 0) {
        newBalance = prev.balance * (1 + option.impact / 100);
      } else {
        newBalance = prev.balance + option.impact;
      }

      const yearlySavings = monthlySaving * 12;
      newBalance += yearlySavings;

      let interestRate = returnRate;
      if (nextInvestmentType === "fd") interestRate = 6;
      if (nextInvestmentType === "gold") interestRate = 4;

      const interestEarned = newBalance * (interestRate / 100);
      newBalance += interestEarned;

      const newHistory = [...prev.monthlyHistory, {
        year: prev.year, balance: Math.round(newBalance), interest: Math.round(interestEarned)
      }];
      const newDecisions = [...prev.decisions, {
        year: prev.year, event: prev.currentEvent?.title || "",
        choice: option.label, impact: option.impact, isGood: option.isGood
      }];

      return {
        ...prev,
        investmentType: nextInvestmentType,
        balance: Math.round(newBalance),
        totalInvested: prev.totalInvested + yearlySavings + (option.impact > 0 ? option.impact : 0),
        totalInterest: prev.totalInterest + interestEarned,
        monthlyHistory: newHistory,
        decisions: newDecisions,
        gamePhase: "result"
      };
    });

    setCurrentTip(SMART_TIPS[gameState.year % SMART_TIPS.length]);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 3000);
  };

  const nextYear = () => {
    const maxYears = mode === "advanced" ? settings.duration : 10;

    if (gameState.year >= maxYears) {
      const finalState = { ...gameState, gamePhase: "end" as const };
      setGameState(finalState);
      persistFinal(finalState);
    } else {
      const advanced = { ...gameState, year: gameState.year + 1, gamePhase: "event" as const };
      setGameState(advanced);
      persistSave(advanced); // auto-save progress per year
      triggerRandomEvent();
    }
  };

  const resetGame = () => {
    setGameState({
      year: 0, balance: settings.startingMoney, totalInvested: settings.startingMoney,
      totalInterest: 0,
      monthlyHistory: [{ year: 0, balance: settings.startingMoney, interest: 0 }],
      decisions: [], currentEvent: null, gamePhase: "start", investmentType: "index"
    });
  };

  const goodDecisions = gameState.decisions.filter(d => d.isGood);
  const badDecisions = gameState.decisions.filter(d => !d.isGood);
  const maxYears = mode === "advanced" ? settings.duration : 10;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#020617_50%,_#000_100%)] text-slate-100 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats banner */}
        {user && (bestScore !== null || savedGame) && gameState.gamePhase === "start" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`max-w-2xl mx-auto mb-6 rounded-2xl p-4 ${glassSoft} flex flex-wrap items-center justify-between gap-3`}>
            <div className="flex items-center gap-4 text-sm">
              {bestScore !== null && (
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-400" />
                  <span className="text-slate-300">Best:</span>
                  <span className="font-bold text-yellow-300">₹{bestScore.toLocaleString()}</span>
                </div>
              )}
              {playthroughs > 0 && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Trophy className="h-4 w-4 text-teal-300" /> {playthroughs} {playthroughs === 1 ? "run" : "runs"}
                </div>
              )}
            </div>
            {savedGame && (
              <Button size="sm" onClick={resumeGame} className="bg-teal-500/90 hover:bg-teal-400 text-slate-950 gap-2">
                <Save className="h-4 w-4" /> Resume Year {savedGame.state.year}
              </Button>
            )}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* START SCREEN */}
          {gameState.gamePhase === "start" && (
            <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4">
                  <Sparkles className="h-16 w-16 text-teal-300 drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]" />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                  Compound Interest Adventure
                </h1>
                <p className="text-xl text-slate-400">See how small decisions grow into big money over time.</p>
                {!user && (
                  <p className="mt-3 text-xs text-amber-300/80">Sign in to save your progress & track best scores.</p>
                )}
              </div>

              <Card className={`mb-8 ${glass}`}>
                <CardContent className="p-6">
                  <Tabs defaultValue="default" onValueChange={(v) => setMode(v as "default" | "custom" | "advanced")}>
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/5 border border-white/10">
                      <TabsTrigger value="default" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-200">Default</TabsTrigger>
                      <TabsTrigger value="custom" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-200">Custom</TabsTrigger>
                      <TabsTrigger value="advanced" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-200">Advanced</TabsTrigger>
                    </TabsList>

                    <TabsContent value="default">
                      <div className="space-y-3 text-left">
                        {[
                          ["Starting Money", "₹500"],
                          ["Monthly Saving", "₹200"],
                          ["Return Rate", "8% per year"],
                          ["Duration", "10 Years"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <span className="text-slate-300">{k}</span>
                            <span className="font-bold text-teal-300">{v}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="custom">
                      <div className="space-y-4 text-left">
                        <div>
                          <Label className="text-slate-300">Starting Money (₹)</Label>
                          <Input type="number" value={settings.startingMoney}
                            className="bg-white/5 border-white/10 text-slate-100"
                            onChange={(e) => setSettings({ ...settings, startingMoney: Number(e.target.value) })} />
                        </div>
                        <div>
                          <Label className="text-slate-300">Monthly Saving (₹)</Label>
                          <Input type="number" value={settings.monthlySaving}
                            className="bg-white/5 border-white/10 text-slate-100"
                            onChange={(e) => setSettings({ ...settings, monthlySaving: Number(e.target.value) })} />
                        </div>
                        <div>
                          <Label className="text-slate-300">Return Rate (%)</Label>
                          <Input type="number" value={settings.returnRate}
                            className="bg-white/5 border-white/10 text-slate-100"
                            onChange={(e) => setSettings({ ...settings, returnRate: Number(e.target.value) })} />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced">
                      <div className="space-y-4 text-left">
                        <div>
                          <Label className="text-slate-300">Starting Money (₹)</Label>
                          <Input type="number" value={settings.startingMoney}
                            className="bg-white/5 border-white/10 text-slate-100"
                            onChange={(e) => setSettings({ ...settings, startingMoney: Number(e.target.value) })} />
                        </div>
                        <div>
                          <Label className="text-slate-300">Monthly Saving (₹)</Label>
                          <Input type="number" value={settings.monthlySaving}
                            className="bg-white/5 border-white/10 text-slate-100"
                            onChange={(e) => setSettings({ ...settings, monthlySaving: Number(e.target.value) })} />
                        </div>
                        <div>
                          <Label className="text-slate-300">Return Rate (%)</Label>
                          <Input type="number" value={settings.returnRate}
                            className="bg-white/5 border-white/10 text-slate-100"
                            onChange={(e) => setSettings({ ...settings, returnRate: Number(e.target.value) })} />
                        </div>
                        <div>
                          <Label className="text-slate-300">Compounding Frequency</Label>
                          <Select value={settings.compoundingFrequency}
                            onValueChange={(v) => setSettings({ ...settings, compoundingFrequency: v as "daily" | "monthly" | "yearly" })}>
                            <SelectTrigger className="bg-white/5 border-white/10 text-slate-100"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-slate-300">Duration (5-20 years)</Label>
                          <Input type="number" min={5} max={20} value={settings.duration}
                            className="bg-white/5 border-white/10 text-slate-100"
                            onChange={(e) => setSettings({ ...settings, duration: Math.min(20, Math.max(5, Number(e.target.value))) })} />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={startGame} className="gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-semibold shadow-lg shadow-teal-500/30">
                  <Play className="h-5 w-5" /> Start Adventure
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowNotes(true)}
                  className="gap-2 bg-white/5 border-white/20 text-slate-200 hover:bg-white/10">
                  <BookOpen className="h-5 w-5" /> Learn First
                </Button>
              </div>
            </motion.div>
          )}

          {/* GAME PLAYING SCREEN */}
          {(gameState.gamePhase === "event" || gameState.gamePhase === "result") && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">Year {gameState.year} of {maxYears}</span>
                  <span className="text-sm text-slate-400">{Math.round((gameState.year / maxYears) * 100)}% Complete</span>
                </div>
                <Progress value={(gameState.year / maxYears) * 100} className="h-3 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className={`${glass} bg-gradient-to-br from-teal-500/30 to-cyan-500/20`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1"><Wallet className="h-4 w-4 text-teal-200" /><span className="text-sm text-teal-100/80">Balance</span></div>
                    <p className="text-2xl font-bold text-white">₹{gameState.balance.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className={glass}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1"><PiggyBank className="h-4 w-4 text-slate-400" /><span className="text-sm text-slate-400">Invested</span></div>
                    <p className="text-2xl font-bold">₹{gameState.totalInvested.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className={glass}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-emerald-400" /><span className="text-sm text-slate-400">Interest</span></div>
                    <p className="text-2xl font-bold text-emerald-300">₹{Math.round(gameState.totalInterest).toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className={glass}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-1"><Target className="h-4 w-4 text-slate-400" /><span className="text-sm text-slate-400">Type</span></div>
                    <p className="text-lg font-bold capitalize">{gameState.investmentType === "fd" ? "Fixed Deposit" : gameState.investmentType === "gold" ? "Gold" : "Index Fund"}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className={`mb-6 ${glass}`}>
                <CardHeader><CardTitle className="text-lg text-slate-100">Your Wealth Growth</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={gameState.monthlyHistory}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} stroke="#94a3b8" />
                      <Tooltip contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9" }} formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Balance']} />
                      <Area type="monotone" dataKey="balance" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {gameState.gamePhase === "event" && gameState.currentEvent && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card className={`${glass} border-teal-400/30`}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {gameState.currentEvent.type === "save" && <Gift className="h-6 w-6 text-emerald-400" />}
                        {gameState.currentEvent.type === "investment" && <TrendingUp className="h-6 w-6 text-cyan-400" />}
                        {gameState.currentEvent.type === "discipline" && <AlertTriangle className="h-6 w-6 text-amber-400" />}
                        {gameState.currentEvent.type === "risk" && <AlertTriangle className="h-6 w-6 text-rose-400" />}
                        {gameState.currentEvent.type === "bonus" && <Sparkles className="h-6 w-6 text-purple-400" />}
                        <CardTitle className="text-slate-100">{gameState.currentEvent.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg mb-6 text-slate-300">{gameState.currentEvent.description}</p>
                      <div className="grid gap-3">
                        {gameState.currentEvent.options.map((option, index) => (
                          <Button key={index} variant="outline"
                            className="h-auto p-4 flex flex-col items-start text-left bg-white/5 border-white/10 hover:bg-teal-500/10 hover:border-teal-400/40 text-slate-100"
                            onClick={() => handleChoice(option)}>
                            <span className="font-semibold">{option.label}</span>
                            <span className="text-sm text-slate-400">{option.description}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {gameState.gamePhase === "result" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className={`text-center ${glass}`}>
                    <CardContent className="p-8">
                      <div className="text-6xl mb-4">
                        {gameState.decisions[gameState.decisions.length - 1]?.isGood ? "🎉" : "📝"}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Year {gameState.year} Complete!</h3>
                      <p className="text-slate-400 mb-6">
                        Your balance is now <span className="text-teal-300 font-bold">₹{gameState.balance.toLocaleString()}</span>
                      </p>
                      <Button onClick={nextYear} size="lg" className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-semibold shadow-lg shadow-teal-500/30">
                        {gameState.year >= maxYears ? "See Final Results" : `Continue to Year ${gameState.year + 1}`}
                      </Button>
                      {user && <p className="text-xs text-slate-500 mt-3">✓ Progress auto-saved</p>}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              <AnimatePresence>
                {showTip && (
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xl border border-teal-400/30 text-teal-100 px-6 py-3 rounded-full shadow-2xl shadow-teal-500/20 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-teal-300" />
                    <span>{currentTip}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* END SCREEN */}
          {gameState.gamePhase === "end" && (
            <motion.div key="end" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: 2 }}>
                  <Trophy className="h-20 w-20 text-yellow-400 mx-auto mb-4 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
                </motion.div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-200 to-teal-200 bg-clip-text text-transparent">Adventure Complete! 🎉</h1>
                <p className="text-xl text-slate-400">Here's your financial journey report</p>
                {bestScore !== null && gameState.balance >= bestScore && (
                  <p className="mt-3 text-yellow-300 font-semibold">🏆 New Best Score!</p>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className={`${glass} bg-gradient-to-br from-teal-500/30 to-cyan-500/20`}>
                  <CardContent className="p-6 text-center">
                    <Wallet className="h-8 w-8 mx-auto mb-2 text-teal-200" />
                    <p className="text-sm text-teal-100/80">Final Balance</p>
                    <p className="text-3xl font-bold text-white">₹{gameState.balance.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className={glass}>
                  <CardContent className="p-6 text-center">
                    <PiggyBank className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-400">Total Invested</p>
                    <p className="text-3xl font-bold">₹{gameState.totalInvested.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className={`${glass} bg-gradient-to-br from-emerald-500/30 to-green-500/20`}>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-emerald-200" />
                    <p className="text-sm text-emerald-100/80">Interest Earned</p>
                    <p className="text-3xl font-bold text-white">₹{Math.round(gameState.totalInterest).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className={`mb-8 ${glass}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <Sparkles className="h-5 w-5 text-teal-300" /> The Power of Compounding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={gameState.monthlyHistory}>
                      <defs>
                        <linearGradient id="colorBalanceEnd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="year" stroke="#94a3b8" />
                      <YAxis tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} stroke="#94a3b8" />
                      <Tooltip contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9" }} formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Balance']} />
                      <Area type="monotone" dataKey="balance" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorBalanceEnd)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className={`${glass} border-emerald-400/30`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-300">
                      <Star className="h-5 w-5" /> Best Decisions ({goodDecisions.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {goodDecisions.length > 0 ? goodDecisions.map((d, i) => (
                        <div key={i} className="p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-lg text-sm text-slate-200">
                          <span className="font-medium">Year {d.year}:</span> {d.choice}
                        </div>
                      )) : <p className="text-slate-400">No particularly great decisions recorded</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${glass} border-rose-400/30`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-rose-300">
                      <AlertTriangle className="h-5 w-5" /> Learning Opportunities ({badDecisions.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {badDecisions.length > 0 ? badDecisions.map((d, i) => (
                        <div key={i} className="p-3 bg-rose-500/10 border border-rose-400/20 rounded-lg text-sm text-slate-200">
                          <span className="font-medium">Year {d.year}:</span> {d.choice}
                        </div>
                      )) : <p className="text-slate-400">Great job! You made smart choices!</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className={`${glass} bg-gradient-to-r from-teal-500/15 to-emerald-500/10 border-teal-400/30 mb-8`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="h-8 w-8 text-teal-300 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-teal-200 mb-2">Key Insight</h3>
                      <p className="text-slate-300">
                        You started with just ₹{(mode === "default" ? 500 : settings.startingMoney).toLocaleString()} and ended with ₹{gameState.balance.toLocaleString()}!
                        That's a <span className="font-bold text-teal-300">{((gameState.balance / (mode === "default" ? 500 : settings.startingMoney) - 1) * 100).toFixed(0)}% growth</span> through the power of compound interest.
                        {gameState.totalInterest > gameState.totalInvested * 0.3 && " Your money really worked for you!"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" onClick={resetGame} className="gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-semibold shadow-lg shadow-teal-500/30">
                  <RotateCcw className="h-5 w-5" /> Try Again
                </Button>
                <Button size="lg" variant="outline" onClick={() => { setMode("advanced"); resetGame(); }}
                  className="gap-2 bg-white/5 border-white/20 text-slate-200 hover:bg-white/10">
                  <TrendingUp className="h-5 w-5" /> Advanced Mode
                </Button>
                <Button size="lg" variant="outline" onClick={() => setShowNotes(true)}
                  className="gap-2 bg-white/5 border-white/20 text-slate-200 hover:bg-white/10">
                  <BookOpen className="h-5 w-5" /> Study Notes
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Dialog */}
        <Dialog open={showNotes} onOpenChange={setShowNotes}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-950/95 backdrop-blur-xl border border-white/10 text-slate-100">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2 text-slate-100">
                <BookOpen className="h-6 w-6 text-teal-300" /> Compound Interest Notes
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-bold text-teal-300 mb-2">1. What Is Compound Interest?</h3>
                <p className="text-slate-400">Compound interest is interest earned on the original money + the interest you already earned. Your money earns money, and that money earns more money.</p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-teal-300 mb-2">2. Why It Grows So Fast</h3>
                <p className="text-slate-400 mb-2">The key is compounding frequency: More compounding = faster growth.</p>
                <ul className="list-disc list-inside text-slate-400">
                  <li>Yearly compounding</li><li>Half-yearly compounding</li><li>Monthly compounding</li><li>Daily compounding</li>
                </ul>
              </section>
              <section>
                <h3 className="text-lg font-bold text-teal-300 mb-2">3. The Formula</h3>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg font-mono text-center text-teal-200">A = P(1 + r/n)^(n × t)</div>
                <ul className="mt-2 text-slate-400 list-disc list-inside">
                  <li>P = Principal (starting money)</li><li>r = Annual rate (as decimal)</li>
                  <li>n = Times interest applied per year</li><li>t = Time in years</li>
                </ul>
              </section>
              <section>
                <h3 className="text-lg font-bold text-teal-300 mb-2">4. Example</h3>
                <p className="text-slate-400">₹1,000 at 10% yearly for 5 years:</p>
                <ul className="list-disc list-inside text-slate-400">
                  <li>Simple Interest: ₹1,500</li><li>Compound Interest: ₹1,610</li>
                </ul>
                <p className="font-medium text-teal-300 mt-2">CI gives more growth!</p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-teal-300 mb-2">5. The Rule of 72</h3>
                <p className="text-slate-400">72 ÷ interest rate ≈ years required to double money.</p>
                <p className="font-medium text-teal-300">At 8% → 72/8 = 9 years to double!</p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-teal-300 mb-2">6. Why Start Early?</h3>
                <p className="text-slate-400">More time = more compounding = much higher final amount. The earlier you start, the less you need to save!</p>
              </section>
              <section>
                <h3 className="text-lg font-bold text-teal-300 mb-2">7. Monthly SIP + Compounding</h3>
                <p className="text-slate-400">Even small monthly savings like ₹200 grow huge with compounding over time. Consistency beats perfection!</p>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default CompoundInterestGame;
