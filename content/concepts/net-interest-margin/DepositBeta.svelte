<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    // Rates in percent. Deposit rates start from zero with the market rate and
    // follow it at the fraction given by the beta.
    const market = Array.from({ length: 61 }, (_, i) => i / 10);
    const curves = [
        { beta: 1, name: 'Market rate' },
        { beta: 0.4, name: 'Deposit rate, beta 0.4' },
        { beta: 0.2, name: 'Deposit rate, beta 0.2' },
    ];

    $effect(() => {
        const data = curves.map(({ beta, name }, i) => ({
            x: market,
            y: market.map((rate) => beta * rate),
            name,
            type: 'scatter',
            mode: 'lines',
            line: { color: palette.series[i], width: 2 },
            hovertemplate: '%{y:.2f}%',
        }));
        const axis = {
            color: palette.muted,
            gridcolor: palette.rule,
            zerolinecolor: palette.ruleStrong,
            ticksuffix: '%',
        };
        const layout = {
            paper_bgcolor: palette.paperRaised,
            plot_bgcolor: palette.paperRaised,
            font: { family: palette.fontUi, color: palette.ink },
            xaxis: { ...axis, title: { text: 'Market rate' } },
            yaxis: { ...axis, title: { text: 'Rate earned or paid' } },
            legend: { orientation: 'h', x: 0, y: 1.16 },
            hovermode: 'x unified',
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            margin: { t: 16, r: 16, b: 52, l: 56 },
            height: 340,
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
        aria-label="The market rate and the rate paid on deposits at betas of 0.4 and 0.2, as the market rate rises from 0 to 6 percent"
    ></div>
    <figcaption>
        The rate a bank pays on deposits as the market rate rises from zero, for two deposit betas.
        The deposit spread is the gap between a deposit line and the market line, and the lower the
        beta, the faster it opens.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 340px;
    }
</style>
