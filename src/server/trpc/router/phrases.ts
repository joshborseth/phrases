import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

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
  getAllPhrases: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        // cursor is a reference to the last item in the previous batch
        // it's used to fetch the next batch
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input;
      const items = await ctx.prisma.phrase.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        where: {
          type: "phrase",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
  deletePhrase: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.phrase.delete({
      where: {
        id: input,
      },
    });
  }),
});
