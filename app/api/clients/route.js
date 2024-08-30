
import { fetchClients } from "@/app/lib/data";

export async function GET(req) {

  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return new Response( JSON.stringify({ error: "Name is required" }), {
      status: 400,
    })
  }

  try {
    const { clients } = await fetchClients(name, 1); // Busca o cliente pelo nome

    if (clients && clients.length > 0) {
      return new Response(JSON.stringify(clients), {
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch client" }), {
      status: 500,
    })
  }
}