export interface Reward {
  commission: number | null;
  lamports: number;
  postBalance: number;
  pubkey: string;
  rewardType: string;
}

export interface TransactionMeta {
  computeUnitsConsumed: number;
  err: string | null;
  fee: number;
  innerInstructions: any[];
  logMessages: string[];
  postBalances: number[];
  postTokenBalances: any[];
  preBalances: number[];
  preTokenBalances: any[];
  rewards: any[];
  status: {
    Ok: string | null;
  };
}

export interface Transaction {
  meta: TransactionMeta;
  transaction: {
    message: {
      accountKeys: {
        pubkey: string;
        signer: boolean;
        source: string;
        writable: boolean;
      }[];
    };
  };
  version: string;
}

export interface BlockData_Interface {
  blockHeight: number;
  blockTime: number;
  blockhash: string;
  parentSlot: number;
  previousBlockhash: string;
  rewards: Reward[];
  transactions: Transaction[];
}

export interface Props {
  blockData: BlockData_Interface;
}
