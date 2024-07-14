# Solana Explorer Project

Welcome to the Solana Explorer Project! This application fetches and displays Solana-related data, including blocks and transactions, providing a comprehensive view of the Solana blockchain.

## Features

- **Fetch Solana Data:** Retrieves the latest Solana blocks and transactions.
- **Price Information:** Displays current Solana prices using the CoinGecko API.
- **Blockchain Data:** Utilizes Alchemy and Chainstack to fetch detailed Solana blockchain data.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/theonrex/solana-explorer
    cd solana-explorer
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

### Configuration

1. Obtain API keys:

   - Sign up for an Alchemy account and get your API key: [Alchemy Signup](https://dashboard.alchemy.com/signup/?a=bf20d53b27)
   - Add your Alchemy API key to a `.env.local` file in the root of the project:

    ```env
    NEXT_PUBLIC_ALCHEMY=your_alchemy_api_key
    ```

### Running the Application

1. Start the development server:

    ```sh
    npm run dev
    ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- The home page displays the latest Solana data like price, market cap e.t.c
- The block page displays the latest Solana blocks 
- The transaction page displays the latest Solana transactions.

## Technologies Used

- **Next.js:** A React framework for building fast and scalable web applications.
- **CoinGecko API:** Provides cryptocurrency price data.
- **Alchemy:** A blockchain API for fetching Solana data.
- **Chainstack:** A blockchain infrastructure provider for accessing Solana data.




Enjoy exploring the Solana blockchain with the Solana Explorer Project!
