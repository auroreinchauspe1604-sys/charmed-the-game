const path=require('path');
process.env.CHARMED_SCENARIO='ce-que-christy-rapporte';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/ce-que-christy-rapporte');
process.argv[2]='3138';
require('../serveur/serveur');
