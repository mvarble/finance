<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    const K = 100;
    const S = Array.from({ length: 81 }, (_, i) => 60 + i);

    $effect(() => {
        const line = (name, y, color) => ({
            x: S,
            y,
            name,
            type: 'scatter',
            mode: 'lines',
            line: { color, width: 2 },
            hovertemplate: '%{y:$.0f}',
        });
        const data = [
            line(
                'Call',
                S.map((s) => Math.max(s - K, 0)),
                palette.series[0],
            ),
            line(
                'Put',
                S.map((s) => Math.max(K - s, 0)),
                palette.series[1],
            ),
        ];
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
            xaxis: { ...axis, title: { text: 'Price of the underlying at expiration' } },
            yaxis: { ...axis, title: { text: 'Payoff' } },
            legend: { orientation: 'h', x: 0, y: 1.14 },
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
        aria-label="Payoff at expiration of a call and a put with strike 100"
    ></div>
    <figcaption>
        Payoffs at expiration of a European call and a European put, each with strike $100. Both are
        zero on one side of the strike and move one for one with the underlying on the other.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 340px;
    }
</style>
