import isBase from '@sindresorhus/is';

export const is = {
  ...isBase,
  nil: isBase.nullOrUndefined,
  nonEmptyString: (value: string | null | undefined): value is string =>
    isBase.nonEmptyString(value),
  positiveInt: (value: unknown): value is number =>
    isBase.integer(value) && value > 0,
};

export const convertQuery = (querySnapshot: any) => {
  const items: any[] = [];
  querySnapshot.forEach((documentSnapshot: {id: any; data: () => any}) => {
    items.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    });
    console.log('Item ID: ', documentSnapshot.id, documentSnapshot.data());
  });

  return items;
};

export const deleteItem = (array: any[], item: any) => {
  const restoredArray = array;
  const index = restoredArray.indexOf(item);
  if (index >= 0) {
    restoredArray.splice(index, 1);
  }
  return restoredArray;
};
