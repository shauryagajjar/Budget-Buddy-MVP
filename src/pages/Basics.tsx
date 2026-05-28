import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, TrendingUp, PiggyBank, Calculator, Target, Shield, CheckCircle, XCircle, Zap, Clock, Wallet, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const Basics = () => {
  const topics = [
    {
      icon: Calculator,
      title: "Budgeting",
      tagline: "Tell your money where to go",
      readTime: "4 min read",
      color: "from-blue-500 to-cyan-500",
      content: `Budgeting means deciding how to use your money BEFORE you spend it. It's a plan, not a restriction.

━━━━━━━━━━━━━━━━━━━━━━
THE 50/30/20 RULE (Student Version)
━━━━━━━━━━━━━━━━━━━━━━
• 50% Needs — food, books, transport, data pack
• 30% Wants — games, snacks, outings, subscriptions
• 20% Savings — for goals & emergencies

━━━━━━━━━━━━━━━━━━━━━━
REAL EXAMPLE: ₹2,000 Pocket Money
━━━━━━━━━━━━━━━━━━━━━━
• Needs (₹1,000): bus pass ₹400, lunch ₹400, stationery ₹200
• Wants (₹600): movie ₹200, snacks ₹250, game pass ₹150
• Savings (₹400): bank account or piggy bank

━━━━━━━━━━━━━━━━━━━━━━
THE 3 BUDGETING METHODS
━━━━━━━━━━━━━━━━━━━━━━
1. Envelope Method — cash in labeled envelopes (great for beginners)
2. Zero-Based — every rupee gets a job, total = ₹0 left
3. Pay Yourself First — savings goes out first, spend the rest

━━━━━━━━━━━━━━━━━━━━━━
WHY IT MATTERS
━━━━━━━━━━━━━━━━━━━━━━
✓ You stop running out by month-end
✓ You stay in control instead of guilty
✓ Impulse buys drop by 60-70%
✓ You see exactly where money leaks

━━━━━━━━━━━━━━━━━━━━━━
3 STUDENT MISTAKES
━━━━━━━━━━━━━━━━━━━━━━
✗ Forgetting small daily expenses (₹30 chips × 30 days = ₹900)
✗ Not having a "fun" category (leads to overspending later)
✗ Giving up after one bad week — restart, don't quit`
    },
    {
      icon: PiggyBank,
      title: "Saving",
      tagline: "Small jars build big rivers",
      readTime: "3 min read",
      color: "from-green-500 to-emerald-500",
      content: `Saving = keeping money aside for the future. Even ₹20/day adds up to ₹7,300 a year.

━━━━━━━━━━━━━━━━━━━━━━
THE 3 BUCKETS OF SAVING
━━━━━━━━━━━━━━━━━━━━━━
1. Emergency Bucket — sudden problems (phone repair, medical)
   Target: 1-2 months of your expenses
2. Goal Bucket — laptop, bike, gift, trip
   Target: ₹5,000 - ₹50,000
3. Future Bucket — long-term wealth (don't touch!)
   Target: invest this in SIPs / mutual funds

━━━━━━━━━━━━━━━━━━━━━━
SAVE-FIRST FORMULA
━━━━━━━━━━━━━━━━━━━━━━
Income → Save First → Spend What's Left
(NOT: Income → Spend → Save what's left = usually ₹0)

━━━━━━━━━━━━━━━━━━━━━━
TINY HABITS THAT WORK
━━━━━━━━━━━━━━━━━━━━━━
✓ Save every ₹10 coin you get
✓ Round-up trick: spend ₹47 → save ₹3
✓ "No-spend" Sundays once a month
✓ Wait 24 hours before buying anything ₹500+
✓ Auto-transfer ₹100/week to a separate account

━━━━━━━━━━━━━━━━━━━━━━
NUMBERS THAT MOTIVATE
━━━━━━━━━━━━━━━━━━━━━━
₹50/day saved for 1 year = ₹18,250
₹50/day for 5 years at 8% = ₹1,12,000
₹50/day for 10 years at 8% = ₹2,79,000

Small drops, big bucket.`
    },
    {
      icon: TrendingUp,
      title: "Simple vs Compound Interest",
      tagline: "The most important formula of your life",
      readTime: "5 min read",
      color: "from-purple-500 to-pink-500",
      content: `━━━━━━━━━━━━━━━━━━━━━━
SIMPLE INTEREST (SI)
━━━━━━━━━━━━━━━━━━━━━━
Formula: SI = (P × R × T) / 100
You earn interest only on the original amount.

Example: ₹1,000 at 10% for 3 years
Year 1: ₹100 → total ₹1,100
Year 2: ₹100 → total ₹1,200
Year 3: ₹100 → total ₹1,300
Total interest = ₹300 (same every year)

━━━━━━━━━━━━━━━━━━━━━━
COMPOUND INTEREST (CI)
━━━━━━━━━━━━━━━━━━━━━━
Formula: A = P × (1 + R/100)^T
You earn interest on interest too.

Example: ₹1,000 at 10% for 3 years
Year 1: ₹100 → total ₹1,100
Year 2: ₹110 → total ₹1,210
Year 3: ₹121 → total ₹1,331
Total interest = ₹331 (grows every year)

━━━━━━━━━━━━━━━━━━━━━━
LONG-TERM SHOCK
━━━━━━━━━━━━━━━━━━━━━━
₹10,000 at 10% for 30 years:
• Simple Interest = ₹40,000
• Compound Interest = ₹1,74,494
Difference = ₹1,34,494 (4x more!)

━━━━━━━━━━━━━━━━━━━━━━
RULE OF 72 (memorize this!)
━━━━━━━━━━━━━━━━━━━━━━
Years to double money = 72 ÷ Interest Rate
At 8% → 9 years to double
At 12% → 6 years to double
At 6% → 12 years to double

━━━━━━━━━━━━━━━━━━━━━━
WHERE EACH ONE LIVES
━━━━━━━━━━━━━━━━━━━━━━
Simple Interest: car loans, some bonds, basic FDs
Compound Interest: savings accounts, mutual funds, SIPs, credit cards (the bad kind!)`
    },
    {
      icon: Target,
      title: "What is SIP",
      tagline: "Auto-invest your future",
      readTime: "4 min read",
      color: "from-orange-500 to-red-500",
      content: `SIP = Systematic Investment Plan. You invest a small fixed amount every month — automatically.

━━━━━━━━━━━━━━━━━━━━━━
WHY SIP IS PERFECT FOR STUDENTS
━━━━━━━━━━━━━━━━━━━━━━
✓ Start with just ₹100-500/month
✓ Auto-deducted, no temptation to skip
✓ Builds discipline like brushing teeth
✓ Works with the compounding magic
✓ No need to "time" the market

━━━━━━━━━━━━━━━━━━━━━━
RUPEE COST AVERAGING (the trick)
━━━━━━━━━━━━━━━━━━━━━━
Same ₹500 buys:
• 50 units when price is ₹10
• 25 units when price is ₹20
You auto-buy MORE when cheap, LESS when expensive.

━━━━━━━━━━━━━━━━━━━━━━
₹500/month SIP at 12% returns
━━━━━━━━━━━━━━━━━━━━━━
After 5 yrs: ₹41,000 (invested ₹30,000)
After 10 yrs: ₹1,16,000 (invested ₹60,000)
After 20 yrs: ₹4,99,000 (invested ₹1,20,000)
After 30 yrs: ₹17,64,000 (invested ₹1,80,000)

Notice: your money is doing the heavy lifting!

━━━━━━━━━━━━━━━━━━━━━━
HOW TO START (legally, at 18)
━━━━━━━━━━━━━━━━━━━━━━
1. Open a Demat + KYC account
2. Pick an Index Fund (Nifty 50 / Sensex)
3. Set up monthly auto-debit
4. Don't check daily. Check yearly.
5. Increase by 10% each year as income grows

Before 18: practice with our virtual simulator + watch your parents do it.`
    },
    {
      icon: TrendingUp,
      title: "What are Mutual Funds?",
      tagline: "Many investors, one expert team",
      readTime: "4 min read",
      color: "from-indigo-500 to-blue-500",
      content: `A Mutual Fund pools money from thousands of people. A professional manager invests it in stocks, bonds, gold, etc. You get a tiny slice of everything.

━━━━━━━━━━━━━━━━━━━━━━
SIMPLE PIZZA ANALOGY
━━━━━━━━━━━━━━━━━━━━━━
You can't afford a whole pizza (a Reliance share = ₹3,000+).
But you & 100 friends pool ₹50 each → buy 1 pizza → everyone gets a slice.
A mutual fund = the pizza-buying group. You own slices of MANY companies.

━━━━━━━━━━━━━━━━━━━━━━
4 MAIN TYPES
━━━━━━━━━━━━━━━━━━━━━━
1. Equity Funds — invest in stocks
   Risk: High | Returns: 12-15% | Best for: 5+ years
2. Debt Funds — invest in bonds
   Risk: Low | Returns: 6-8% | Best for: 2-3 years
3. Hybrid Funds — mix of both
   Risk: Medium | Returns: 8-10% | Best for: 3-5 years
4. Index Funds — copy Nifty/Sensex
   Risk: Medium | Returns: ~market | Best for: lazy long-term investors

━━━━━━━━━━━━━━━━━━━━━━
WHY BEGINNERS LOVE THEM
━━━━━━━━━━━━━━━━━━━━━━
✓ Experts handle research
✓ Diversified automatically
✓ Start with ₹100
✓ Withdraw anytime (most funds)
✓ Transparent — see every holding online

━━━━━━━━━━━━━━━━━━━━━━
HIDDEN COST: EXPENSE RATIO
━━━━━━━━━━━━━━━━━━━━━━
Funds charge 0.1% - 2.5% per year.
Lower = better. Index funds have the lowest.
1% extra fee over 30 years can cost you LAKHS.`
    },
    {
      icon: Shield,
      title: "Risk & Diversification",
      tagline: "Don't put all eggs in one basket",
      readTime: "4 min read",
      color: "from-teal-500 to-cyan-500",
      content: `Risk = chance your money loses value or doesn't grow as expected.
Diversification = spreading money across different things so one loss doesn't sink you.

━━━━━━━━━━━━━━━━━━━━━━
5 TYPES OF RISK
━━━━━━━━━━━━━━━━━━━━━━
1. Market Risk — whole market falls (COVID 2020: -40%)
2. Inflation Risk — money loses buying power
3. Company Risk — one company crashes (Yes Bank: -90%)
4. Liquidity Risk — can't sell quickly (real estate)
5. Interest Rate Risk — rates change, bond values shift

━━━━━━━━━━━━━━━━━━━━━━
RISK LADDER
━━━━━━━━━━━━━━━━━━━━━━
Safe ──→ Risky
Savings → FD → Debt Fund → Gold → Hybrid → Index → Stocks → Crypto
3%    7%    8%        9%      10%     12%     15%     ???

━━━━━━━━━━━━━━━━━━━━━━
SAMPLE STUDENT PORTFOLIO
━━━━━━━━━━━━━━━━━━━━━━
• 40% Index Fund (growth engine)
• 25% Debt Fund (stability)
• 15% Gold (inflation hedge)
• 10% FD (emergency)
• 10% Cash (daily expenses)

If stocks crash 30%, your total portfolio only drops ~12%. THAT'S diversification.

━━━━━━━━━━━━━━━━━━━━━━
GOLDEN RULES
━━━━━━━━━━━━━━━━━━━━━━
✓ Never invest money you'll need in 1 year in stocks
✓ Hold equity for 5+ years to smooth out crashes
✓ More time = less risk
✓ Higher reward always = higher risk (no free lunch)
✓ Boring is beautiful in investing`
    },
    {
      icon: CheckCircle,
      title: "Good Money Habits",
      tagline: "Your future self will thank you",
      readTime: "3 min read",
      color: "from-green-500 to-teal-500",
      content: `Habits beat motivation. Build these early and money becomes easy.

━━━━━━━━━━━━━━━━━━━━━━
THE DAILY 5
━━━━━━━━━━━━━━━━━━━━━━
✓ Track every rupee (app or notebook)
✓ Save FIRST when you receive money
✓ Use cash for small things — feel the pain
✓ Wait 24 hours on any want
✓ Read 1 finance article weekly

━━━━━━━━━━━━━━━━━━━━━━
THE MONTHLY 5
━━━━━━━━━━━━━━━━━━━━━━
✓ Review where money went
✓ Move savings to a separate account
✓ Set 1 small goal (₹500 - ₹5,000)
✓ Cancel 1 unused subscription
✓ Learn 1 new finance concept

━━━━━━━━━━━━━━━━━━━━━━
THE YEARLY 5
━━━━━━━━━━━━━━━━━━━━━━
✓ Increase savings rate by 5-10%
✓ Open/grow your investment account
✓ Build/refresh emergency fund
✓ Set a 1-year + 5-year money goal
✓ Teach a friend or sibling something new

━━━━━━━━━━━━━━━━━━━━━━
HABIT STACK EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━
"After I check Instagram in the morning, I'll log yesterday's spending."
Link new habits to existing ones — they stick 10x better.`
    },
    {
      icon: XCircle,
      title: "Common Money Mistakes",
      tagline: "Learn these before you make them",
      readTime: "4 min read",
      color: "from-red-500 to-orange-500",
      content: `Most adults regret these. You have the chance to skip them entirely.

━━━━━━━━━━━━━━━━━━━━━━
TOP 10 STUDENT MONEY MISTAKES
━━━━━━━━━━━━━━━━━━━━━━
1. ✗ Spending pocket money in the first week
2. ✗ Copying friends' purchases (peer pressure tax)
3. ✗ Buying things to "look cool" on social media
4. ✗ Not saving because "amount is too small"
5. ✗ Borrowing small amounts repeatedly from friends
6. ✗ Thinking investing is "only for adults/rich"
7. ✗ Taking BNPL (Buy Now Pay Later) for snacks
8. ✗ Paying full price without checking discounts
9. ✗ Auto-renewing subscriptions you forgot about
10. ✗ Keeping all money in savings (inflation eats it)

━━━━━━━━━━━━━━━━━━━━━━
EXPENSIVE MYTHS
━━━━━━━━━━━━━━━━━━━━━━
✗ "I'll start saving when I earn more" → No, you won't
✗ "₹100 doesn't matter" → ₹100/day × 10 yrs = ₹3.6 lakh
✗ "Investing is gambling" → it's the OPPOSITE of gambling
✗ "I'll learn finance later" → later costs you compound years

━━━━━━━━━━━━━━━━━━━━━━
RECOVERY MOVES
━━━━━━━━━━━━━━━━━━━━━━
Made a mistake? Try this:
1. Don't shame yourself — pause
2. Write what went wrong in 1 line
3. Set a small "fix it" goal this week
4. Restart the habit, don't restart your life

The only real mistake is not learning from one.`
    },
    {
      icon: Zap,
      title: "How Compound Interest Really Works",
      tagline: "The 8th wonder of the world",
      readTime: "6 min read",
      color: "from-yellow-500 to-orange-500",
      content: `Albert Einstein supposedly called compounding "the 8th wonder of the world."
"Those who understand it, earn it. Those who don't, pay it."

━━━━━━━━━━━━━━━━━━━━━━
HOW IT REALLY WORKS
━━━━━━━━━━━━━━━━━━━━━━
Year 1: you earn interest on YOUR money
Year 2: you earn interest on (your money + last year's interest)
Year 3: you earn interest on (everything so far)
...interest snowballs.

━━━━━━━━━━━━━━━━━━━━━━
₹1,000 at 10% — watch it grow
━━━━━━━━━━━━━━━━━━━━━━
Year 1: ₹1,100
Year 5: ₹1,610
Year 10: ₹2,594
Year 20: ₹6,727
Year 30: ₹17,449
Year 40: ₹45,259
Year 50: ₹1,17,390

Same ₹1,000. Just time + compounding.

━━━━━━━━━━━━━━━━━━━━━━
THE 3 PHASES
━━━━━━━━━━━━━━━━━━━━━━
Years 0-10: Slow — you'll want to quit. DON'T.
Years 10-20: Visible — wealth starts showing.
Years 20+: Explosive — money outgrows your effort.

━━━━━━━━━━━━━━━━━━━━━━
EARLY-STARTER WINS BIG
━━━━━━━━━━━━━━━━━━━━━━
PERSON A: invests ₹2,000/mo from age 15 to 25, STOPS
   → at age 60: ₹3.7 crore

PERSON B: invests ₹2,000/mo from age 25 to 60 (35 yrs)
   → at age 60: ₹1.7 crore

Person A invested 10 years. Person B invested 35 years.
A wins by ₹2 crore. Because A started 10 years earlier.

━━━━━━━━━━━━━━━━━━━━━━
THE DARK SIDE
━━━━━━━━━━━━━━━━━━━━━━
Compounding works against you with debt!
Credit card at 36% APR:
Borrow ₹10,000 → owe ₹13,600 after 1 year
                → owe ₹47,069 after 5 years

Avoid high-interest debt at all costs.

━━━━━━━━━━━━━━━━━━━━━━
TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━
Time > Amount > Rate
Start now, even tiny. Time is the unfair advantage students have over adults.`
    },
    {
      icon: Clock,
      title: "The Power of Starting Early",
      tagline: "Time beats talent in money",
      readTime: "4 min read",
      color: "from-amber-500 to-yellow-500",
      content: `If you're 13-22 right now, you have the rarest asset in finance: TIME.

━━━━━━━━━━━━━━━━━━━━━━
WHY TIME WINS
━━━━━━━━━━━━━━━━━━━━━━
Compounding gets exponential after year 20.
Most adults don't start investing until 28-35.
You can start at 16-18 = a 10-20 year head start.

━━━━━━━━━━━━━━━━━━━━━━
THE ₹1,000/MONTH STUDENT
━━━━━━━━━━━━━━━━━━━━━━
₹1,000/month from age 18 at 12% return:
At age 30: ₹2,80,000
At age 40: ₹11,90,000
At age 50: ₹38,30,000
At age 60: ₹1.18 CRORE

Total invested: ₹5,04,000
Total grown: ₹1.18 crore
Money worked harder than you did!

━━━━━━━━━━━━━━━━━━━━━━
WHAT TO DO RIGHT NOW (under 18)
━━━━━━━━━━━━━━━━━━━━━━
✓ Open a savings account with parent's help
✓ Read 1 finance book (e.g., "Rich Dad Poor Dad" basics)
✓ Track money in a notebook
✓ Try our virtual simulator weekly
✓ Talk to parents about their investments

━━━━━━━━━━━━━━━━━━━━━━
ON YOUR 18TH BIRTHDAY
━━━━━━━━━━━━━━━━━━━━━━
✓ Get your PAN card
✓ Complete KYC online
✓ Open a Demat account
✓ Start your first ₹500 SIP in an Index Fund
✓ Don't tell anyone. Just keep going.

You're not late. You're early.`
    },
    {
      icon: Wallet,
      title: "Emergency Funds",
      tagline: "The bridge over your bad days",
      readTime: "3 min read",
      color: "from-rose-500 to-pink-500",
      content: `An emergency fund is money set aside for unexpected problems. NOT for sales, gifts, or trips.

━━━━━━━━━━━━━━━━━━━━━━
REAL EMERGENCIES
━━━━━━━━━━━━━━━━━━━━━━
✓ Phone screen cracked
✓ Sudden medical bill
✓ Lost wallet
✓ Urgent travel for family
✓ Laptop breakdown before exam

NOT emergencies:
✗ iPhone launch
✗ Friend's birthday party
✗ Sale on shoes
✗ Concert tickets

━━━━━━━━━━━━━━━━━━━━━━
HOW MUCH TO KEEP
━━━━━━━━━━━━━━━━━━━━━━
Students: 1-2 months of your monthly expenses
Working: 3-6 months of expenses
Freelancer: 6-12 months of expenses

Example: spend ₹3,000/month → emergency fund = ₹3,000 - ₹6,000

━━━━━━━━━━━━━━━━━━━━━━
WHERE TO KEEP IT
━━━━━━━━━━━━━━━━━━━━━━
✓ Savings account (instant access)
✓ Liquid mutual fund (1-day withdrawal, 4-6% returns)
✓ Separate piggy bank
✗ NOT in stocks (can drop right when you need it)
✗ NOT in FDs with high lock-in

━━━━━━━━━━━━━━━━━━━━━━
HOW TO BUILD IT FAST
━━━━━━━━━━━━━━━━━━━━━━
Start small. ₹100/week = ₹5,200/year.
Use birthday/festival money to top it up.
Treat it like rent — non-negotiable.

Having ₹5,000 set aside makes problems annoying, not life-changing.`
    },
    {
      icon: GraduationCap,
      title: "Money & Mindset",
      tagline: "Your beliefs control your wallet",
      readTime: "4 min read",
      color: "from-violet-500 to-indigo-500",
      content: `How you THINK about money shapes how you USE money. Fix the mindset, the wallet follows.

━━━━━━━━━━━━━━━━━━━━━━
SCARCITY vs ABUNDANCE
━━━━━━━━━━━━━━━━━━━━━━
Scarcity mindset (toxic):
✗ "I'll never have enough"
✗ "Rich people are lucky / shady"
✗ "Saving is for boring people"

Abundance mindset (empowering):
✓ "I can grow my money skillfully"
✓ "Wealth is built, not gifted"
✓ "Every rupee is a tiny worker"

━━━━━━━━━━━━━━━━━━━━━━
NEEDS vs WANTS vs DESIRES
━━━━━━━━━━━━━━━━━━━━━━
NEED → you can't function without it (food, books)
WANT → makes life better (data pack, decent shoes)
DESIRE → emotional pull (new iPhone, branded hoodie)

Most money problems come from confusing DESIRES with NEEDS.

━━━━━━━━━━━━━━━━━━━━━━
LIFESTYLE INFLATION (the silent trap)
━━━━━━━━━━━━━━━━━━━━━━
When income grows, spending grows faster.
₹2,000 pocket money → save ₹400
₹10,000 income later → save ₹500? That's a problem.

Rule: when income grows, save the FIRST 50% of the increase.

━━━━━━━━━━━━━━━━━━━━━━
3 MENTAL MODELS TO ADOPT
━━━━━━━━━━━━━━━━━━━━━━
1. "Money is a tool, not a trophy"
2. "Every purchase is a vote for your future self"
3. "Time is the asset. Money buys back time."

━━━━━━━━━━━━━━━━━━━━━━
DAILY MINDSET PRACTICE
━━━━━━━━━━━━━━━━━━━━━━
Before any purchase, ask:
1. Do I need this or feel something missing?
2. Will I care about this in 30 days?
3. Is this worth ___ hours of my future work?

Mindset > Math. Master the mindset and the math takes care of itself.`
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Financial Basics
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Click any card to learn the fundamentals
          </p>
          <p className="text-sm text-muted-foreground">
            {topics.length} topics • ~50 min total reading • beginner friendly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="p-6 cursor-pointer hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 border-2 hover:border-primary/30 hover:scale-105 h-full flex flex-col">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 shadow-md`}>
                      <topic.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{topic.tagline}</p>
                    <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {topic.readTime}
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                        <topic.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div>{topic.title}</div>
                        <div className="text-sm font-normal text-muted-foreground">{topic.tagline} • {topic.readTime}</div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground">
                    {topic.content}
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      💡 For education only. Practice with our tools and simulator!
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Basics;
