const usdToBTC = (amount, btcRate) => {
  let bitcoin = amount / btcRate;
  let bitcoinCalculation = Math.round(bitcoin * 1.0e8) / 1.0e8;
  return bitcoinCalculation;
};

export { usdToBTC };
