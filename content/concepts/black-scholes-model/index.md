---
title: Black-Scholes model
created: 2025-07-09
depends_on: [european-option]
katex_macros:
    '\dd': '\mathrm{d}'
---

The Black-Scholes model is a mathematical framework for pricing [European options](../european-option/). Published by Fischer Black and Myron Scholes in 1973 [](cite:black1973), with an independent and essentially simultaneous derivation by Robert Merton [](cite:merton1973), it was the first model to produce a closed-form formula for the fair value of a European call or put option under a small set of idealizing assumptions. The model rests on three pillars: a stochastic process for the underlying asset price (geometric Brownian motion), a no-arbitrage replication argument, and Itô's lemma from stochastic calculus.

This document builds on [European options](../european-option/) and derives the Black-Scholes partial differential equation and its solution. The sensitivity measures derived from the solution --- delta, gamma, vega, theta --- are the subject of [the Greeks](../greeks/). The gap between the model's assumptions and observed market prices gives rise to the [volatility surface](../volatility-surface/).

## Assumptions

The model prices a European option on a non-dividend-paying stock under the following assumptions:

1. The stock price $S_t$ follows a **geometric Brownian motion** with constant drift $\mu$ and constant volatility $\sigma$.
2. Trading in the stock and the option is continuous in time, with no transaction costs and no restrictions on short selling.
3. There exists a risk-free interest rate $r$, constant and known, at which any amount can be borrowed or lent.
4. The stock pays no dividends during the life of the option.
5. There are no arbitrage opportunities.

Assumptions 2, 3, and 5 are standard idealizations of frictionless markets. Assumption 4 is a simplification that can be relaxed by adjusting the formula. Assumption 1 --- geometric Brownian motion with constant parameters --- is the substantive modeling choice, and the one that the [volatility surface](../volatility-surface/) most directly exposes as inadequate.

## Geometric Brownian motion

The stock price is modeled as the solution to the stochastic differential equation

$$
	\dd S_t = \mu S_t \dd t + \sigma S_t \dd W_t, @tag(gbm-sde)
$$

where $W_t$ is a standard Brownian motion (also called a Wiener process), $\mu$ is the expected rate of return (the drift), and $\sigma$ is the volatility. The first term $\mu S_t \dd t$ represents the deterministic growth of the stock, while the second term $\sigma S_t \dd W_t$ captures random fluctuations whose magnitude is proportional to the current price. The proportionality to $S_t$ is what makes the process *geometric* rather than arithmetic: percentage changes, not absolute changes, are the random component.

The solution to [](eq:gbm-sde) can be obtained by applying Itô's lemma to $f(S_t) = \ln S_t$. Because $f'(S) = 1/S$ and $f''(S) = -1/S^2$, Itô's lemma gives

$$
	\dd(\ln S_t) = \frac{1}{S_t}\dd S_t - \frac{1}{2}\frac{1}{S_t^2}(\dd S_t)^2.
$$

Substituting [](eq:gbm-sde) and using the rules $\dd t \cdot \dd t = 0$, $\dd t \cdot \dd W_t = 0$, and $(\dd W_t)^2 = \dd t$, the squared differential term is $(\dd S_t)^2 = \sigma^2 S_t^2 \dd t$, so

$$
	\dd(\ln S_t) = \Big(\mu - \frac{\sigma^2}{2}\Big)\dd t + \sigma \dd W_t.
$$

Integrating from $0$ to $T$,

$$
	\ln S_T = \ln S_0 + \Big(\mu - \frac{\sigma^2}{2}\Big)T + \sigma W_T. @tag(gbm-solution)
$$

Since $W_T \sim \mathcal{N}(0, T)$, the log-price $\ln S_T$ is normally distributed, which means $S_T$ is lognormally distributed. The extra term $-\sigma^2/2$ is the Itô correction: it arises because the expectation of a convex function of a random variable is not the convex function of the expectation. It ensures that $\mathbb{E}[S_T] = S_0 e^{\mu T}$, as required for the process to be a fair model of a traded asset's price.

## Itô's lemma

Itô's lemma is the stochastic-calculus analogue of the chain rule. For a function $f(t, S_t)$ that is once continuously differentiable in $t$ and twice in $S$, Itô's lemma states that

