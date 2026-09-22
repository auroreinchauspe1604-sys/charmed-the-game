const path=require('path');
process.env.CHARMED_SCENARIO='ce-qui-sest-noue';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/ce-qui-sest-noue');
process.argv[2]='3143';
require('../serveur/serveur');
