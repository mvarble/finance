---
title: Volatility surface
created: 2025-07-09
depends_on: [black-scholes-model, greeks]
katex_macros:
    '\IV': '\sigma_{\mathrm{impl}}'
---

The volatility surface is a three-dimensional representation of implied volatility as a function of an option's strike price and its time to expiration. It is the single most important object in practical options trading: while the [Black-Scholes model](../black-scholes-model/) assumes volatility is a single constant, real markets assign a different implied volatility to every option contract, and the pattern of these volatilities across strikes and maturities encodes the market's collective view of future price behavior.

This document builds on the [Black-Scholes model](../black-scholes-model/) and the sensitivity measures known as [the Greeks](../greeks/).

## Implied volatility

The Black-Scholes formula prices a [European call](../european-option/) as a function of five inputs: the stock price $S$, the strike $K$, the time to expiration $\tau$, the risk-free rate $r$, and the volatility $\sigma$. The first four are directly observable in the market. The fifth, volatility, is not. **Implied volatility** is the value of $\sigma$ that, when substituted into the Black-Scholes formula, reproduces the observed market price of the option.

Formally, if $C_{\text{mkt}}$ is the market price of a call with parameters $(S, K, \tau, r)$, the implied volatility $\IV$ is the unique solution to

$$
	C_{\text{BS}}(S, K, \tau, r, \IV) = C_{\text{mkt}}, @tag(impl-vol-def)
$$

