// // pages/your-page.js

// export async function getServerSideProps(context) {
//   const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`;

//   // Replace with your API endpoint

//   const getAssetsByOwner = async () => {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         jsonrpc: "2.0",
//         id: "my-id",
//         method: "getAssetsByOwner",
//         params: {
//           ownerAddress: "9m56puxb98BaPBv9xcfK6WN9PMYndjn9JpVycwUmwUBr",
//           page: 1, // Starts at 1
//           limit: 1000,
//           displayOptions: {
//             showFungible: true, // Return both fungible and non-fungible tokens
//           },
//         },
//       }),
//     });
//     const { result } = await response.json();
//     return result.items;
//   };

//   const assets = await getAssetsByOwner();

//   return {
//     props: {
//       assets,
//     },
//   };
// }

// const YourPage = ({ assets }) => {
//   console.log("assets", assets);
//   return (
//     <div>
//       <h1>Assets by Owner</h1>
//       <pre>{JSON.stringify(assets, null, 2)}</pre>
//     </div>
//   );
// };

// export default YourPage;
