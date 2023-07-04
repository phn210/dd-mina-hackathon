import {
  Field,
  SmartContract,
  state,
  State,
  method,
  Poseidon,
  Struct,
  UInt32,
  PublicKey,
  MerkleWitness,
  Group,
  Scalar,
  Bool,
  Reducer,
} from 'snarkyjs';
import {
  CommitteeMember,
  ContributionStage,
  DecryptionContribution,
  Round1Contribution,
  Round2Contribution,
} from './CommitteeMember';

export const THRESHOLD = {
  T: 2,
  N: 3,
};

export class MerkleWitnessKey extends MerkleWitness(20) {}
export class MerkleWitnessCommittee extends MerkleWitness(
  Math.ceil(Math.log2(THRESHOLD.N))
) {}

export class Committee_ extends SmartContract {
  /**
   * Root of the merkle tree that stores all committee members.
   */
  @state(Field) committeeMembers = State<Field>();

  /**
   * Check if the member existed in the on-chain storage root
   * @param committeeMember
   * @returns
   */
  @method isMember(committeeMember: CommitteeMember): Bool {
    // Get committee member roots
    let committeeMembers = this.committeeMembers.get();
    this.committeeMembers.assertEquals(committeeMembers);

    return committeeMember.witness
      .calculateRoot(committeeMember.hash)
      .equals(committeeMembers);
  }
}

export abstract class CommitteeContribution_ extends SmartContract {
  /**
   * Root of the merkle tree that stores all contributions.
   */
  @state(Field) contributions = State<Field>();

  /**
   * Submit contribution for a specific stage in the key generation process
   * @param committeeMember
   * @param contribution
   * @param keyId
   * @returns
   */
  abstract submitContribution(
    committeeMember: CommitteeMember,
    contribution:
      | Round1Contribution
      | Round2Contribution
      | DecryptionContribution,
    keyId: Field
  ): void;

  /**
   * Check the status of a committee member's contribution in generating a key
   * @param committeeMember
   * @param keyId
   * @returns
   */
  abstract submittedContribution(
    committeeMember: CommitteeMember,
    keyId: Field
  ): [{ stage: Field; submitted: Bool }];
}

export class Round1Contribution_ extends CommitteeContribution_ {
  // TODO
  @method submitContribution(
    committeeMember: CommitteeMember,
    contribution: Round1Contribution,
    keyId: Field
  ) {
    let contributionHash = contribution.hash;
    return;
  }

  // TODO
  @method submittedContribution(
    committeeMember: CommitteeMember,
    keyId: Field
  ): [{ stage: Field; submitted: Bool }] {
    return [
      {
        stage: ContributionStage.ROUND_1,
        submitted: new Bool(false),
      },
    ];
  }
}
