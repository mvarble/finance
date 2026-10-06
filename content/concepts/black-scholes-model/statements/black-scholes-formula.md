---
type: statement
kind: theorem
title: Black-Scholes formula
---

Under the assumptions of the model, the price at time $0$ of a European call with strike $K$ and expiration $T$, on a stock whose price is $S_0$, is

$$
	C = S_0 \, \Phi(d_1) - K e^{-rT} \Phi(d_2), @tag(bs-call)
$$

where $\Phi$ is the cumulative distribution function of the standard normal distribution and

$$
	d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T}. @tag(d1d2)
$$

The price of the European put with the same strike and expiration is

$$
	P = K e^{-rT}\Phi(-d_2) - S_0 \,\Phi(-d_1). @tag(bs-put)
$$
