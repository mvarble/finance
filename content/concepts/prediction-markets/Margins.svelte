<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    // The cost of trading each instrument, as a share of the amount traded.
    const margins = [
        { name: 'Stock: 1¢ spread on a $100 share', margin: (0.01 / 100) * 100 },
        { name: 'Sports bet: both sides at −110', margin: (10 / 220) * 100 },
        { name: 'Event contract: 4¢ spread at 55¢', margin: (0.04 / 0.55) * 100 },
    ];

    $effect(() => {
        const data = [
            {
                type: 'bar',
                orientation: 'h',
                y: margins.map(({ name }) => name),
                x: margins.map(({ margin }) => margin),
                width: 0.5,
                marker: { color: palette.series[0] },
                text: margins.map(({ margin }) => `${margin.toFixed(2)}%`),
                textposition: 'outside',
                textfont: { color: palette.ink },
                cliponaxis: false,
                hovertemplate: '%{y}: %{x:.2f}%<extra></extra>',
            },
        ];
        const layout = {
            paper_bgcolor: palette.paperRaised,
            plot_bgcolor: palette.paperRaised,
            font: { family: palette.fontUi, color: palette.ink },
            barcornerradius: 4,
            xaxis: {
                color: palette.muted,
                gridcolor: palette.rule,
                zerolinecolor: palette.ruleStrong,
                title: { text: 'Margin as a share of the amount traded' },
                ticksuffix: '%',
                range: [0, 8.5],
            },
            yaxis: { color: palette.ink, autorange: 'reversed', automargin: true, ticks: '' },
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            margin: { t: 16, r: 24, b: 52, l: 8, pad: 8 },
            height: 240,
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
        aria-label="Margins of 0.01 percent on a stock, 4.55 percent on a sports bet and 7.27 percent on an event contract"
    ></div>
    <figcaption>
        The margin taken on three trades, as a share of the amount traded. The bar for the stock is
        too short to see: the margin on a bet or an event contract is several hundred times larger.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 240px;
    }
</style>
