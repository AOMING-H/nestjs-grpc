import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HeroController } from './HeroController';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: 'hero', // ['hero', 'hero2']
          protoPath: join(__dirname, './hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
        },
      },
    ]),
  ],
  controllers: [HeroController],
})
export class HeroModule { }
