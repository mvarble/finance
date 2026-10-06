<script>
    import { palette } from '@mvarble/mesearch/palette';

    let plot;

    // The two option sales of the example, each on 100 shares.
    const shares = 100;
    const put = { strike: 95, premium: 2 };
    const call = { strike: 97, premium: 1.5, cost: 95 };
    const price = Array.from({ length: 81 }, (_, i) => 85 + 0.25 * i);

    // Profit at expiration of the put that was sold, with its premium.
    const putProfit = price.map((s) => shares * (Math.min(s - put.strike, 0) + put.premium));
    // Profit at expiration of the shares bought at `cost` with a call sold on them.
    const callProfit = price.map(
        (s) => shares * (Math.min(s, call.strike) - call.cost + call.premium),
    );

    $effect(() => {
        const line = (name, y, color) => ({
            x: price,
            y,
            name,
            type: 'scatter',
            mode: 'lines',
            line: { color, width: 2 },
            hovertemplate: '%{y:$,.0f}',
        });
        const data = [
            line(`Cash-secured put, strike $${put.strike}`, putProfit, palette.series[0]),
            line(`Covered call, strike $${call.strike}`, callProfit, palette.series[1]),
        ];
        const axis = {
            color: palette.muted,
            gridcolor: palette.rule,
            zerolinecolor: palette.muted,
        };
        const layout = {
            paper_bgcolor: palette.paperRaised,
            plot_bgcolor: palette.paperRaised,
            font: { family: palette.fontUi, color: palette.ink },
            xaxis: { ...axis, title: { text: 'Stock price at expiration' }, tickprefix: '$' },
            yaxis: { ...axis, title: { text: 'Profit on 100 shares' }, tickformat: '$,.0f' },
            legend: { orientation: 'h', x: 0, y: 1.16 },
            hovermode: 'x unified',
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            margin: { t: 16, r: 16, b: 52, l: 68 },
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
        aria-label="Profit at expiration of the cash-secured put and of the covered call of the example, against the stock price"
    ></div>
    <figcaption>
        Profit at expiration of each step of the example: the put sold for $2 a share, and the
        shares bought at $95 with a call sold on them for $1.50 a share. Both are capped above their
        strike and fall dollar for dollar with the stock below it.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 340px;
    }
</style>
