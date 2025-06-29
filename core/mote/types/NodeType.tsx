export type LeafNodeType = null | string;

export type BranchNodeType = null | {
  [key: string]: NodeType;
};

type NodeType =  LeafNodeType | BranchNodeType;

export default NodeType;
