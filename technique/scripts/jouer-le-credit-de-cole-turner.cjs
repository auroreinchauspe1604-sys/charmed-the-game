const path=require('path');
process.env.CHARMED_SCENARIO='le-credit-de-cole-turner';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/le-credit-de-cole-turner');
process.argv[2]='3136';
require('../serveur/serveur');
