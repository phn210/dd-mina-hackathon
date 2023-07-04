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
} from 'snarkyjs';
import {
  CommitteeMember,
  DecryptionContribution,
  Round1Contribution,
  Round2Contribution,
} from './CommitteeMember';

export const THRESHOLD = {
  T: 2,
  N: 3,
};

export type Contribution = {
  type: ContributionStage;
  data: Round1Contribution | Round2Contribution | DecryptionContribution;
};

export enum ContributionStage {
  ROUND_1,
  ROUND_2,
  DECRYPTION,
}

export class MerkleWitness8 extends MerkleWitness(8) {}
export class MerkleWitnessCommittee extends MerkleWitness(
  Math.ceil(Math.log2(THRESHOLD.N))
) {}

let w = {
  isLeft: false,
  sibling: Field(0),
};
let dummyWitness = Array.from(Array(MerkleWitness8.height - 1).keys()).map(
  () => w
);

export class Committee_ extends SmartContract {
  /**
   * Root of the merkle tree that stores all committee members.
   */
  @state(Field) committeMembers = State<Field>();

  /**
   * TODO
   * Check if the member existed in the on-chain storage root
   * @param committeeMember
   * @returns
   */
  @method isMember(committeeMember: CommitteeMember): Bool {
    return new Bool(false);
  }
}

export class CommitteeContribution_ extends SmartContract {
  /**
   * Root of the merkle tree that stores all contributions.
   */
  @state(Field) contributions = State<Field>();

  /**
   * TODO
   * Submit contribution for a specific stage in the key generation process
   * @param committeeMember
   * @param contribution
   * @param keyId
   * @returns
   */
  @method submitContribution(
    committeeMember: CommitteeMember,
    contribution: Contribution,
    keyId: Field
  ) {
    let contributionHash = contribution.data.hash;

    switch (contribution.type) {
      case ContributionStage.ROUND_1: {
        break;
      }
      case ContributionStage.ROUND_2: {
        break;
      }
      case ContributionStage.DECRYPTION: {
        break;
      }
    }
    return;
  }

  /**
   * TODO
   * Check the status of a committee member's contribution in generating a key
   * @param committeeMember
   * @param keyId
   * @returns
   */
  @method submittedContribution(
    committeeMember: CommitteeMember,
    keyId: Field
  ): [{ contributionStage: ContributionStage; submitted: Bool }] {
    return [
      {
        contributionStage: ContributionStage.ROUND_1,
        submitted: new Bool(false),
      },
    ];
  }
}
