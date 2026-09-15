const path=require('path');
process.env.CHARMED_SCENARIO='ce-que-gideon-prepare';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/ce-que-gideon-prepare');
process.argv[2]='3137';
require('../serveur/serveur');
