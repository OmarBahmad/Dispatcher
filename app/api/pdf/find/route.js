import { MongoClient, GridFSBucket } from 'mongodb';

const mongoURI = process.env.MONGO;
let client, bucket;

async function initializeBucket() {
  if (!client) {
    client = await MongoClient.connect(mongoURI);
    const db = client.db('dashboard'); // Substitua com o nome do seu banco de dados
    bucket = new GridFSBucket(db, { bucketName: 'pdfFiles' });
  }
}

export async function GET(req) {
  const clientId = req.nextUrl.searchParams.get("clientId");

  if (!clientId) {
    return new Response(JSON.stringify({ error: "Client ID is required" }), {
      status: 400,
    });
  }

  try {
    await initializeBucket();

    // Buscar todos os arquivos com o clientId nos metadados
    const cursor = bucket.find({ 'metadata.clientId': clientId });
    const files = await cursor.toArray();

    if (files.length === 0) {
      return new Response(JSON.stringify({ error: "No PDFs found for this client" }), {
        status: 404,
      });
    }

    // Retorna os metadados dos arquivos encontrados
    return new Response(JSON.stringify(files), {
      status: 200,
    });

  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch PDFs" }), {
      status: 500,
    });
  }
}
