import { createFileRoute } from "@tanstack/react-router";

/*
 * Stub do endpoint original /api/wines-db.
 * Preserva a URL e o contrato da API para integração futura.
 * Retorna catálogo vazio.
 */
export const Route = createFileRoute("/api/wines-db")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({ wines: [], meta: {} });
      },
      POST: async () => {
        return Response.json({ wines: [], meta: {} });
      },
    },
  },
});
