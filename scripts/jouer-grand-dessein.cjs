// Lance la campagne « Le Grand Dessein se défait » dans son propre dossier d'état, sans toucher aux autres parties.
const path=require('path');
process.env.CHARMED_SCENARIO='grand-dessein';
process.env.CHARMED_STATE_DIR=process.env.CHARMED_STATE_DIR||path.resolve(__dirname,'../etat/charmed/grand-dessein');
process.argv[2]=process.argv[2]||'3132';
require('../serveur/serveur');
