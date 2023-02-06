import { webhookRouter } from "./webhook";
import { userRouter } from "./user";
import { router } from "../trpc";
import { phrasesRouter } from "./phrases";
export const appRouter = router({
  phrase: phrasesRouter,
  userRouter: userRouter,
  webhookRouter: webhookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
