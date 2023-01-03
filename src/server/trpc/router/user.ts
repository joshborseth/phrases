import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUserInfo: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } });
  }),
});
