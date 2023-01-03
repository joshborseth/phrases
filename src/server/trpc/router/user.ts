import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

// export const userRouter = router({
//   getUserInfo: protectedProcedure.query(async ({ ctx }) => {
//     return ctx.prisma.user.findUnique({});
//   }),
// });
