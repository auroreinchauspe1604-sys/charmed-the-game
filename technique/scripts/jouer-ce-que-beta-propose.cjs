const path=require('path');
process.env.CHARMED_SCENARIO='ce-que-beta-propose';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/ce-que-beta-propose');
process.argv[2]='3139';
require('../serveur/serveur');
