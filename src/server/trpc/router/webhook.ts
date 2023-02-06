import { publicProcedure } from "./../trpc";
import { router } from "../trpc";

export const webhookRouter = router({
  getWebhook: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.webhook.findFirst();
  }),
});
