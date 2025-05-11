export enum CrumbStatus {
  NEW = 0,
  QUEUED = 1,
  CLOSED = 2,
  CLOSED_VALIDATED = 3,
}

export interface Crumb {
  address: string;              
  id: `0x${string}`;              
  aliasName: string;            
  price: bigint;               
  setupTask: string;            
  setupValidation: string;    
  maxRun: string;  
  lastUpdated:string;
  subContractAddress: `0x${string}`;              
}

export interface ComputeTask {
  sender: string;             
  timestamp: number;                                          
  subContractAddress: `0x${string}`;   
}

