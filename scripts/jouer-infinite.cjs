// Lance la partie infinie dans son propre dossier d'état, sans toucher aux autres parties.
const path=require('path');
process.env.CHARMED_SCENARIO='infinite';
process.env.CHARMED_STATE_DIR=process.env.CHARMED_STATE_DIR||path.resolve(__dirname,'../etat/charmed/infinite');
process.argv[2]=process.argv[2]||'3131';
require('../serveur/serveur');
