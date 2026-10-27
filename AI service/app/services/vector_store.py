from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
from ..db.pinecone import index

load_dotenv()

EMBEDDING_MODEL = "gemini-embedding-2"
PINECONE_DIMENSION = 768  # must match your Pinecone index dimension

def get_embedding(text: str) -> list[float]:
    client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))
    result = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=text,
        config=types.EmbedContentConfig(output_dimensionality=PINECONE_DIMENSION)
    )
    if not result.embeddings:
        raise ValueError("Embedding API returned no embeddings.")
    return result.embeddings[0].values or []

def store_resume_vector(
    text: str,
    resume_id: str,
    firebase_uid: str
) -> str:
    vector = get_embedding(text)

    index.upsert([
        {
            "id": resume_id,
            "values": vector,
            "metadata": {
                "resumeId": resume_id,
                "firebaseUid": firebase_uid,
                "text": text
            }
        }
    ])
    print("Vector Stored", resume_id)
    return resume_id
