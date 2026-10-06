---
type: statement
kind: proposition
title: Put-call parity
---

Let $C$ and $P$ be the prices today of a European call and a European put with the same strike $K$ and the same expiration $T$, written on an asset that pays no dividends and whose price today is $S_0$. Let $r$ be the continuously compounded risk-free rate. If there are no arbitrage opportunities, then

$$
	C - P = S_0 - K e^{-rT}. @tag(put-call-parity)
$$
