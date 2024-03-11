interface ListsJobs {
  id: string | null;
  title: string;
  items: any[];
  createdAt: Date;
  createdBy: string;
}

interface ItemJobs {
  id: Key;
  is: string;
  title: string;
  type: string;
  createdAt: Date;
}
type CompleteListJobs = ListsJobs | { id: string } 

declare module 'react-beautiful-dnd';

