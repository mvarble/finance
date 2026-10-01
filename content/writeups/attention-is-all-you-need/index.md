---
title: Notes on "Attention is All You Need"
created: 2026-09-30
updated: 2026-10-01
depends_on:
    [
        adverse-selection,
        basis-points,
        brokerage-cash-balance-revenue,
        dispersion-trade,
        market-making,
        net-interest-margin,
        payment-for-order-flow,
        prediction-markets,
        wheel-strategy,
    ]
---

Matt Levine's Money Stuff piece "Attention is all you need" [](cite:levine2026) argues that agentic artificial intelligence will reshape retail-facing financial businesses by changing how much attention customers pay to their finances. The argument is worked through below with the concepts it rests on.

Concepts discussed:

- [Dispersion trade](../../concepts/dispersion-trade/)
- [Bank deposit spread / net interest margin](../../concepts/net-interest-margin/)
- [Payment for order flow (PFOF)](../../concepts/payment-for-order-flow/)
- [Basis points](../../concepts/basis-points/)
- [Adverse selection](../../concepts/adverse-selection/)
- [Market making](../../concepts/market-making/)
- [Brokerage cash balance revenue](../../concepts/brokerage-cash-balance-revenue/)
- [The wheel strategy](../../concepts/wheel-strategy/)
- [Prediction markets and sportsbooks](../../concepts/prediction-markets/)

---

## The Core Framework: A "Dispersion Trade" on Human Attention

See also: [Dispersion trade](../../concepts/dispersion-trade/)

The author frames the entire argument as a "dispersion trade." In finance, a dispersion trade is a strategy where you simultaneously bet that some things will go up and other related things will go down — you are betting that outcomes within a group will _diverge_ rather than move together. The author is not describing a literal derivatives position; rather, the author is using the concept as a mental model for how agentic AI will create winners and losers within the financial sector.

The thesis splits retail-facing financial businesses into two categories. First, businesses that profit when customers pay _too little_ attention — banks, insurers, mortgage companies. These businesses are built on customer inertia, and an AI agent that tirelessly optimizes a customer's finances threatens their revenue. Second, businesses that profit when customers pay _more_ attention (or at least _generate more activity_) — retail brokerages, sportsbooks, prediction markets. These businesses benefit when AI agents trade more frequently on behalf of customers. The author's "trade" is to be bearish on the first group and bullish on the second group. Understanding this dispersion framework is essential because it is what makes the argument more interesting than simply "AI will change finance." The author is saying that within a single theme — retail finance — AI creates opposing forces depending on which side of the attention trade each business sits on.

## How Banks Profit from Inattention

See also: [Net interest margin](../../concepts/net-interest-margin/)

The document assumes you understand how banks earn money from deposits, but the specifics are important to the argument. When you deposit money in a checking or savings account, the bank does not simply hold your cash in a vault. It lends that money out (as mortgages, car loans, commercial loans) or invests it in securities, earning a market rate of interest on those assets. Meanwhile, it pays you a below-market interest rate on your deposit — perhaps 0.5% on your savings account when the bank is earning 4% or 5% on the money it lends out. The difference between what the bank earns on your money and what it pays you is called the _net interest margin_ or _deposit spread_, and it is one of the largest sources of profit for traditional banks.

This model depends on customer inattention. When market interest rates rise — meaning the bank can earn more by lending out your money — your savings account rate does not automatically rise to match. Most customers do not actively shop around for the best savings rate, refinance their mortgage when rates drop, or move money out of a low-yield checking account. The friction of doing so — the time, effort, and attention required — means that most customers simply leave their money where it is. The bank profits from this inertia. The author calls this a "laziness tax" and notes that Americans forgo "untold sums" of money every year because of it.

The document's argument is that an AI agent acting on a customer's behalf would have no such inertia. It would continuously compare the interest rate a bank pays against competitors and market alternatives, and it would move money to whichever account offers the best return. This compresses the bank's deposit spread: the bank must either pay depositors closer to market rates (reducing its margin) or watch deposits leave. The author references the concept of "agentic bank runs" — a scenario where AI agents collectively pull deposits out of banks that offer below-market rates, potentially destabilizing banks that rely on sticky deposits for funding.

