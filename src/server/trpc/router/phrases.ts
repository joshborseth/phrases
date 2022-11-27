import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const phrasesRouter = router({
  createPhrase: publicProcedure
    .input(z.object({ phrase: z.string() }))
    .mutation(({ input, ctx }) => {
      const phrase = ctx.prisma.phrase.create({
        data: { phrase: input.phrase },
      });
      return phrase;
    }),
  getPhrase: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.phrase.findMany();
  }),
});
