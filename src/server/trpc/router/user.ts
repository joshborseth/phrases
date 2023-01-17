import { adminProcedure } from "./../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } });
  }),
  promoteUserToAdmin: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userToPromote = await ctx.prisma.user.update({
        where: { id: input.userId },
        data: { role: "ADMIN" },
      });
      return userToPromote;
    }),
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
});
