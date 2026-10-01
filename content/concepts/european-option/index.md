---
title: European option
created: 2025-07-09
depends_on: []
---

An option is a contract that gives its holder the right, but not the obligation, to buy or sell an underlying asset at a predetermined price on or before a specified date. The two basic types are **call options**, which confer the right to buy, and **put options**, which confer the right to sell. The predetermined price is the **strike price** $K$, and the specified date is the **expiration date** $T$. The price paid to acquire the option is the **premium**.

Options are classified by when they may be exercised. An **American option** may be exercised at any time up to and including the expiration date. A **European option** may be exercised only at expiration itself. This restriction makes European options analytically simpler, because the writer faces a single known liability date rather than a continuous range of possible exercise times. Most exchange-traded equity options in the United States are American-style, while many index options and over-the-counter derivatives are European-style. The distinction is contractual, not geographic: European options are traded worldwide, and American options are traded in Europe.

This document focuses on European options because they are the instrument for which closed-form pricing is possible, and the foundation on which the rest of options theory is built.

## Payoffs at expiration

At expiration $T$, the holder of a European call option compares the market price of the underlying asset $S_T$ to the strike price $K$. If $S_T > K$, the holder exercises the option, buys the asset for $K$, and captures a profit of $S_T - K$. If $S_T \leq K$, the holder lets the option expire worthless. The payoff of a European call is therefore

$$
	\max(S_T - K,\; 0) = (S_T - K)^+.
$$

The payoff of a European put is the mirror image. The holder exercises only when $S_T < K$, selling the asset for more than its market value:

$$
	\max(K - S_T,\; 0) = (K - S_T)^+.
$$

These payoffs are piecewise linear in $S_T$, with a kink at $S_T = K$. The call payoff is zero for all $S_T \leq K$ and increases one-for-one with $S_T$ above $K$. The put payoff decreases one-for-one with $S_T$ below $K$ and is zero above it. This asymmetry --- the fact that the holder's loss is capped at the premium paid while the gain is potentially unbounded (for a call) or large (for a put) --- is what distinguishes options from forward contracts, whose payoffs are linear.

## The role of the underlying asset

The "underlying asset" of an option can be almost anything: a share of stock, a stock index, a currency, a commodity, an interest rate, or even another derivative. The only requirement is that the asset's price be observable at expiration. In practice, the most liquid options markets are on equity indices (such as the S&P 500), individual equities, foreign exchange, and government bond futures.

The price of the underlying asset at any time $t$ before expiration is denoted $S_t$. The entire theory of option pricing concerns how $S_t$ evolves over time and how that evolution determines the fair value of the option today. For a European option, only the distribution of $S_T$ matters, because the option can be exercised only once.

## Put-call parity

A fundamental no-arbitrage relationship links the prices of European calls and puts on the same underlying with the same strike and expiration. Suppose $C$ is the price of a European call and $P$ is the price of a European put, both with strike $K$ and expiration $T$, on a non-dividend-paying asset whose current price is $S_0$. Let $r$ be the continuously compounded risk-free rate. Then

$$
	C - P = S_0 - K e^{-rT}. @tag(put-call-parity)
$$

The argument is a comparison of two portfolios. Portfolio A holds one call and cash of $K e^{-rT}$ (which grows to $K$ at time $T$). Portfolio B holds one put and one share of the underlying. At expiration, both portfolios have the identical payoff $\max(S_T, K)$: Portfolio A is worth $S_T$ if $S_T > K$ (the call is exercised) and $K$ otherwise (the cash is retained); Portfolio B is worth $S_T$ if $S_T \geq K$ (the put expires worthless) and $K$ otherwise (the put is exercised). Since the two portfolios pay the same amount in every state of the world, they must cost the same today, or an arbitrage opportunity would exist.

Put-call parity means that the price of a European call determines the price of the corresponding European put, and vice versa. It also implies that pricing a European option reduces to pricing just one of the two --- a fact the [Black-Scholes model](../black-scholes-model/) exploits by deriving the call price first and then reading the put price from [](eq:put-call-parity).

## Why European options are tractable

The restriction to exercise only at expiration converts the pricing problem into a question about the distribution of $S_T$ alone. There is no need to consider whether early exercise might be optimal, as there is for American options (where, for example, a deep in-the-money put on a non-dividend-paying stock is worth more exercised early than held to expiration). This simplification is what permits closed-form solutions like the Black-Scholes formula. For American options, no such formula exists in general, and pricing requires numerical methods such as binomial trees or finite-difference solutions of the same partial differential equation.

The [Black-Scholes model](../black-scholes-model/) exploits this tractability to derive a closed-form price for European calls and puts. The sensitivity measures derived from that price --- the [Greeks](../greeks/) --- and the empirical patterns in market prices --- the [volatility surface](../volatility-surface/) --- are the subjects of the following documents.
