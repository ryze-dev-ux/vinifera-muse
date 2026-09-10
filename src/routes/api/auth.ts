import { createFileRoute } from "@tanstack/react-router";

/*
 * Stub do endpoint original /api/auth.
 * Preserva a URL e o contrato da API para integração futura.
 */
export const Route = createFileRoute("/api/auth")({
  server: {
    handlers: {
      POST: async () => {
        return Response.json({ error: "Autenticação não configurada" }, { status: 501 });
      },
    },
  },
});
