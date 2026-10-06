<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    const S0 = 100;
    const mu = 0.08;
    const sigma = 0.2;
    const steps = 252;
    const dt = 1 / steps;
    const t = Array.from({ length: steps + 1 }, (_, i) => i * dt);

    // A seeded generator (mulberry32), so that every reader sees the same paths.
    function generator(seed) {
        return () => {
            seed = (seed + 0x6d2b79f5) | 0;
            let z = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
            return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
        };
    }
    const uniform = generator(1973);
    // A standard normal draw, by the Box-Muller transform.
    const normal = () =>
        Math.sqrt(-2 * Math.log(1 - uniform())) * Math.cos(2 * Math.PI * uniform());

    // Each step multiplies the price by the exact lognormal increment.
    const paths = Array.from({ length: 12 }, () => {
        const path = [S0];
        for (let i = 0; i < steps; i++) {
            const step = (mu - sigma ** 2 / 2) * dt + sigma * Math.sqrt(dt) * normal();
            path.push(path[i] * Math.exp(step));
        }
        return path;
    });
    const mean = t.map((s) => S0 * Math.exp(mu * s));

    $effect(() => {
        const data = [
            ...paths.map((y, i) => ({
                x: t,
                y,
                name: 'Sample paths',
                legendgroup: 'paths',
                showlegend: i == 0,
                type: 'scatter',
                mode: 'lines',
                line: { color: palette.series[0], width: 1 },
                opacity: 0.55,
                hoverinfo: 'skip',
            })),
            {
                x: t,
                y: mean,
                name: 'Expected price',
                type: 'scatter',
                mode: 'lines',
                line: { color: palette.series[1], width: 2.5 },
                hovertemplate: 'Year %{x:.2f}: %{y:$.2f}<extra></extra>',
            },
        ];
        const axis = {
            color: palette.muted,
            gridcolor: palette.rule,
            zerolinecolor: palette.ruleStrong,
        };
        const layout = {
            paper_bgcolor: palette.paperRaised,
            plot_bgcolor: palette.paperRaised,
            font: { family: palette.fontUi, color: palette.ink },
            xaxis: { ...axis, title: { text: 'Time in years' } },
            yaxis: { ...axis, title: { text: 'Stock price' }, tickprefix: '$' },
            legend: { orientation: 'h', x: 0, y: 1.14 },
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            margin: { t: 16, r: 16, b: 52, l: 56 },
            height: 360,
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
        aria-label="Twelve simulated paths of a geometric Brownian motion over one year, with the expected price"
    ></div>
    <figcaption>
        Twelve simulated paths of a geometric Brownian motion that starts at $100, with a drift of
        8% and a volatility of 20% a year. The expected price grows smoothly while the paths spread
        out around it, more widely the longer they run.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 360px;
    }
</style>
