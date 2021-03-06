import History from '../history.model';

// @ts-ignore
import mockData from './histories.mock.json';

/**
 * Insert the DB seeds for Histories collection
 */
function run() {
  History.collection.count({}).then(count => {
    if (count === 0) {
      History.insertMany(mockData)
        .then(_ => console.log('[HISTORY_SEEDER] Inserted all histories'))
        .catch(err => new Error('[HISTORY_SEEDER] Error on insertions'));
    }
  });
}

export default { run };
