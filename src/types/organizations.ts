export interface OrganizationType {
  id: number;
  name: string;
  totalUses?: number;
}

export interface Organization {
  id: number;
  description: string;
  logo: string;
  name: string;
  organizationType: OrganizationType;
  website: string;
}
