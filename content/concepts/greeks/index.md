---
title: The Greeks
created: 2025-07-09
depends_on: [black-scholes-model]
katex_macros:
    '\dd': '\mathrm{d}'
---

The Greeks are partial derivatives of an option's price with respect to the variables that determine it. Each Greek measures the option's sensitivity to one input while holding the others fixed, providing a local linear (or quadratic) approximation to how the option price changes when the market moves. The name is a convention of options trading rather than a reference to anything Hellenic: the letters $\Delta$, $\Gamma$, $\Theta$, and $\nu$ (vega) are used as shorthand labels.

All formulas in this document are derived from the [Black-Scholes model](../black-scholes-model/), which prices a [European option](../european-option/) on a non-dividend-paying stock as

$$
	C = S\,\Phi(d_1) - Ke^{-r\tau}\Phi(d_2), \qquad P = Ke^{-r\tau}\Phi(-d_2) - S\,\Phi(-d_1),
$$

where $\tau = T - t$ is the time remaining to expiration, $\Phi$ is the standard normal cumulative distribution function, $\phi$ is its density, and

$$
	d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)\tau}{\sigma\sqrt{\tau}}, \qquad d_2 = d_1 - \sigma\sqrt{\tau}.
$$

When the underlying pays a continuous dividend yield $q$, every formula below applies with $S$ replaced by $Se^{-q\tau}$ and $r$ replaced by $r - q$ in the appropriate places. The structural insights --- the signs, the shapes, the hedging implications --- remain the same.

## Delta

Delta is the first derivative of the option price with respect to the stock price. For a call,

$$
	\Delta_C = \frac{\partial C}{\partial S} = \Phi(d_1). @tag(call-delta)
$$

For a put, $\Delta_P = \Phi(d_1) - 1 = -\Phi(-d_1)$.

Since $\Phi$ takes values between 0 and 1, a call's delta lies between 0 and 1, while a put's delta lies between $-1$ and $0$. A deep in-the-money call ($S \gg K$) has $d_1 \to \infty$ and $\Delta_C \to 1$: the option behaves like owning one share. A deep out-of-the-money call has $d_1 \to -\infty$ and $\Delta_C \to 0$: small moves in the stock. An at-the-money call ($S \approx K$) has $\Delta_C \approx 0.5$.

Delta's primary use is **delta hedging**: constructing a position whose value is locally insensitive to stock price moves. A trader who has sold a call option can hedge by buying $\Delta_C$ shares of the underlying. The combined position (short one call, long $\Delta_C$ shares) has net delta of zero, meaning small stock price changes do not affect its value. However, delta itself changes as the stock moves (at a rate given by gamma), so the hedge must be continuously adjusted --- the practical subject of gamma scalping discussed below.

## Gamma

Gamma is the second derivative of the option price with respect to the stock price:

$$
	\Gamma = \frac{\partial^2 C}{\partial S^2} = \frac{\partial \Delta_C}{\partial S} = \frac{\phi(d_1)}{S\sigma\sqrt{\tau}}. @tag(gamma)
$$

Gamma is the same for calls and puts. It is always positive for a long option position, meaning delta increases when the stock rises and decreases when it falls. The practical consequence is that delta hedging is imperfect: even a delta-neutral portfolio changes its delta as the stock moves, and the rate of that change is gamma.

Gamma is largest for at-the-money options near expiration, where $\phi(d_1)$ is near its maximum $\phi(0) = 1/\sqrt{2\pi} \approx 0.399$ and $\tau$ is small. A concrete example: an at-the-money call ($S = K = 100$) with $\tau = 1/252$ (one trading day), $\sigma = 20\%$, and $r = 5\%$ has

$$
	\Gamma = \frac{\phi(0)}{100 \times 0.2 \times \sqrt{1/252}} = \frac{0.399}{100 \times 0.2 \times 0.063} \approx 0.316.
$$

This means that for each dollar the stock moves, the option's delta changes by about 0.32 --- a very rapid change that requires frequent re-hedging.

The relationship between delta hedging and gamma explains why option trading is fundamentally about gamma. A market maker who sells options and delta-hedges them is **short gamma**: the hedge requires buying stock when it rises and selling when it falls (buying high and selling low), which loses money. The premium collected for selling the option compensates for these gamma-driven losses, provided realized volatility does not exceed implied volatility. A trader who buys options is **long gamma** and profits from large stock moves.

## Vega

Vega measures the option's sensitivity to changes in implied volatility:

$$
	\mathcal{V} = \frac{\partial C}{\partial \sigma} = S\sqrt{\tau}\,\phi(d_1). @tag(vega)
$$

Vega is the same for calls and puts, and it is always positive: a long option position gains value when volatility rises. Like gamma, vega is largest for at-the-money options, but unlike gamma it grows with $\sqrt{\tau}$, meaning longer-dated options are more sensitive to volatility changes than shorter-dated ones.

