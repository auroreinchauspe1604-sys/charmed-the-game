const path=require('path');
process.env.CHARMED_SCENARIO='ce-que-rodriguez-cherche';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/ce-que-rodriguez-cherche');
process.argv[2]='3135';
require('../serveur/serveur');
