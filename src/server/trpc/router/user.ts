import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } });
  }),
  // promoteUserToAdmin: protectedProcedure
  //   .input(z.object({ adminId: z.string(), userId: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     const adminUserInfo = await ctx.prisma.user.findUnique({
  //       where: { id: ctx.session?.user?.id },
  //     });
  //     if (adminUserInfo?.role !== "ADMIN") throw new TRPCError({ code: "UNAUTHORIZED" });
  //     return await ctx.prisma.user.update({});
  //   }),
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const adminUserInfo = await ctx.prisma.user.findUnique({
      where: { id: ctx.session?.user?.id },
    });
    if (adminUserInfo?.role !== "ADMIN") throw new TRPCError({ code: "UNAUTHORIZED" });
    const allUsers = await ctx.prisma.user.findMany();
    return allUsers;
  }),
});
