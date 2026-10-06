<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    // An index of `count` equally weighted stocks, each with the same
    // volatility (in percent) and the same correlation with every other.
    const count = 20;
    const volatility = 30;
    const correlation = Array.from({ length: 101 }, (_, i) => i / 100);
    const index = correlation.map(
        (rho) => volatility * Math.sqrt(1 / count + (1 - 1 / count) * rho),
    );

    $effect(() => {
        const line = (name, y, color) => ({
            x: correlation,
            y,
            name,
            type: 'scatter',
            mode: 'lines',
            line: { color, width: 2 },
            hovertemplate: '%{y:.1f}%',
        });
        const data = [
            line(
                'Each stock',
                correlation.map(() => volatility),
                palette.series[0],
            ),
            line(`Index of ${count} stocks`, index, palette.series[1]),
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
            xaxis: { ...axis, title: { text: 'Correlation between each pair of stocks' } },
            yaxis: { ...axis, title: { text: 'Volatility' }, ticksuffix: '%', range: [0, 34] },
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
        aria-label="Volatility of an index of 20 stocks against the correlation between them, beside the 30 percent volatility of each stock"
    ></div>
    <figcaption>
        The volatility of an equally weighted index of 20 stocks, each with a volatility of 30%, as
        the correlation between them varies. The less the stocks move together, the calmer the index
        is than its members, and that gap is what a dispersion trade holds.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 340px;
    }
</style>
