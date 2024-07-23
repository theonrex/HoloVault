export interface AssetTypes {
  token_info: any;
  filter(arg0: (account: any) => boolean): unknown;
  interface: string;
  id: string;
  authorities?: Array<{ address: string; scopes: string[] }>;
  burnt?: boolean;
  compression?: {
    asset_hash: string;
    compressed: boolean;
    creator_hash: string;
    data_hash: string;
    eligible: boolean;
    leaf_id: number;
    seq: number;
    tree: string;
  };
  content?: {
    $schema: string;
    files: Array<{ [key: string]: any }>;
    json_uri: string;
    links: { image: string; external_url: string };
    metadata: {
      attributes: Array<{ [key: string]: any }>;
      description: string;
      name: string;
      symbol: string;
      token_standard: string;
    };
  };
  creators?: Array<{ address: string; share: number; verified: boolean }>;
  grouping?: Array<{ group_key: string; group_value: string }>;
  mutable?: boolean;
  ownership?: {
    delegate: string | null;
    delegated: boolean;
    frozen: boolean;
    owner: string;
    ownership_model: string;
  };
  royalty?: {
    basis_points: number;
    locked: boolean;
    percent: number;
    primary_sale_happened: boolean;
    royalty_model: string;
    target: string | null;
  };
  supply?: {
    edition_nonce: number;
    print_current_supply: number;
    print_max_supply: number;
  };
}
