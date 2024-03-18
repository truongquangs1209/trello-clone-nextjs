interface ListsJobs {
  id?: string | null;
  name: string;
  items: any[];
  createdAt: Date | null;
  createdBy: string | null;
}

interface ItemJobs {
  // id: Key;
  id?: string | null;
  title: string;
  type: string;
  createdAt: Date;
}

interface UserLists{
  displayName:string;
  email:string;
  photoURL:string;
  id:string;
  createdAt: Date;
}

interface MemberList{
    displayName:string;
    email:string;
    id:string;
    photoURL: string
}

type results = {
  source: { index: number; droppableId: string };
  destination: { droppableId: string; index: number };
  type: string;
};

type CompleteListJobs = ListsJobs | { id: string } 

declare module 'react-beautiful-dnd';

