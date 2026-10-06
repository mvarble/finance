<script>
    import { palette } from '@mvarble/mesearch/palette';
    import { moneyness, skews } from './skew.js';

    let plot;

    // The polynomial through the tabulated points of one skew, evaluated at `x`.
    function interpolate(volatility, x) {
        return moneyness.reduce((sum, xi, i) => {
            const basis = moneyness.reduce(
                (product, xj, j) => (j == i ? product : (product * (x - xj)) / (xi - xj)),
                1,
            );
            return sum + volatility[i] * basis;
        }, 0);
    }

    // Between the two tabulated expirations, the skew is taken to flatten in
    // proportion to the inverse square root of the time to expiration.
    const [near, far] = skews;
    const weight = (days) =>
        (days ** -0.5 - far.days ** -0.5) / (near.days ** -0.5 - far.days ** -0.5);

    const strikes = Array.from({ length: 21 }, (_, i) => 0.9 + 0.01 * i);
    const expirations = [30, 45, 60, 90, 120, 150, 180, 240, 300, 365];
    const surface = expirations.map((days) =>
        strikes.map((x) => {
            const short = interpolate(near.volatility, x);
            const long = interpolate(far.volatility, x);
            return long + weight(days) * (short - long);
        }),
    );

    $effect(() => {
        const data = [
            {
                type: 'contour',
                x: strikes,
                y: expirations,
                z: surface,
                // One hue, from faint to full, for the level of volatility.
                colorscale: [
                    [0, palette.rule],
                    [1, palette.series[0]],
                ],
                contours: {
                    start: 14,
                    end: 24,
                    size: 1,
                    showlabels: true,
                    labelformat: '.0f',
                    labelfont: { family: palette.fontUi, size: 11, color: palette.ink },
                },
                line: { color: palette.paperRaised, width: 1 },
                colorbar: {
                    title: { text: 'Implied volatility', side: 'right' },
                    ticksuffix: '%',
                    thickness: 12,
                    len: 0.8,
                    outlinewidth: 0,
                    tickfont: { color: palette.muted },
                },
                hovertemplate:
                    'Moneyness %{x:.2f}<br>%{y} days<br>Volatility %{z:.1f}%<extra></extra>',
            },
        ];
        const axis = {
            color: palette.muted,
            gridcolor: palette.rule,
            zerolinecolor: palette.ruleStrong,
            showgrid: false,
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
            yaxis: {
                ...axis,
                title: { text: 'Days to expiration' },
                tickvals: [30, 90, 180, 270, 365],
            },
            hoverlabel: { bgcolor: palette.paper, bordercolor: palette.ruleStrong },
            margin: { t: 16, r: 16, b: 52, l: 60 },
            height: 400,
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
        aria-label="Contours of an implied volatility surface over moneyness and days to expiration, highest at low strikes and short expirations"
    ></div>
    <figcaption>
        An illustrative volatility surface for an equity index, seen from above with its contours
        labelled in percent. It is drawn through the two skews of the example, not from market
        quotes. Volatility is highest in the corner of low strikes and short expirations, and the
        contours spread apart as the skew flattens with time.
    </figcaption>
</figure>

<style>
    .plot {
        min-height: 400px;
    }
</style>
