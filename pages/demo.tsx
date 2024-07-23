// import React from "react";
// import { GetServerSideProps } from "next";
// import {
//   Connection,
//   GetProgramAccountsFilter,
//   PublicKey,
// } from "@solana/web3.js";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import WalletInfo, { TokenAccountWithMetadata } from "../components/WalletInfo";
// import { Metaplex } from "@metaplex-foundation/js";
// import { ENV, TokenListProvider } from "@solana/spl-token-registry";
// import axios from "axios";
// import OwnersAssects from "../components/Assects/ownersAssects";
// import SearchBar from "@/components/SearchBar/searchbar";

// // Define RPC endpoint and Solana connection
// const rpcEndpoint = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`;
// const solanaConnection = new Connection(rpcEndpoint);

// // Define wallet address to query
// // const walletToQuery = "9m56puxb98BaPBv9xcfK6WN9PMYndjn9JpVycwUmwUBr";

// // Simple in-memory cache for token metadata
// const metadataCache = new Map<string, any>();

// // Function to get token metadata
// const getTokenMetadata = async (
//   mintAddresses: PublicKey[],
//   connection: Connection
// ) => {
//   const metaplex = Metaplex.make(connection);
//   const tokenMetadata = await Promise.all(
//     mintAddresses.map(async (mintAddress) => {
//       if (metadataCache.has(mintAddress.toBase58())) {
//         return metadataCache.get(mintAddress.toBase58());
//       }

//       const metadataPda = metaplex
//         .nfts()
//         .pdas()
//         .metadata({ mint: mintAddress });
//       const metadataAccountInfo = await connection.getAccountInfo(metadataPda);

//       if (metadataAccountInfo) {
//         const token = await metaplex.nfts().findByMint({ mintAddress });
//         const metadata = {
//           ...token,
//           updateAuthorityAddress: token.updateAuthorityAddress.toBase58(),
//           address: token.address.toBase58(),
//           metadataAddress: token.metadataAddress.toBase58(),
//           mint: {
//             ...token.mint,
//             address: token.mint.address.toBase58(),
//           },
//         };
//         metadataCache.set(mintAddress.toBase58(), metadata);
//         return metadata;
//       } else {
//         const provider = await new TokenListProvider().resolve();
//         const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
//         const tokenMap = tokenList.reduce((map, item) => {
//           map.set(item.address, item);
//           return map;
//         }, new Map<string, any>());
//         console.log("mintAddress", mintAddress);

//         const token = tokenMap.get(mintAddress.toBase58()) || {
//           name: "Unknown Token",
//           symbol: "UNKNOWN",
//         };
//         metadataCache.set(mintAddress.toBase58(), token);
//         return token;
//       }
//     })
//   );

//   return tokenMetadata;
// };

// // Function to get token accounts for a wallet
// const getTokenAccounts = async (
//   wallet: string,
//   connection: Connection,
//   page: number,
//   limit: number
// ): Promise<TokenAccountWithMetadata[]> => {
//   const filters: GetProgramAccountsFilter[] = [
//     {
//       dataSize: 165, // size of account (bytes)
//     },
//     {
//       memcmp: {
//         offset: 32, // location of our query in the account (bytes)
//         bytes: wallet, // our search criteria, a base58 encoded string
//       },
//     },
//   ];

//   const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
//     filters: filters,
//   });

//   const start = (page - 1) * limit;
//   const end = start + limit;
//   const paginatedAccounts = accounts.slice(start, end);

//   const mintAddresses = paginatedAccounts.map(
//     (account) => new PublicKey(account.account.data.parsed.info.mint)
//   );

//   const tokenMetadata = await getTokenMetadata(mintAddresses, connection);

//   const tokenAccounts = paginatedAccounts.map((account, index) => {
//     const parsedAccountInfo: any = account.account.data;
//     const tokenBalanceRaw: number =
//       parsedAccountInfo.parsed.info.tokenAmount.uiAmount;
//     const metadata = tokenMetadata[index];
//     console.log(
//       "Mint Address in tokenAccounts:",
//       parsedAccountInfo.parsed.info.mint
//     ); // Log mint address
//     // Format the token balance
//     const tokenBalance = new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(tokenBalanceRaw);

//     return {
//       mintAddress: parsedAccountInfo.parsed.info.mint,
//       tokenBalance,
//       metadata,
//     };
//   });

//   return tokenAccounts;
// };

// // Function to remove non-serializable values
// const dateStripped = (obj: any): any => {
//   let newObj: any = {};
//   Object.keys(obj).forEach((key) => {
//     let value = obj[key];
//     if (value !== null) {
//       if (Array.isArray(value)) {
//         value = value.map((item) => dateStripped(item));
//       } else if (
//         typeof value === "object" &&
//         typeof value.getMonth === "function"
//       ) {
//         value = JSON.parse(JSON.stringify(value));
//       } else if (typeof value === "object") {
//         value = dateStripped(value);
//       }
//     }
//     newObj[key] = value;
//   });
//   return newObj;
// };

// interface PageProps {
//   tokenAccounts: TokenAccountWithMetadata[];
//   currentPage: number;
//   totalPages: number;
//   walletToQuery: string;
// }

// // Get server-side props for the page
// export const getServerSideProps: GetServerSideProps<PageProps> = async (
//   context
// ) => {
//   const page = parseInt((context.query.page as string) || "1");
//   const limit = 50;
//   const walletToQuery = (context.query.wallet as string) || "";

//   const tokenAccounts = await getTokenAccounts(
//     walletToQuery,
//     solanaConnection,
//     page,
//     limit
//   );
//   const totalAccounts = await solanaConnection.getParsedProgramAccounts(
//     TOKEN_PROGRAM_ID,
//     {
//       filters: [
//         {
//           dataSize: 165,
//         },
//         {
//           memcmp: {
//             offset: 32,
//             bytes: walletToQuery,
//           },
//         },
//       ],
//     }
//   );

//   const totalPages = Math.ceil(totalAccounts.length / limit);

//   const sanitizedTokenAccounts = dateStripped(tokenAccounts);

//   return {
//     props: {
//       tokenAccounts: sanitizedTokenAccounts,
//       currentPage: page,
//       totalPages,
//       walletToQuery,
//     },
//   };
// };

// // Main component for the page
// const Home: React.FC<PageProps> = ({
//   tokenAccounts,
//   currentPage,
//   totalPages,
//   walletToQuery,
// }) => {
//   console.log("walletToQuery", walletToQuery);

//   return (
//     <main className="container mx-auto">
//       <div>
//         <SearchBar walletToQuery={walletToQuery} />
//       </div>
//       <div>
//         <WalletInfo
//           tokenAccounts={tokenAccounts}
//           walletToQuery={walletToQuery}
//         />
//       </div>
//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <a
//             key={index}
//             href={`/?page=${index + 1}`}
//             className={`page ${index + 1 === currentPage ? "current" : ""}`}
//           >
//             {index + 1}
//           </a>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Home;
