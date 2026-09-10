import { createFileRoute } from "@tanstack/react-router";

/*
 * Stub do endpoint original /api/gdrive.
 * Preserva a URL e o contrato da API para integração futura.
 * Retorna catálogo vazio e mapa de imagens vazio.
 */
export const Route = createFileRoute("/api/gdrive")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const action = url.searchParams.get("action");

        if (action === "catalog") {
          return Response.json({ wines: [], meta: {} });
        }

        if (action === "images") {
          return Response.json({ images: {} });
        }

        if (action === "img") {
          return new Response("Not found", { status: 404 });
        }

        return new Response("OK");
      },
    },
  },
});
