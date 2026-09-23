'use strict';
// Relance UNIQUEMENT le serveur du procès de Rebecca Warren (port 3142).
// Les autres parties en cours ne sont pas touchées.
const { execSync, spawn } = require('child_process');
const path = require('path');
let tues = [];
try {
  const out = execSync('netstat -ano -p tcp', { encoding: 'latin1' });
  for (const l of out.split(/\r?\n/)) {
    const m = l.match(/^\s*TCP\s+\S+:3142\s+\S+\s+LISTENING\s+(\d+)/);
    if (m) tues.push(m[1]);
  }
  for (const pid of [...new Set(tues)]) {
    try { execSync('taskkill /PID ' + pid + ' /F', { stdio: 'ignore' }); } catch (e) {}
  }
} catch (e) {}
console.log('processus arretes sur 3142 : ' + ([...new Set(tues)].join(', ') || 'aucun'));

const racine = path.resolve(__dirname, '..', '..');
const enfant = spawn(process.execPath, [path.join(racine, 'technique', 'scripts', 'jouer-le-proces-de-rebecca-warren.cjs')],
  { cwd: racine, detached: true, stdio: 'ignore' });
enfant.unref();
console.log('serveur relance, pid ' + enfant.pid);
setTimeout(() => {
  require('http').get('http://localhost:3142/', r => {
    console.log('page : HTTP ' + r.statusCode);
    process.exit(0);
  }).on('error', e => { console.log('ERREUR : ' + e.message); process.exit(1); });
}, 4000);
