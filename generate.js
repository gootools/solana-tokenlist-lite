const { writeFileSync } = require("fs");
const fetch = require("isomorphic-fetch");

fetch(
  "https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json"
)
  .then((raw) => raw.json())
  .then((list) => {
    writeFileSync("solana.tokenlist.json", JSON.stringify(list, null, 2));

    return list.tokens
      .filter((t) => t.chainId === 101)
      .map(({ address, symbol, name, decimals, logoURI, tags, extensions }) => {
        const rest = {};

        rest.symbol = symbol;
        rest.name = name;
        rest.decimals = decimals;

        if (logoURI) {
          if (
            logoURI.trim() ===
            `https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/${address}/logo.png`
          ) {
            rest.logoURI = "ok";
          } else {
            rest.logoURI = logoURI;
          }
        } else {
          rest.logoURI = null;
        }

        // if (tags?.length > 0) {
        //   rest.tags = tags;
        // } else {
        //   rest.tags = [];
        // }
        rest.tags = tags;
        rest.coingeckoId = extensions?.coingeckoId;

        return [address, rest];
      })
      .reduce((acc, [address, val]) => {
        acc[address] = Object.values(val);
        // acc[address] = val;
        return acc;
      }, {});
  })
  .then((filtered) =>
    writeFileSync("solana.tokenlist.lite.json", JSON.stringify(filtered))
  );
