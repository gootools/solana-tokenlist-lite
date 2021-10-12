pnpm i

node generate.js

(copy dist/solana.tokenlist.lite.json)

output is a bit of a mix between csv and json

```
Record<address:string, [
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  tags: string[];
}]>
```