The numerical example above gives $\mathcal{V} = 100 \times \sqrt{1/252} \times \phi(0) \approx 100 \times 0.063 \times 0.399 \approx 2.52$. This means a one-percentage-point increase in implied volatility (from 20% to 21%) increases the option's value by approximately $\$0.0252$ per share, or $\$2.52$ per standard 100-share contract.

Vega is the Greek that most directly connects option prices to the [volatility surface](../volatility-surface/). Since volatility is the one input to the Black-Scholes formula that cannot be observed directly, market participants quote option prices in terms of their implied volatility --- the value of $\sigma$ that makes the formula match the market price. Vega tells the trader how much the option's dollar price changes when implied volatility moves.

## Theta

Theta measures the option's sensitivity to the passage of time, also called **time decay**:

$$
	\Theta_C = \frac{\partial C}{\partial t} = -\frac{S\sigma\,\phi(d_1)}{2\sqrt{\tau}} - rKe^{-r\tau}\Phi(d_2). @tag(call-theta)
$$

The sign convention is that $\Theta$ is the derivative with respect to calendar time $t$ (which moves forward), so theta is typically negative for a long option position: each day that passes erodes the option's value. The first term, which dominates, captures the decay of the option's time value. The second term reflects the reduced present value of the strike as discounting shrinks.

For a put,

$$
	\Theta_P = -\frac{S\sigma\,\phi(d_1)}{2\sqrt{\tau}} + rKe^{-r\tau}\Phi(-d_2).
$$

The sign of the second term flips, so a deep in-the-money put can have positive theta: as expiration approaches, the put converges to its intrinsic value $K - S$, and the time value of the strike received upon exercise becomes more valuable.

Theta is largest (in magnitude) for at-the-money options near expiration, for the same reason gamma is: the option's time value decays most rapidly when there is the greatest uncertainty about whether the option will expire in or out of the money. This decay accelerates as expiration approaches, which is why theta is sometimes said to be "nonlinear in time."

Theta and gamma are linked by the Black-Scholes PDE. For a delta-hedged portfolio (delta equal to zero), the PDE reduces to

$$
	\Theta + \frac{1}{2}\sigma^2 S^2 \Gamma = rV,
$$

which shows that theta is approximately the negative of $\frac{1}{2}\sigma^2 S^2 \Gamma$ (the term $rV$ is small for short-dated options). This relationship is the mathematical expression of the gamma-theta tradeoff: a long-gamma position pays for itself through theta decay, and a short-gamma position earns theta but is exposed to large moves.

## Summary table

| Greek | Symbol | Derivative | Call | Put |
|-------|--------|-----------|------|-----|
| Delta | $\Delta$ | $\partial V / \partial S$ | $\Phi(d_1)$ | $\Phi(d_1) - 1$ |
| Gamma | $\Gamma$ | $\partial^2 V / \partial S^2$ | $\phi(d_1)/(S\sigma\sqrt{\tau})$ | same |
| Vega | $\mathcal{V}$ | $\partial V / \partial \sigma$ | $S\sqrt{\tau}\,\phi(d_1)$ | same |
| Theta | $\Theta$ | $\partial V / \partial t$ | see [](eq:call-theta) | see text |

A fifth Greek, **rho** ($\rho = \partial V / \partial r$), measures sensitivity to the risk-free rate. It is $K\tau e^{-r\tau}\Phi(d_2)$ for a call and $-K\tau e^{-r\tau}\Phi(-d_2)$ for a put. Rho is rarely a primary concern for equity options, where interest rate changes have a small effect relative to stock price and volatility changes, but it matters for options on bonds and interest rates.

## Delta hedging in practice

A delta-neutral portfolio is the starting point for most professional options trading. A market maker who writes a call on 100 shares with $\Delta_C = 0.55$ buys 55 shares of the underlying. The portfolio's value is approximately unchanged by small stock moves. But gamma means the hedge decays: if the stock rises by $\$1$, delta might rise to 0.58, and the market maker must buy 3 more shares to stay delta-neutral. If the stock then falls back, delta drops again and the market maker must sell shares --- buying high and selling low.

The profit and loss of a delta-hedged option position over a small time interval $\dd t$ is approximately

$$
	\Pi \approx \frac{1}{2}\Gamma S^2 \big[(\dd S/S)^2 - \sigma_{\text{impl}}^2 \dd t\big],
$$

where $\sigma_{\text{impl}}$ is the implied volatility used to price the option. The term $(\dd S/S)^2$ is the realized variance over the interval. A long-gamma position profits when realized variance exceeds implied variance, and loses when the reverse is true. This makes options trading, at its core, a bet on the comparison between realized and implied volatility --- a connection the [volatility surface](../volatility-surface/) makes explicit.
