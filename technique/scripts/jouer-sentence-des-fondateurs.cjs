const path=require('path');
process.env.CHARMED_SCENARIO='sentence-des-fondateurs';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/sentence-des-fondateurs');
process.argv[2]='3133';
require('../serveur/serveur');
