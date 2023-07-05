

export const getDate = (arr)=>{
         for (var ele in arr) {
           const today = new Date(arr[ele].finishDate);
           arr[ele].finishDate =
             today.getDate() +
             "/" +
             today.getMonth() +
             "/" +
             today.getFullYear();
         }
         return arr;
};


export const getDescending = (arr) => {
  const s =[...arr]
   s.sort(function compare(a, b) {
     const my1 = a.finishDate.split("/");
     const my2 = b.finishDate.split("/");
     return new Date(my2[2],my2[1],my2[0]) - new Date(my1[2],my1[1],my1[0]);
   });
  return s;
};

export const getAscending = (arr) => {
  const s =[...arr]
  s.sort(function compare(a, b) {
    const my1 = a.finishDate.split("/");
    const my2 = b.finishDate.split("/");
    return new Date(my1[2], my1[1], my1[0]) - new Date(my2[2], my2[1], my2[0]);
  });
  return s;
};