A similar logic applies to other products built on customer inertia. Life insurance policies, annuities, and mortgages are all priced with assumptions about how many customers will actively shop around, refinance, or switch providers. If AI agents reduce that friction, the businesses that depend on it lose revenue.

## Basis Points

See also: [Basis points](../../concepts/basis-points/)

Throughout the document, the author uses the term "basis points" (abbreviated "bps," pronounced "bips"). A basis point is one-hundredth of a percentage point: 1 basis point = 0.01%, and 100 basis points = 1%. It is the standard unit for discussing small differences in interest rates, spreads, and investment returns. When the author says an AI agent will "extract the last basis point from banks," the author means that the agent will pursue even the smallest possible financial advantage — moving money to earn 0.01% more, or saving 0.01% on a loan. The point is that AI agents have effectively unlimited attention and energy, so they will pursue gains that are too small for a human to bother with.

## How Retail Brokerages Profit from Attention

See also: [Payment for order flow](../../concepts/payment-for-order-flow/), [Market making](../../concepts/market-making/), [Brokerage cash balance revenue](../../concepts/brokerage-cash-balance-revenue/), [Adverse selection](../../concepts/adverse-selection/)

The document's second leg — businesses that benefit from increased customer attention — requires understanding how modern US retail brokerages make money. This is more complex than most people realize, and the author only sketches it briefly. There are two main revenue streams to understand.

**Payment for order flow (PFOF).** When a retail customer places a trade on an app like Robinhood, the trade does not go directly to a stock exchange. Instead, the brokerage routes the customer's order to a _market maker_ — a firm (such as Citadel Securities or Virtu Financial) that continuously quotes prices at which it is willing to buy and sell securities. The market maker takes the other side of the customer's trade: if the customer wants to buy, the market maker sells to them; if the customer wants to sell, the market maker buys from them. The market maker earns the _bid-ask spread_ — the small difference between the price at which it buys and the price at which it sells. In exchange for receiving a steady stream of retail orders, the market maker pays the brokerage a fee. This is payment for order flow.

Why do market makers want retail orders specifically? This is where the concept of _adverse selection_ comes in. Market makers face a risk: some traders have better information than others. A hedge fund trader who has done deep research on a company, or a high-frequency trading firm with faster data feeds, may know something the market maker does not. Trading against such an informed counterparty means the market maker is likely to lose money — this is adverse selection. Retail customers, by contrast, are typically uninformed: they are trading based on general sentiment, news headlines, or personal financial needs rather than proprietary research or speed advantages. For a market maker, trading against retail customers is relatively safe — the market maker earns the spread on each trade without much risk of being on the wrong side of an informed bet. Retail order flow is therefore the most profitable kind of flow for market makers, and they pay brokerages handsomely for it.

The author illustrates this with a memorable line from a previous piece: "for equity market makers, there are few more beautiful phrases in the English language than 'day trader and volleyball-programs coordinator.'" The point is that the ideal customer is someone who trades actively (generating many trades and thus many spreads for the market maker) but has no genuine informational edge (so the market maker is not exposed to adverse selection). A part-time trader with a day job is perfect: active enough to generate revenue, uninformed enough to be a safe counterparty.

**Cash balance revenue.** Brokerages also earn money from the cash that sits uninvested in customer accounts. When a customer has cash in their brokerage account, the brokerage invests that cash (or deposits it with a partner bank) and earns interest on it. The brokerage pays the customer a below-market rate — often close to zero — on that cash, and keeps the difference. This is conceptually identical to how banks profit from deposits: the business earns a spread by investing someone else's idle money at market rates while paying them less. This revenue stream, unlike PFOF, is _negatively_ correlated with attention: an attentive customer (or AI agent) would move idle cash to a higher-yielding account, reducing the brokerage's spread.

The author notes that retail brokerages are therefore an interesting mixed case. PFOF revenue increases with attention (more trades = more revenue), while cash-balance revenue decreases with attention (less idle cash = less revenue). On net, the author seems to think the PFOF effect dominates, which is why brokerages are enthusiastically embracing AI agents.

## Why AI Agents Are the "Holy Grail" for Brokerages

