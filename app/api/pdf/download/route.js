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

export async function GET(req) {
  const fileId = req.nextUrl.searchParams.get("fileId");
  const fileName = req.nextUrl.searchParams.get("fileName");

  if (!fileId) {
    return new Response(JSON.stringify({ error: "File ID is required" }), {
      status: 400,
    });
  }

  try {
    await initializeBucket();

    // Usando `new ObjectId(fileId)` para instanciar corretamente o ObjectId
    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

    // Envolvemos o processamento do stream em uma Promise
    return new Promise((resolve, reject) => {
      const chunks = [];

      downloadStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      downloadStream.on('end', () => {
        const fileBuffer = Buffer.concat(chunks);

        resolve(new Response(fileBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${fileName}"`,
          },
        }));
      });

      downloadStream.on('error', (err) => {
        reject(new Response(JSON.stringify({ error: "File not found" }), {
          status: 404,
        }));
      });
    });

  } catch (error) {
    console.error("Error downloading file:", error);
    return new Response(JSON.stringify({ error: "Failed to download file" }), {
      status: 500,
    });
  }
}