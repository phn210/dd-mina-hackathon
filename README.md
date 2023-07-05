# Mina zkApp: Threshold DKG

This template uses TypeScript.

## Description

This smart contract system implements a Threshold DKG (Distributed Key Generation) service.

By utilizing DKG, we can securely generate asymmetric cryptographic keys in a distributed manner, ensuring that no single entity has access to the complete key information.

Main processes of a DKG service:

- Round 1 contributions: generate shared public key
- Round 2 contributions: distributed encrypted private shares => n equal private shares
- Key usage
- Decryption contributions: decrypt data encrypted with the generate public key

Our Threshold scheme relies on the trust assumption of t out of n committee members (t/n).

- All n committee members need to contribute random sources for key generation processes.
- Only t out of n committee members need to contribute for the decryption processes.

This Threshold DKG system forms a crucial foundation for establishing a privacy-enhanced system that safeguards user data and decision confidentiality, such as:

- Private Voting
- Private Funding
- Social Recovery

For this 1-week hackathon hosted by Developer_DAO & Mina, we managed to:

- Get familiar with developing zkapp.
  - On-chain & Off-chain storage
  - Cryptography Primitives: Working with Mina's pasta curves (Group, Scalar)
  - Actions: Dispatch-Reduce mechanism
  - Decomposition of circuits into (Provable) Structs
- Design smart contract system for a Threshold DKG protocol and a simple asymmetric encryption process.
- Implement 2 round of DKG contributions to generate public keys.

Testing & more features are on the way, it's been an exciting week!

## Smart Contracts Architecture

### Core Idea

![Alt text](image-3.png)

### Storage

![Alt text](image-2.png)

## How to build

```sh
npm run build
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```