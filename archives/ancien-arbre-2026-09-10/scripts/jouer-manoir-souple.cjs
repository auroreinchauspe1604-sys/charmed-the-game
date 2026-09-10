const path=require('path');
process.env.CHARMED_SCENARIO='manoir-assiege-souple';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../etat/charmed/manoir-assiege-souple');
process.argv[2]='3131';
require('../serveur/serveur');
