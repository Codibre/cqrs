import { CommandBus } from './command-bus';
import { ICommandBus } from './interfaces/commands/command-bus.interface';
import { Injectable, Scope } from '@nestjs/common';
import { ICommand } from './interfaces';
import { ModuleRef } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientQueryBus implements ICommandBus {
  constructor(private commandBus: CommandBus, private moduleRef: ModuleRef) {}

  execute<T extends ICommand>(command: T): Promise<any> {
    return this.commandBus.execute(command, this.moduleRef);
  }
}
