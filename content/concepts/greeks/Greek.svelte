<script>
    import { palette } from '@mvarble/mesearch/palette';

    // Which Greek to draw: 'delta', 'gamma', 'vega' or 'theta'.
    let { greek } = $props();
    let plot;

    const K = 100;
    const r = 0.05;
    const sigma = 0.2;
    const S = Array.from({ length: 161 }, (_, i) => 60 + 0.5 * i);
    // The same three expirations, in the same colours, in every plot.
    const expirations = [
        { tau: 1, name: 'One year' },
        { tau: 0.25, name: 'Three months' },
        { tau: 2 / 52, name: 'Two weeks' },
    ];

    const phi = (x) => Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI);
    // The standard normal distribution function, by the approximation 26.2.17
    // of Abramowitz and Stegun, which is accurate to about 1e-7.
    function Phi(x) {
        const t = 1 / (1 + 0.2316419 * Math.abs(x));
        const poly =
            t *
            (0.31938153 +
                t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
        return x >= 0 ? 1 - phi(x) * poly : phi(x) * poly;
    }
    const d1 = (s, tau) =>
        (Math.log(s / K) + (r + sigma ** 2 / 2) * tau) / (sigma * Math.sqrt(tau));

    // Each Greek of a call, in the units a trader quotes it in.
    const greeks = {
        delta: {
            title: 'Delta of a call',
            value: (s, tau) => Phi(d1(s, tau)),
            format: '.3f',
            label: 'Delta of a call against the stock price',
            caption:
                'The delta of a call with strike $100. It climbs from 0 to 1 as the stock passes through the strike, and the climb sharpens into a step as expiration nears.',
        },
        gamma: {
            title: 'Gamma',
            value: (s, tau) => phi(d1(s, tau)) / (s * sigma * Math.sqrt(tau)),
            format: '.4f',
            label: 'Gamma against the stock price',
            caption:
                'The gamma of an option with strike $100, which is the slope of the delta curve. It concentrates at the strike, in an ever taller and narrower peak, as expiration nears.',
        },
        vega: {
            title: 'Vega per volatility point',
            value: (s, tau) => (s * Math.sqrt(tau) * phi(d1(s, tau))) / 100,
            format: '$.3f',
            label: 'Vega against the stock price',
            caption:
                'The vega of an option with strike $100, in dollars per share for each percentage point of volatility. Like gamma it peaks near the strike, but it shrinks as expiration nears.',
        },
        theta: {
            title: 'Theta of a call per day',
            value: (s, tau) => {
                const d = d1(s, tau);
                const decay = -(s * sigma * phi(d)) / (2 * Math.sqrt(tau));
                const carry = -r * K * Math.exp(-r * tau) * Phi(d - sigma * Math.sqrt(tau));
                return (decay + carry) / 365;
            },
            format: '$.3f',
            label: 'Theta of a call against the stock price',
            caption:
                'The theta of a call with strike $100, in dollars per share for each calendar day. It is negative throughout, and the loss is fastest at the strike close to expiration.',
        },
    };
    const chosen = $derived(greeks[greek]);

    $effect(() => {
        const { title, value, format } = chosen;
        const data = expirations.map(({ tau, name }, i) => ({
            x: S,
            y: S.map((s) => value(s, tau)),
            name,
            type: 'scatter',
            mode: 'lines',
            line: { color: palette.series[i], width: 2 },
            hovertemplate: `%{y:${format}}`,
        }));
        const axis = {
            color: palette.muted,
            gridcolor: palette.rule,
            zerolinecolor: palette.ruleStrong,
        };
        const layout = {
            paper_bgcolor: palette.paperRaised,
            plot_bgcolor: palette.paperRaised,
            font: { family: palette.fontUi, color: palette.ink },
            xaxis: { ...axis, title: { text: 'Stock price' }, tickprefix: '$' },
            yaxis: { ...axis, title: { text: title } },
            legend: { orientation: 'h', x: 0, y: 1.16 },
            hovermode: 'x unified',
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            margin: { t: 16, r: 16, b: 52, l: 64 },
            height: 320,
        };
        import('plotly.js/dist/plotly-cartesian.min.js').then(({ default: Plotly }) =>
            Plotly.react(plot, data, layout, { displayModeBar: false, responsive: true }),
        );
    });
</script>

<figure>
    <div bind:this={plot} class="plot" role="img" aria-label={chosen.label}></div>
    <figcaption>{chosen.caption}</figcaption>
</figure>

<style>
    .plot {
        min-height: 320px;
    }
</style>
