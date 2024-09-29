// import { z } from "zod";
// import { proc, router } from "../trpc";
// import { api } from "@vex/api";
// import { Id } from "@vex/dataModel";
// // Id<'account'> | null
// const currentProc = proc.input(z.string().or(z.null()));
// export const convex = router({
//   current: currentProc.query(
//     // async ({ input }) => await api.functions.getUserById.getUser(input),
//     async ({ input }) => input,
//   ),
// });
