import { ContextIdFactory, REQUEST } from '@nestjs/core';
import { CommandBus } from './command-bus';
import { ICommandBus } from './interfaces/commands/command-bus.interface';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { ICommand } from './interfaces';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientCommandBus implements ICommandBus {
  constructor(private commandBus: CommandBus, @Inject(REQUEST) private request: unknown) {}

  execute<T extends ICommand>(command: T): Promise<any> {
    return this.commandBus.execute(command, ContextIdFactory.getByRequest(this.request));
  }
}
