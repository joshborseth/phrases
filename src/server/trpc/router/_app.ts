import { router } from "../trpc";
import { phrasesRouter } from "./phrases";
export const appRouter = router({
  phrase: phrasesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
