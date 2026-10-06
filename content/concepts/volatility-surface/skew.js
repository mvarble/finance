// Representative implied volatilities, in percent, of options on an equity
// index at two expirations: the numbers of the document's example, not quotes
// from any particular day.
export const moneyness = [0.9, 0.95, 1.0, 1.05, 1.1];
export const skews = [
    { days: 30, name: '30 days', volatility: [24.5, 19.8, 16.2, 14.1, 13.0] },
    { days: 365, name: 'One year', volatility: [20.1, 17.5, 15.8, 14.6, 13.8] },
];
