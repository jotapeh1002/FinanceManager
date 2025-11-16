import { IHashProviders } from 'src/app/interfaces/iHashProviders';
import { HashProvider } from 'src/app/providers/hashProvider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [{ provide: IHashProviders, useClass: HashProvider }],
  exports: [IHashProviders],
})
export class HashModule {}
