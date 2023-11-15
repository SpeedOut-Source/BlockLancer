import * as StellarSdk from 'stellar-sdk';
import fetch from 'node-fetch'; // Uncomment if running on Node

(async function main() {
  try {
    // Create a completely new and unique pair of keys
    const pair = StellarSdk.Keypair.random();
    console.log('Secret Key:', pair.secret());
    console.log('Public Key:', pair.publicKey());

    // Make an HTTP request to the friendbot to fund the account
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
    );
    const responseJSON = await response.json();
    console.log('SUCCESS! You have a new account :)\n', responseJSON);
  } catch (e) {
    console.error('ERROR!', e);
  }

  // After getting test lumens from friendbot, create a new account on the ledger
  try {
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    const parentAccount = await server.loadAccount(pair.publicKey());

    // Generate a random account to create
    const childAccount = StellarSdk.Keypair.random();

    // Create a transaction object
    let createAccountTx = new StellarSdk.TransactionBuilder(parentAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    });

    // Add the create account operation to the transaction
    createAccountTx = await createAccountTx
      .addOperation(
        StellarSdk.Operation.createAccount({
          destination: childAccount.publicKey(),
          startingBalance: '5',
        })
      )
      .setTimeout(180)
      .build();

    // Sign the transaction with the account that was created from friendbot
    await createAccountTx.sign(pair);

    // Submit the transaction
    const txResponse = await server
      .submitTransaction(createAccountTx)
      // Simple error handling
      .catch(function (error) {
        console.log('There was an error');
        console.log(error.response);
        console.log(error.status);
        console.log(error.extras);
        return error;
      });

    console.log(txResponse);
    console.log('Created the new account', childAccount.publicKey());
  } catch (e) {
    console.error('ERROR!', e);
  }
})();