$$
	\dd f = \frac{\partial f}{\partial t}\dd t + \frac{\partial f}{\partial S}\dd S_t + \frac{1}{2}\frac{\partial^2 f}{\partial S^2}(\dd S_t)^2. @tag(ito-lemma)
$$

Substituting [](eq:gbm-sde) for $\dd S_t$ and $(\dd S_t)^2 = \sigma^2 S_t^2 \dd t$,

$$
	\dd f = \left(\frac{\partial f}{\partial t} + \mu S_t \frac{\partial f}{\partial S} + \frac{1}{2}\sigma^2 S_t^2 \frac{\partial^2 f}{\partial S^2}\right)\dd t + \sigma S_t \frac{\partial f}{\partial S}\dd W_t. @tag(ito-expanded)
$$

The crucial feature of [](eq:ito-expanded) is that the randomness in $\dd f$ comes entirely through the $\dd W_t$ term, and the coefficient of $\dd W_t$ is $\sigma S_t \frac{\partial f}{\partial S}$. This means the random component of the option price's change is proportional to $\frac{\partial f}{\partial S}$, a fact the replication argument exploits.

## Derivation of the Black-Scholes PDE

The central insight of Black and Scholes is that an option can be replicated by a continuously adjusted portfolio of the underlying stock and a risk-free bond. Let $V(t, S)$ denote the price of the option at time $t$ when the stock price is $S$. By [](eq:ito-expanded), the change in the option price over a small time interval is

$$
	\dd V = \left(\frac{\partial V}{\partial t} + \mu S \frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)\dd t + \sigma S \frac{\partial V}{\partial S}\dd W_t.
$$

Now construct a portfolio $\Pi$ consisting of one unit of the option and $-\Delta$ units of the stock, where $\Delta$ is chosen to eliminate the random component:

$$
	\Pi = V - \Delta \cdot S.
$$

The change in the portfolio value is $\dd\Pi = \dd V - \Delta \cdot \dd S$. Substituting the expressions for $\dd V$ and $\dd S$:

$$
	\dd\Pi = \left(\frac{\partial V}{\partial t} + \mu S \frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - \Delta \mu S\right)\dd t + \sigma S\left(\frac{\partial V}{\partial S} - \Delta\right)\dd W_t.
$$

Choose $\Delta = \frac{\partial V}{\partial S}$. The $\dd W_t$ term vanishes, and the portfolio becomes locally riskless:

$$
	\dd\Pi = \left(\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)\dd t.
$$

A riskless portfolio must earn the risk-free rate, or arbitrage would exist. Therefore $\dd\Pi = r\Pi \dd t = r\big(V - S\frac{\partial V}{\partial S}\big)\dd t$. Equating the two expressions for $\dd\Pi$:

$$
	\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} = r V - r S \frac{\partial V}{\partial S}.
$$

Rearranging gives the **Black-Scholes partial differential equation**:

$$
	\frac{\partial V}{\partial t} + rS\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} = rV. @tag(bs-pde)
$$

Notice that the drift $\mu$ of the stock has disappeared from the equation entirely. The option price does not depend on the expected return of the stock --- only on the volatility $\sigma$, the risk-free rate $r$, and the current stock price $S$. This is the most striking consequence of the replication argument: the stock's expected return is irrelevant for pricing the option.

## Solving the PDE: the Black-Scholes formula

The PDE [](eq:bs-pde) must be solved subject to a terminal condition. For a European call with strike $K$ and expiration $T$, the terminal condition is $V(T, S) = (S - K)^+$, and for a European put it is $V(T, S) = (K - S)^+$.

The solution proceeds by a change of variables that transforms [](eq:bs-pde) into the standard heat equation of mathematical physics. Let $\tau = T - t$ (time remaining to expiration), $x = \ln S$, and $V(t, S) = e^{-r\tau} u(\tau, x)$. Under these substitutions, [](eq:bs-pde) becomes

$$
	\frac{\partial u}{\partial \tau} = \frac{1}{2}\sigma^2 \frac{\partial^2 u}{\partial x^2} + \Big(r - \frac{1}{2}\sigma^2\Big)\frac{\partial u}{\partial x}.
$$

