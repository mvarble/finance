<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    // The standard normal distribution function, by the approximation 26.2.17
    // of Abramowitz and Stegun, which is accurate to about 1e-7.
    function Phi(x) {
        const t = 1 / (1 + 0.2316419 * Math.abs(x));
        const poly =
            t *
            (0.31938153 +
                t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
        const tail = (Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI)) * poly;
        return x >= 0 ? 1 - tail : tail;
    }

    // The Black-Scholes price of a call with a time `tau` left to expiration.
    function call(S, K, r, sigma, tau) {
        if (tau <= 0) return Math.max(S - K, 0);
        const d1 = (Math.log(S / K) + (r + sigma ** 2 / 2) * tau) / (sigma * Math.sqrt(tau));
        return S * Phi(d1) - K * Math.exp(-r * tau) * Phi(d1 - sigma * Math.sqrt(tau));
    }

    const K = 105;
    const r = 0.05;
    const sigma = 0.2;
    const S = Array.from({ length: 141 }, (_, i) => 70 + 0.5 * i);
    const curves = [
        { tau: 1, name: 'One year' },
        { tau: 0.5, name: 'Six months' },
        { tau: 1 / 12, name: 'One month' },
        { tau: 0, name: 'At expiration' },
    ];
    const example = { S: 100, tau: 0.5 };
    const examplePrice = call(example.S, K, r, sigma, example.tau);

    $effect(() => {
        const data = curves.map(({ tau, name }, i) => ({
            x: S,
            y: S.map((s) => call(s, K, r, sigma, tau)),
            name,
            type: 'scatter',
            mode: 'lines',
            line: { color: palette.series[i], width: 2 },
            hovertemplate: '%{y:$.2f}',
        }));
        data.push({
            x: [example.S],
            y: [examplePrice],
            type: 'scatter',
            mode: 'markers',
            marker: {
                color: palette.series[1],
                size: 9,
                line: { color: palette.paperRaised, width: 2 },
            },
            showlegend: false,
            hoverinfo: 'skip',
        });
        const axis = {
            color: palette.muted,
            gridcolor: palette.rule,
            zerolinecolor: palette.ruleStrong,
            tickprefix: '$',
        };
        const layout = {
            paper_bgcolor: palette.paperRaised,
            plot_bgcolor: palette.paperRaised,
            font: { family: palette.fontUi, color: palette.ink },
            xaxis: { ...axis, title: { text: 'Stock price' } },
            yaxis: { ...axis, title: { text: 'Price of the call' } },
            legend: { orientation: 'h', x: 0, y: 1.14 },
            hovermode: 'x unified',
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            annotations: [
                {
                    x: example.S,
                    y: examplePrice,
                    text: `$${examplePrice.toFixed(2)}`,
                    font: { color: palette.ink },
                    showarrow: true,
                    arrowhead: 0,
                    arrowwidth: 1,
                    arrowcolor: palette.muted,
                    standoff: 6,
                    ax: -48,
                    ay: -48,
                },
            ],
            margin: { t: 16, r: 16, b: 52, l: 56 },
            height: 380,
        };
        import('plotly.js/dist/plotly-cartesian.min.js').then(({ default: Plotly }) =>
            Plotly.react(plot, data, layout, { displayModeBar: false, responsive: true }),
        );
    });
</script>

<figure>
    <div
        bind:this={plot}
        class="plot"
        role="img"
        aria-label="Black-Scholes price of a call with strike 105 against the stock price, at four times to expiration"
    ></div>
    <figcaption>
        The Black-Scholes price of a call with strike $105, at a rate of 5% and a volatility of 20%,
        for four times to expiration. The marked point is the worked example. As expiration nears,
        the price falls onto the payoff.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 380px;
    }
</style>
