import { Field, SmartContract, state, State, method, Reducer } from 'snarkyjs';

export class DKG extends SmartContract {
  /**
   * Root of the merkle tree that stores all generated keys.
   */
  @state(Field) keys = State<Field>();

  /**
   * Root of the merkle tree that stores usage counters of all generated keys.
   */
  @state(Field) keyUsage = State<Field>();

  reducer = Reducer({ actionType: Field });

  /**
   * TODO
   * Calculate generated public key from committee members' contributions
   * @param keyId
   * @returns
   */
  @method calculatePublicKey(keyId: Field) {
    return;
  }

  /**
   * TODO
   * Update key usage counter
   * @param keyId
   * @returns
   */
  @method updateKeyUsage(keyId: Field) {
    return;
  }
}
