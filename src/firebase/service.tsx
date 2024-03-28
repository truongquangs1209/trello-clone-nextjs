import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const updateTypeItemInFirestore = async (itemId, newType) => {
  try {
    const itemDocRef = doc(db, "itemJobs", itemId);
    await updateDoc(itemDocRef, { type: newType });
  } catch (error) {
    console.error("Error updating item type:", error);
  }
};

export const handleDragAndDrop = (
  results: results ,
  data: any[],
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  
) => {
  const { source, destination, type } = results;
  if (!destination) return;
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  )
    return;

  if (type === "group") {
    const reorderedList = [...data];

    const listSourceIndex = source.index;
    const listDestinatonIndex = destination.index;

    const [removedList] = reorderedList.splice(listSourceIndex, 1);
    reorderedList.splice(listDestinatonIndex, 0, removedList);

    return setData(reorderedList);
  }
  const itemSourceIndex = source.index;
  const itemDestinationIndex = destination.index;

  const listSourceIndex = data.findIndex(
    (list) => list.id === source.droppableId
  );
  const listDestinationIndex = data.findIndex(
    (list) => list.id === destination.droppableId
  );

  const newSourceItems = [...data[listSourceIndex].items];
  const newDestinationItems =
    source.droppableId !== destination.droppableId
      ? [...data[listDestinationIndex].items]
      : newSourceItems;

  const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
  newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

  const itemIdToUpdate = deletedItem.id;
  const newType = data[listDestinationIndex].name;
  updateTypeItemInFirestore(itemIdToUpdate, newType);

  const newStores = [...data];

  newStores[listSourceIndex] = {
    ...data[listSourceIndex],
    items: newSourceItems,
  };
  newStores[listDestinationIndex] = {
    ...data[listDestinationIndex],
    items: newDestinationItems,
  };

  setData(newStores);
};
