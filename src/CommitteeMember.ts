import {
  Field,
  Poseidon,
  Struct,
  UInt32,
  PublicKey,
  MerkleWitness,
  Group,
  Scalar,
  Encryption,
} from 'snarkyjs';

export class SecretPolynomial extends Struct({
  C: [Group],
  a0: Field,
  f: [Field],
}) {}

export class Round1Contribution extends Struct({
  C: [Group],
}) {
  get hash(): Field {
    let packed: Field[] = [];
    for (let i = 0; i < this.C.length; i++) {
      packed.concat(this.C[i].toFields());
    }
    return Poseidon.hash(packed);
  }
}

export class Round2Contribution extends Struct({
  encF: [Field],
}) {
  get hash(): Field {
    let packed: Field[] = [];
    for (let i = 0; i < this.encF.length; i++) {
      packed.concat(this.encF);
    }
    return Poseidon.hash(packed);
  }
}

export class DecryptionContribution extends Struct({
  Dx: [Field],
  Dy: [Field],
}) {
  get hash(): Field {
    return Field(0);
  }
}

export class CommitteeMember extends Struct({
  publicKey: PublicKey,
  index: UInt32,
  T: Number,
  N: Number,
}) {
  static getPublicKey(round1Contributions: Round1Contribution[]): PublicKey {
    let result = Group.zero;
    for (let i = 0; i < round1Contributions.length; i++) {
      result = result.add(round1Contributions[i].C[0]);
    }
    return PublicKey.fromGroup(result);
  }

  calculatePolynomialValue(a: Field[], x: number): Field {
    let result = Field(0);
    for (let i = 0; i < this.T; i++) {
      result = result.add(a[i].mul(Math.pow(x, i)));
    }
    return result;
  }

  getRandomPolynomial(): SecretPolynomial {
    let a = new Array<Field>(this.T);
    let C = new Array<Group>(this.T);
    for (let i = 0; i < this.T; i++) {
      a[i] = Field.random();
      C[i] = Group.generator.scale(Scalar.fromFields(a[i].toFields()));
    }

    let f = new Array<Field>(this.N);
    for (let i = 0; i < this.N; i++) {
      f[i] = this.calculatePolynomialValue(a, i + 1);
    }
    return { C: C, a0: a[0], f: f };
  }

  getRound1Contribution(secret: SecretPolynomial): Round1Contribution {
    return new Round1Contribution({ C: secret.C });
  }

  submitRound1Contribution(contribution: Round1Contribution) {
    return;
  }

  getRound2Contribution(
    secret: SecretPolynomial,
    publicKeys: Group[]
  ): Round2Contribution {
    let encryptions = new Array<Field>(this.N);
    for (let i = 0; i < this.N; i++) {
      if (i + 1 == Number(this.index)) {
        encryptions[i] = Field(0);
      } else {
        encryptions[i] = Field.fromFields(
          Encryption.encrypt(
            secret.f[i].toFields(),
            PublicKey.fromGroup(publicKeys[i])
          ).cipherText
        );
      }
    }
    return new Round2Contribution({ encF: encryptions });
  }

  submitRound2Contribution(contribution: Round2Contribution) {
    return;
  }

  calculateShare() {
    return;
  }

  getDecryptionContribution() {
    return;
  }

  submitDecryptionContribution() {
    return;
  }
}
