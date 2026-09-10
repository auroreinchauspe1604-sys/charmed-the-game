'use strict';
const path=require('path');
process.env.CHARMED_SCENARIO='la-chasse-aux-guides';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/la-chasse-aux-guides');
process.argv[2]='3133';
require('../serveur/serveur');
