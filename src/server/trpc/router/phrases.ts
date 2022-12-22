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
  getRandomPhrase: publicProcedure.query(async ({ ctx }) => {
    const phrasesCount = await ctx.prisma.phrase.count();
    const skip = Math.floor(Math.random() * phrasesCount);
    return await ctx.prisma.phrase.findFirst({
      take: 1,
      skip: skip,
    });
  }),
  getAllPhrases: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.phrase.findMany();
  }),
  deletePhrase: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.phrase.delete({
      where: {
        id: input,
      },
    });
  }),
});
