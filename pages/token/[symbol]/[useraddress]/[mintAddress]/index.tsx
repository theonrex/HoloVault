// import { GetServerSideProps } from "next";
// import axios from "axios";
// import React from "react";
// import {
//   Connection,
//   PublicKey,
//   GetProgramAccountsFilter,
// } from "@solana/web3.js";
// import { TOKEN_PROGRAM_ID, AccountLayout } from "@solana/spl-token";
// import TokenDetailsData from "@/components/tokenDetails/TokenDetails";

// interface TokenDetailsProps {
//   symbol: string;
//   useraddress: string;
//   tokenData: any;
//   mintAddress: string;
//   tokenBalance: string; // Changed to string
//   tokenBalanceNew: string; // Changed to string
// }

// const TokenDetails: React.FC<TokenDetailsProps> = ({
//   symbol,
//   useraddress,
//   tokenData,
//   mintAddress,
//   tokenBalance,
//   tokenBalanceNew,
// }) => {
//   return (
//     <div>
//       <div>
//         <TokenDetailsData
//           symbol={symbol}
//           useraddress={useraddress}
//           tokenData={tokenData}
//           mintAddress={mintAddress}
//           tokenBalance={tokenBalance}
//           tokenBalanceNew={tokenBalanceNew}
//         />
//       </div>
//     </div>
//   );
// };

// // Existing token balance function (untouched)
// const getTokenBalance = async (
//   connection: Connection,
//   userPublicKey: PublicKey,
//   mintPublicKey: PublicKey
// ): Promise<string> => {
//   const tokenAccounts = await connection.getTokenAccountsByOwner(
//     userPublicKey,
//     {
//       mint: mintPublicKey,
//     }
//   );

//   let tokenBalance = "0";

//   if (tokenAccounts.value.length > 0) {
//     const accountInfo = AccountLayout.decode(
//       tokenAccounts.value[0].account.data
//     );
//     tokenBalance = accountInfo.amount.toString(); // Convert bigint to string
//   }

//   return tokenBalance;
// };

// // New token balance function for TokenDetails component
// const fetchTokenBalance = async (
//   connection: Connection,
//   useraddress: string,
//   mintAddress: string
// ): Promise<string> => {
//   const filters: GetProgramAccountsFilter[] = [
//     {
//       dataSize: 165, // size of account (bytes)
//     },
//     {
//       memcmp: {
//         offset: 32, // location of our query in the account (bytes)
//         bytes: useraddress, // our search criteria, a base58 encoded string
//       },
//     },
//   ];

//   const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
//     filters: filters,
//   });

//   for (const account of accounts) {
//     const parsedAccountInfo: any = account.account.data;
//     const accountMint = parsedAccountInfo.parsed.info.mint;
//     if (accountMint === mintAddress) {
//       return parsedAccountInfo.parsed.info.tokenAmount.uiAmount.toString();
//     }
//   }

//   return "0";
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { symbol, useraddress, mintAddress } = context.params;

//   // Fetch token data from CryptoCompare
//   const response = await axios.get(
//     `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol}`
//   );

//   // Fetch the token balance using the new fetchTokenBalance function
//   const connection = new Connection(
//     `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`
//   );

//   const userPublicKey = new PublicKey(useraddress);
//   const mintPublicKey = new PublicKey(mintAddress);

//   const tokenBalance = await getTokenBalance(
//     connection,
//     userPublicKey,
//     mintPublicKey
//   );
//   const tokenBalanceNew = await fetchTokenBalance(
//     connection,
//     useraddress,
//     mintAddress
//   );

//   return {
//     props: {
//       symbol,
//       useraddress,
//       tokenData: response.data,
//       mintAddress,
//       tokenBalance,
//       tokenBalanceNew,
//     },
//   };
// };

// export default TokenDetails;
