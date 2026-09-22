const path=require('path');
process.env.CHARMED_SCENARIO='le-livre-qui-se-defait';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/le-livre-qui-se-defait');
process.argv[2]='3142';
require('../serveur/serveur');
