import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const mongoURI = process.env.MONGO;
let client, bucket;

// Inicializa o bucket do GridFS
async function initializeBucket() {
  if (!client) {
    client = await MongoClient.connect(mongoURI);
    const db = client.db('dashboard'); // Substitua com o nome do seu banco de dados
    bucket = new GridFSBucket(db, { bucketName: 'pdfFiles' });
  }
}

export async function DELETE(req) {
  const fileId = req.nextUrl.searchParams.get("fileId");

  if (!fileId) {
    return new Response(JSON.stringify({ error: "File ID is required" }), {
      status: 400,
    });
  }

  try {
    await initializeBucket();

    // Deletar o arquivo com o ObjectId fornecido
    await bucket.delete(new ObjectId(fileId));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response(JSON.stringify({ error: "Failed to delete file" }), {
      status: 500,
    });
  }
}
