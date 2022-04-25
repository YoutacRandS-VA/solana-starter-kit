import * as anchor from "@project-serum/anchor";
import { OCR2Feed } from "@chainlink/solana-sdk";

async function main() {
    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    //SOL-USD Devnet
    const CHAINLINK_FEED_ADDRESS="HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6"
    const CHAINLINK_PROGRAM_ID = new anchor.web3.PublicKey("cjg3oHmg9uuPsP8D6g29NWvhySJkdYdAo9D25PRbKXJ");
    const feedAddress = new anchor.web3.PublicKey(CHAINLINK_FEED_ADDRESS); 

    //load the data feed account
    let dataFeed = await OCR2Feed.load(CHAINLINK_PROGRAM_ID, provider);
    let listener = null;

    //listen for events agains the price feed, and grab the latest rounds price data
    listener = dataFeed.onRound(feedAddress, (event) => {
        console.log(event.answer.toNumber())
    });

    //block execution and keep waiting for events to be emitted with price data
    await new Promise(function () {});
}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);
