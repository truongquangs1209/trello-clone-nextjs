interface ListsJobs {
  id: string;
  title: string;
  item: any[];
  createdAt: Date;
  createdBy: string;
}

interface ItemJobs {
  is: string;
  title: string;
  type: string;
  createdAt: Date;
}
