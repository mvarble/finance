<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    // The two values the stock may turn out to have, equally likely.
    const high = 53;
    const low = 47;
    const mid = (high + low) / 2;
    // The share of traders who know which, in percent.
    const informed = Array.from({ length: 101 }, (_, i) => i);
    // The quotes at which the market maker expects to break even on each side.
    const ask = informed.map((share) => mid + ((share / 100) * (high - low)) / 2);
    const bid = informed.map((share) => mid - ((share / 100) * (high - low)) / 2);

    $effect(() => {
        const line = (name, y, color) => ({
            x: informed,
            y,
            name,
            type: 'scatter',
            mode: 'lines',
            line: { color, width: 2 },
            hovertemplate: '%{y:$.2f}',
        });
        const data = [line('Ask', ask, palette.series[0]), line('Bid', bid, palette.series[1])];
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
                title: { text: 'Share of traders who are informed' },
                ticksuffix: '%',
                range: [0, 100],
            },
            yaxis: { ...axis, title: { text: 'Break-even quote' }, tickprefix: '$' },
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
        aria-label="Break-even bid and ask against the share of informed traders, for a stock worth 47 or 53 dollars"
    ></div>
    <figcaption>
        The bid and ask at which a market maker breaks even, for a stock that will be worth $47 or
        $53. With no informed traders both quotes sit at $50. They part in proportion to the share
        of traders who know the outcome.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 340px;
    }
</style>