where $C_{\text{BS}}$ is the Black-Scholes call price. The solution exists and is unique because the Black-Scholes price is strictly increasing in $\sigma$ (the option's [vega](../greeks/) is always positive), ranging from the intrinsic value $(S - Ke^{-r\tau})^+$ at $\sigma = 0$ to $S$ as $\sigma \to \infty$. Equation [](eq:impl-vol-def) cannot be inverted algebraically; it is solved numerically, typically by Newton's method using vega as the derivative.

Implied volatility is the language in which options are quoted. A trader who says "the 105 call is trading at 22 vol" means that the market price of that call is whatever price the Black-Scholes formula produces when $\sigma = 0.22$ is substituted. This convention exists because the dollar price of an option depends on all five inputs and is difficult to compare across strikes and maturities, while implied volatility normalizes the price into a single number that is roughly comparable.

## The volatility smile

If the Black-Scholes assumptions held exactly --- if stock returns were truly lognormal with constant volatility --- then every option on the same stock with the same expiration would produce the same implied volatility, regardless of strike. Plotting implied volatility against strike would yield a flat line at the level of the true volatility.

This is not what markets produce. Instead, a plot of implied volatility against strike, for options with a common expiration, typically shows one of two patterns:

A **volatility smile** is a U-shaped curve in which implied volatility is highest for deep out-of-the-money and deep in-the-money options, and lowest for at-the-money options. Smiles are characteristic of currency options, where large moves in either direction are more common than the lognormal model predicts.

A **volatility skew** (or smirk) is a downward-sloping curve in which implied volatility is highest for low strikes (out-of-the-money puts) and decreases as the strike increases. Skews are the dominant pattern in equity index options. The skew became much more pronounced after the stock market crash of October 1987, which demonstrated that large downward moves are more frequent than the lognormal model allows.

The skew in equity markets reflects two economic forces. First, the distribution of stock returns has **fatter left tails** than the lognormal distribution: crashes happen more often and are more severe than geometric Brownian motion predicts. Market participants price this tail risk into out-of-the-money puts, driving their implied volatility above the at-the-money level. Second, there is a structural supply-demand imbalance: institutional investors are persistent buyers of downside protection (put options), while hedge funds and other counterparties are sellers. The resulting demand pressure elevates the prices and implied volatilities of low-strike options relative to high-strike ones.

## The volatility surface

Extending the smile from one expiration to all expirations produces the **volatility surface**: a function $\IV(K, \tau)$ that assigns an implied volatility to every combination of strike and time to expiration. Equivalently, since traders often think in terms of moneyness, the surface can be parameterized as $\IV(K/S, \tau)$, a function of the moneyness ratio $K/S$ and time.

A typical equity index volatility surface has the following features:

**The skew slopes downward** at every maturity: lower strikes have higher implied volatility than higher strikes. The slope is steepest for short maturities, where crash risk and near-term uncertainty concentrate.

**The level shifts** as market conditions change. In calm markets, the entire surface sits lower; in periods of stress (such as the 2008 financial crisis or the March 2020 pandemic selloff), the surface lifts upward, with the short-dated, low-strike corner rising the most. The Chicago Board Options Exchange Volatility Index (VIX) is effectively a measure of the level of the S&P 500 volatility surface near the at-the-money, one-month point.

**Short-dated options are more volatile in implied-volatility terms** than long-dated ones. A one-week option's implied volatility can swing by many percentage points in a single day, while a two-year option's implied volatility moves much more slowly. This reflects the fact that short-dated options are more sensitive to immediate events (earnings announcements, economic data releases, central bank decisions) while long-dated options average over a longer and more uncertain future.

## Why the surface exists

The volatility surface exists because the Black-Scholes model is wrong in specific, systematic ways. The model assumes that returns are lognormal and that volatility is constant. In reality, returns have fat tails, exhibit jumps, and cluster in volatility (periods of high volatility tend to be followed by more high volatility). Each of these departures from the model's assumptions creates a distortion in implied volatility.

**Fat tails** mean that extreme outcomes --- large gains or large losses --- are more probable than the lognormal distribution allows. Options that pay off in these extreme states (deep out-of-the-money puts and calls) are therefore worth more than the Black-Scholes formula predicts at the at-the-money volatility, producing higher implied volatilities at the wings.

**Jumps** --- discontinuous moves in the stock price, such as those caused by earnings surprises or macroeconomic shocks --- affect short-dated options disproportionately. A jump can move the stock past the strike of a short-dated option, turning a worthless position into a valuable one. This jump risk premium inflates the implied volatility of short-dated options, especially around known event dates.

**Stochastic volatility** --- the fact that volatility itself changes over time --- means that the constant-$\sigma$ assumption is a poor approximation even for moderately dated options. Models that treat volatility as a stochastic process (such as the Heston model) can reproduce the qualitative features of the volatility surface, including the smile and the term structure.

## Using the surface

The volatility surface is not merely descriptive; it is the primary tool for several practical tasks.

**Pricing non-standard options.** A trader asked to price an option with a strike or maturity not actively traded in the market interpolates the volatility surface to find the appropriate implied volatility, then substitutes it into the Black-Scholes formula. The surface thereby provides a consistent pricing framework for the entire universe of options on a given underlying.

**Relative value analysis.** If a particular option's implied volatility is significantly above the level implied by the surrounding surface, it is "rich" --- expensive relative to its neighbors. If it is below, it is "cheap." Traders look for relative value opportunities by examining the surface for mispriced regions and constructing spread trades to exploit them.

**Risk management.** A portfolio of options on the same underlying has exposure to changes in the level, skew, and curvature of the volatility surface. Risk managers summarize these exposures with vega (sensitivity to the level), **vanna** (the sensitivity of delta to changes in implied volatility, or equivalently the sensitivity of vega to changes in the stock price), and **volga** (the sensitivity of vega to changes in implied volatility). Together, these higher-order Greeks describe how the portfolio behaves as the surface deforms.

**Forecasting.** The shape of the volatility surface contains information about the market's expectations. A steep skew signals elevated demand for downside protection, which may indicate fear of a crash. An inverted term structure (short-dated implied volatility above long-dated) suggests that the market expects a near-term event to increase volatility temporarily. These signals are not mechanical predictors, but they inform the judgment of traders and risk managers.

## A concrete example

Consider the S&P 500 index at $S = 4500$. The following table shows representative implied volatilities for put options expiring in 30 days, across several strikes:

| Strike | Moneyness ($K/S$) | Implied volatility |
|--------|-------------------|-------------------|
| 4050 | 0.90 | 24.5% |
| 4275 | 0.95 | 19.8% |
| 4500 | 1.00 | 16.2% |
| 4725 | 1.05 | 14.1% |
| 4950 | 1.10 | 13.0% |

The skew is clearly visible: the 4050 put (10% out of the money) has an implied volatility 8.3 percentage points higher than the at-the-money option. This means the market prices crash risk into downside protection. A trader who sells this put collects a premium that compensates for the tail risk, and the [delta hedge](../greeks/) must account for the elevated implied volatility.

If the same strikes are examined for options expiring in one year, the skew persists but is flatter --- perhaps 20.1%, 17.5%, 15.8%, 14.6%, 13.8%. The short-dated skew is steeper because near-term event risk and demand for immediate protection exert more pressure on short-dated implied volatilities.

## Beyond Black-Scholes

The volatility surface is, in a sense, an admission that the Black-Scholes model is an imperfect description of reality. Rather than abandon the model, practitioners use it as a quoting convention and encoding device: the surface maps market prices into a space where they can be compared, interpolated, and analyzed. More sophisticated models --- local volatility models, stochastic volatility models (Heston, SABR), and jump-diffusion models --- attempt to explain the surface by enriching the dynamics of the underlying process. These models are calibrated to reproduce the observed surface as closely as possible, and their parameters are themselves quoted and traded. But the Black-Scholes framework, for all its simplifications, remains the common language in which all of these models communicate their results.
