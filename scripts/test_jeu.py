import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('jeu', Path(__file__).resolve().parents[1] / 'jeu.py')
jeu = importlib.util.module_from_spec(spec)
spec.loader.exec_module(jeu)


class SessionTests(unittest.TestCase):
    def test_identity_and_new_messages(self):
        self.assertEqual(jeu.session_id('partie'), jeu.session_id('partie'))
        self.assertNotEqual(jeu.session_id('partie:arbitrage'), jeu.session_id('partie:commanditaire'))
        message = {'plateau': {'day': 1, 'arbitration': [{'text': 'premier'}]}}
        first, cursors = jeu.prepare(message, {})
        self.assertEqual(len(first['fil']['arbitration']), 1)
        second, _ = jeu.prepare(message, {'cursors': cursors})
        self.assertEqual(second['fil']['arbitration'], [])
        message['plateau']['arbitration'].append({'text': 'nouveau'})
        third, _ = jeu.prepare(message, {'cursors': cursors})
        self.assertEqual(third['fil']['arbitration'], [{'text': 'nouveau'}])
        self.assertNotIn('arbitration', third['plateau'])
        message['plateau']['arbitration'][0]['text'] = 'branche différente'
        reset, _ = jeu.prepare(message, {'cursors': cursors})
        self.assertEqual(len(reset['fil']['arbitration']), 2)


if __name__ == '__main__':
    unittest.main()
