const path=require('path');
process.env.CHARMED_SCENARIO='le-proces-de-rebecca-warren';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/le-proces-de-rebecca-warren');
process.argv[2]='3142';
require('../serveur/serveur');
