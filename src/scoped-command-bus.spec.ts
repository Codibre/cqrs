import { ContextIdFactory, REQUEST } from '@nestjs/core';
import { CommandBus } from './command-bus';
import { ScopedCommandBus } from './scoped-command-bus';


describe('ScopedCommandBus', () => {
    let target: ScopedCommandBus;
    let commandBus: CommandBus;

    beforeEach(() => {
        commandBus = {} as any,
        target = new ScopedCommandBus(commandBus, 'current request');
    });

    describe('.execute()', () => {
        let getByRequest: jest.SpyInstance;

        beforeEach(() => {
            getByRequest = jest.spyOn(ContextIdFactory, 'getByRequest').mockReturnValue({ id: 1234 });
            commandBus.execute = jest.fn().mockResolvedValue('expected result')
        });

        it('should pass the contextId of the current request to commandBus.execute', async () => {
            const result = await target.execute('command');

            expect(getByRequest).toHaveBeenCalledTimes(1);
            expect(getByRequest).toHaveBeenCalledWith('current request');
            expect(commandBus.execute).toHaveBeenCalledTimes(1);
            expect(commandBus.execute).toHaveBeenCalledWith('command', { id: 1234 });
            expect(result).toBe('expected result');
        });
    });
});