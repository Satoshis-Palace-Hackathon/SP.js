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
```
const snip721ContractInfo: ContractInfo = {
  "code_hash": "faa08c2beb13a806de944da991642f01898149ac5da9cb0f06464275bfc3aa05",
  "address": "secret1gvmpnmq0sxsj5jtls4u2c4wnrc5p46krry4pk8"
}
const snip721 = new Snip721(snip721ContractInfo, secretjs);
const config = await snip721.contract_config();
const ownerOfToken = snip721.owner_of("token_id")
```
# Shade
## Shade
## Router
## Factory
## Amm Pair
