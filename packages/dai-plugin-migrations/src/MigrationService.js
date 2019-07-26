import { PublicService } from '@makerdao/services-core';
import { ServiceRoles, Migrations } from './constants';
import SingleToMultiCdp from './migrations/SingleToMultiCdp';
import GlobalSettlementSavingsDai from './migrations/GlobalSettlementSavingsDai';

const migrations = {
  [Migrations.SINGLE_TO_MULTI_CDP]: SingleToMultiCdp,
  [Migrations.GLOBAL_SETTLEMENT_SAVINGS_DAI]: GlobalSettlementSavingsDai
};

export default class MigrationService extends PublicService {
  constructor(name = ServiceRoles.MIGRATION) {
    super(name, [
      'smartContract',
      'accounts',
      'cdp',
      'proxy',
      'mcd:globalSettlement',
      'mcd:savings'
    ]);
  }

  getAllMigrationsIds() {
    return Object.values(Migrations);
  }

  getMigration(id) {
    const migration = migrations[id];
    return migration && new migration(this);
  }
}
