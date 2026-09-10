// Launch the selected campaign without altering the previous campaign journal.
const path=require('path');
process.env.CHARMED_SCENARIO='manoir-assiege';
process.env.CHARMED_STATE_DIR=path.resolve(__dirname,'../../etat/charmed/manoir-assiege');
process.argv[2]='3130';
require('../serveur/serveur');
