import { Deposit } from './Deposit';
import { Withdrawal } from './Withdrawal';
import { Transfer } from './Transfer';
import { Payment } from './Payment';
import { Fee } from './Fee';
import { Chargeback } from './Chargeback';
class MovementFactory {
    static registry = new Map();

    static register(type, MovementClass) {
        this.registry.set(type, MovementClass);
    }

    static createMovement(data) {
        const MovementClass = this.registry.get(data.type);

        if (!MovementClass) {
            throw new Error(`Unknown movement type: ${data.type}`);
        }

        return new MovementClass(data);
    }
}

MovementFactory.register('deposit', Deposit);
MovementFactory.register('withdrawal', Withdrawal);
MovementFactory.register('transfer', Transfer);
MovementFactory.register('payment', Payment);
MovementFactory.register('fee', Fee);
MovementFactory.register('chargeback', Chargeback);

export default MovementFactory;