The document emphasizes a crucial insight: the profitability of retail trading for market makers (and thus for brokerages via PFOF) is not just about volume, but about the _type_ of trading. Options, cryptocurrencies, and prediction-market contracts are especially lucrative for market makers because the bid-ask spreads on these instruments are wider than on plain stocks. Options involve more complexity and uncertainty, which means market makers build in a larger margin of safety. Crypto markets are fragmented and volatile, producing even wider spreads. Prediction markets and sports bets carry very wide margins because the outcomes are highly uncertain and the retail customer has little informational advantage.

An AI agent that trades these instruments continuously — while the customer sleeps, works, or is otherwise disengaged — is ideal for the brokerage and the market maker. The agent generates high volume (many trades), trades in high-margin products (options, crypto, prediction markets), and does so without any informational edge that would create adverse selection risk. The author stresses this point: "enabling investors to trade … options, bitcoin and prediction-market contracts even when they are not paying attention" is described as "the Holy Grail of retail finance."

## The Wheel Strategy

See also: [The wheel strategy](../../concepts/wheel-strategy/)

The document mentions "the wheel strategy" as an example of what an AI agent might automate on Robinhood. This is a popular income-generating strategy using options, and it is worth understanding briefly. The wheel strategy involves two steps that repeat in a cycle. First, you sell a _cash-secured put_ option on a stock: you collect a premium (cash upfront) in exchange for agreeing to buy the stock at a specified price (the strike price) if it falls to that level. You set aside enough cash to cover the purchase. If the stock stays above the strike price, the option expires worthless and you keep the premium. If the stock falls to the strike price, you are obligated to buy it — and then you move to step two. Second, once you own the stock, you sell a _covered call_ option: you collect another premium in exchange for agreeing to sell the stock at a higher specified price. If the stock rises to that price, your shares are called away (sold), you collect the premium, and you go back to step one. If it does not, you keep the premium and the stock and try again. The wheel generates regular income from option premiums, and the author mentions it because it is exactly the kind of mechanical, rules-based strategy that an AI agent can run autonomously — including when the customer is not logged in.

## Prediction Markets and Sportsbooks

See also: [Prediction markets and sportsbooks](../../concepts/prediction-markets/)

The document briefly references "agentic sports gambling" and prediction markets. A prediction market is a market where people trade contracts that pay out based on the outcome of future events — elections, sports games, economic indicators, and so on. The contracts are priced according to the market's collective estimate of the probability of each outcome. Sportsbooks operate similarly, offering bets on sporting events. The author's point is straightforward: these are pure windfall businesses for AI-driven trading volume. Sportsbooks and prediction markets have very wide margins (the "house edge"), and an AI agent that places many bets continuously generates enormous revenue for these platforms without meaningfully improving the customer's odds of winning. The customer's AI agent is, in effect, a tireless revenue generator for the house.

## The Broader Context

The author draws on real-world reporting — specifically two Wall Street Journal articles published on the same day — to support the thesis. One article covers how AI threatens the "laziness tax" that banks earn from inattentive customers. The other covers Robinhood's annual event, where the company unveiled AI agent features including an in-app assistant that can research investments, build strategies, and eventually place trades autonomously via a feature called "Loops" that runs strategies repeatedly even when the user is not logged in.

The author also references a 2019 law review article by Rory Van Loo titled "Digital Market Perfection," which anticipated many of these dynamics before agentic AI existed in its current form. That article explored how digital tools and algorithms could help consumers overcome information asymmetries and inertia in financial markets — essentially the same thesis applied to a pre-agentic-AI world.

## Summary

The document presents a compelling two-sided thesis about AI's impact on retail finance. Businesses that profit from customer inattention (banks, insurers, mortgage lenders) face disruption as AI agents eliminate the inertia these businesses depend on. Businesses that profit from customer activity (brokerages, market makers, sportsbooks, prediction markets) stand to benefit enormously as AI agents generate continuous, high-volume, high-margin trading activity from retail customers. The author frames this as a "dispersion trade" — short the inattention businesses, long the attention businesses — and supports it with current reporting on both sides of the dynamic. The key insight is that the same technology (agentic AI) has opposite effects on different parts of the financial system depending on whether those parts are built on customer inertia or customer activity.
