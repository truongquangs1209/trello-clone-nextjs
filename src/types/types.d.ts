interface ListsJobs {
  id: string | null;
  title: string;
  items: any[];
  createdAt: Date;
  createdBy: string;
}

interface ItemJobs {
  // id: Key;
  id: string;
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

type CompleteListJobs = ListsJobs | { id: string } 

declare module 'react-beautiful-dnd';

