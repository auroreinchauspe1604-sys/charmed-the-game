const path=require('path');
process.env.CHARMED_SCENARIO='le-livre-qui-refuse';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/le-livre-qui-refuse');
process.argv[2]='3141';
require('../serveur/serveur');
