# SP.js
A comprehensive object oriented modular package for deploying interacting with and testing *Satoshi's Palace* smart contracts.

## Usage
Add the following to your `package.json` `dependencies`
```
	"spjs": "github:SatoshisPalace/SP.js"
```

Add the following to your projects `tscongig.json` `compilerOptions`:
```
    "baseUrl": ".",
    "paths": {
            "spjs": [
        "node_modules/spjs"
      ],
    }
```
## Modules
### [Snip20](./src/modules/snip20/admin/)
### [Snip721](./src/modules/snip721/amm_pair)
### [Shade](./src/modules/shade/factory)
#### [Admin](./src/modules/shade/lp_token)
#### [AmmPair](./src/modules/shade/router)
#### [Factory](./src/modules/shade/factory)
#### [Router](./src/modules/shade/)


## Development

### Deployment
```
npm run deploy
```

### Compile
```
nvm install
```
```
nvm use
```
```
npm install
```
```
npm run build
```
### [Tests](./src/tests/)
```
npm run test
```