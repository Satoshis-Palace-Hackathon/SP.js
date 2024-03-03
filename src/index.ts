export * from "./modules/shared"
import * as snip20 from './modules/snip20';
import * as snip721 from './modules/snip721';
import * as deployment from "./deployment"
import * as shade from "./modules/shade"
import "./polyfills"

import { Snip20Deployment, Snip721Deployment } from "./deployment"
// Re-export these namespaces
export {
	snip20,
	snip721,
	deployment,
	Snip20Deployment,
	Snip721Deployment,
	shade
};
