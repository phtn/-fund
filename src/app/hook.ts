// import { api } from "@vex/api";
// import { type Id } from "@vex/dataModel";
// import { useMutation } from "convex/react";
// import { useEffect, useState } from "react";

// export const useConvexStore = () => {

//   const [userId, setUserId] = useState<Id<"account"> | null>(null);

//   const storeUser = useMutation(api.account.user.store);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       return;
//     }
//     const createUser = async () => {
//       const id = await storeUser();
//       setUserId(id);
//     };

//     createUser().catch((e) => console.log(e));

//     return () => setUserId(null);
//   }, [isAuthenticated, storeUser, user?.id]);

//   return {
//     userId,
//     isLoading: isLoading || (isAuthenticated && userId === null),
//     isAuthenticated: isAuthenticated && userId !== null,
//   };
// };
