const path=require('path');
process.env.CHARMED_SCENARIO='la-dette-des-halliwell';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/la-dette-des-halliwell');
process.argv[2]='3140';
require('../serveur/serveur');
