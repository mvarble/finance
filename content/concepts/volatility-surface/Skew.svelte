<script>
    import { palette } from '@mvarble/mesearch/palette';
    import { moneyness, skews } from './skew.js';

    let plot;

    $effect(() => {
        const data = skews.map(({ name, volatility }, i) => ({
            x: moneyness,
            y: volatility,
            name,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: palette.series[i], width: 2 },
            marker: { size: 9, line: { color: palette.paperRaised, width: 2 } },
            hovertemplate: '%{y:.1f}%',
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
            xaxis: {
                ...axis,
                title: { text: 'Moneyness (strike over index level)' },
                tickvals: moneyness,
                tickformat: '.2f',
            },
            yaxis: { ...axis, title: { text: 'Implied volatility' }, ticksuffix: '%' },
            legend: { orientation: 'h', x: 0, y: 1.16 },
            hovermode: 'x unified',
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            margin: { t: 16, r: 16, b: 52, l: 60 },
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
        aria-label="Implied volatility against moneyness for options expiring in 30 days and in one year"
    ></div>
    <figcaption>
        The implied volatilities of the example, by strike. Under the Black-Scholes assumptions both
        curves would be the same flat line. The 30-day skew is the steeper of the two.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 340px;
    }
</style>
