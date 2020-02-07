import {
  setupTestMakerInstance,
  restoreSnapshotOriginal,
  sleep
} from './helpers';
import SpellService from '../src/SpellService';

let maker, spellService;
beforeAll(async () => {
  maker = await setupTestMakerInstance('mainnet');
  spellService = maker.service('spell');
});

afterAll(async done => {
  if (global.useOldChain) {
    await restoreSnapshotOriginal(global.snapshotId);
    done();
  } else {
    global.client.restoreSnapshot(global.testchainId, global.defaultSnapshotId);
    await sleep(15000);

    await global.client.delete(global.testchainId);
    await sleep(15000);

    done();
  }
});

test('can create spell Service', async () => {
  expect(spellService).toBeInstanceOf(SpellService);
});

test('get spell execution date', async () => {
  const date = await spellService.getExecutionDate(
      '0x48916a2b11fa7a895426eedf9acf2d70523b1677'
    );
  expect(date).toEqual(new Date('2020-02-04T11:35:48.000Z'));
});

test('get delay', async () => {
  const delay = await spellService.getDelayInSeconds();
  expect(delay.toNumber()).toBe(0);
});

//currently this test works for mainnet
test('get spell eta', async () => {
  const eta = await spellService.getEta(
    '0xf880d43bb9a32dd212c77b82a7336be31ecaee08'
  );
  console.log('eta', eta);
  expect(eta).toEqual(new Date('2020-01-26T11:53:19.000Z'));
});

//currently this test works for mainnet
test('get spell done boolean', async () => {
  const done = await spellService.getDone(
    '0xf880d43bb9a32dd212c77b82a7336be31ecaee08'
  );
  expect(done).toBe(true);
});

//currently this test works for mainnet
test('get spell action address', async () => {
  const action = await spellService.getAction(
    '0xf880d43bb9a32dd212c77b82a7336be31ecaee08'
  );
  expect(action).toBe('0x68D4e46c1ca8a346f82e36f324A9C0935041De79');
});