A further shift $y = x + (r - \sigma^2/2)\tau$ eliminates the first-derivative term, yielding the pure heat equation $\frac{\partial u}{\partial \tau} = \frac{1}{2}\sigma^2 \frac{\partial^2 u}{\partial y^2}$, whose solution with the appropriate initial condition is known in closed form. Translating back to the original variables, the price of a European call is

$$
	C = S_0 \, \Phi(d_1) - K e^{-rT} \Phi(d_2), @tag(bs-call)
$$

where $\Phi$ is the cumulative distribution function of the standard normal distribution, and

$$
	d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T}. @tag(d1d2)
$$

The price of the corresponding European put follows from [put-call parity](../european-option/):

$$
	P = K e^{-rT}\Phi(-d_2) - S_0 \,\Phi(-d_1). @tag(bs-put)
$$

The quantity $\Phi(d_2)$ has a natural probabilistic interpretation: it is the probability, under the **risk-neutral measure**, that the option expires in the money ($S_T > K$). The quantity $\Phi(d_1)$ is the delta of the call --- the sensitivity of the option price to the stock price --- and a concept explored in detail in [the Greeks](../greeks/).

## Risk-neutral pricing

The disappearance of $\mu$ from the Black-Scholes PDE points to a deeper principle. The option price can be computed as if all investors were risk-neutral --- that is, as if the stock's expected return were the risk-free rate $r$ rather than $\mu$. Under this **risk-neutral measure** $\mathbb{Q}$, the stock price process is

$$
	\dd S_t = r S_t \dd t + \sigma S_t \dd \tilde{W}_t,
$$

where $\tilde{W}_t$ is a Brownian motion under $\mathbb{Q}$. The option price is then the discounted expected payoff under $\mathbb{Q}$:

$$
	V(t, S) = e^{-r(T-t)} \mathbb{E}^{\mathbb{Q}}\big[(S_T - K)^+ \;\big|\; S_t = S\big].
$$

Evaluating this expectation directly --- integrating the lognormal density of $S_T$ against the call payoff --- reproduces [](eq:bs-call). The two approaches (solving the PDE and computing the risk-neutral expectation) are equivalent by the Feynman-Kac theorem.

## A concrete example

Consider a European call option on a stock currently priced at $S_0 = \$100$, with strike $K = \$105$, expiration $T = 0.5$ years, risk-free rate $r = 5\%$ per annum, and volatility $\sigma = 20\%$ per annum. Computing the intermediate quantities:

$$
	d_1 = \frac{\ln(100/105) + (0.05 + 0.04/2)(0.5)}{0.2\sqrt{0.5}} = \frac{-0.0488 + 0.035}{0.1414} = -0.0974,
$$

$$
	d_2 = -0.0974 - 0.1414 = -0.2388.
$$

From the standard normal CDF, $\Phi(d_1) = \Phi(-0.0974) \approx 0.4612$ and $\Phi(d_2) = \Phi(-0.2388) \approx 0.4056$. The call price is

$$
	C = 100 \times 0.4612 - 105 \times e^{-0.025} \times 0.4056 \approx 46.12 - 41.11 = \$5.01.
$$

A buyer pays approximately $\$5.01$ for the right to purchase the stock at $\$105$ in six months. If the stock rises above $\$105$ at expiration, the option is exercised and the buyer captures the excess. If it stays below, the option expires worthless and the buyer's loss is limited to the $\$5.01$ premium.

## Extensions for dividends

When the underlying stock pays a continuous dividend yield $q$, the stock price process under the risk-neutral measure becomes $\dd S_t = (r - q)S_t \dd t + \sigma S_t \dd \tilde{W}_t$. The Black-Scholes formula adjusts by replacing $S_0$ with $S_0 e^{-qT}$:

$$
	C = S_0 e^{-qT}\Phi(d_1) - K e^{-rT}\Phi(d_2),
$$

where $d_1$ and $d_2$ are computed as in [](eq:d1d2) but with $r$ replaced by $r - q$ in the numerator of $d_1$. This extension is used when pricing options on equity indices (where $q$ represents the aggregate dividend yield of the index) and on foreign exchange (where the foreign interest rate plays the role of $q$, a formulation known as the Garman-Kohlhagen model).
