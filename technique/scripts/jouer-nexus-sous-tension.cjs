const path=require('path');
process.env.CHARMED_SCENARIO='nexus-sous-tension';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/nexus-sous-tension');
process.argv[2]='3132';
require('../serveur/serveur');
