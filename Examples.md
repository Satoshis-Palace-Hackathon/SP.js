# PreReq
	const secretjs = getSecretNetworkClient(); // Could come from browser or self defined
# Snip20
```
const snip20ContractInfo: ContractInfo = {
  code_hash: "ef8fd7734b3d8a2f5372836955c73e41d111303576857efa8e2c8c898f1c906c",
  address: "secret1lfq3zvlvhrl3nlx074fcwrxdxlyhapt7gssxw4"
};
const snip20 = new Snip20(snip20ContractInfo, secretjs);

const tx = await snip20.mint(secretjs.address, "1000000");
const tx = await snip20.set_viewing_key(viewingKey);
const userBalance = await snip20.balance(viewingKey);
```
# Snip721
# Shade
## Shade
## Router
## Factory
## Amm Pair
