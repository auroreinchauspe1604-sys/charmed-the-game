const path=require('path');
process.env.CHARMED_SCENARIO='sanctuaire-de-wyatt';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/sanctuaire-de-wyatt');
process.argv[2]='3134';
require('../serveur/serveur');
