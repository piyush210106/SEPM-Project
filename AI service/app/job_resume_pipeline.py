from .db.pinecone import index
from .db.mongo import applications
from .utils.cosine import cosine_similarity
from .utils.analyze_resume import analyze_resume_with_gemini
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId

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

def job_resume_match(job_text: str, resume_vector_id: str, application_id: str):
    try:
        print(f"--- Starting Job-Resume Matching ---")
        print(f"Application ID: {application_id} | Resume Vector ID: {resume_vector_id}")
        
        print("Generating job description embeddings...")
        job_vector = get_embedding(job_text)

        print("Fetching resume vector from Pinecone...")
        result = index.fetch(ids=[resume_vector_id])
        resume_data = result["vectors"][resume_vector_id]

        resume_text = resume_data["metadata"]["text"]
        resume_vector = resume_data["values"]

        print("Calculating Cosine Similarity...")
        similarity = cosine_similarity(resume_vector, job_vector)
        score = round(similarity * 100, 2)
        print(f"Calculated base Neural Score: {score}%")

        print("Triggering Gemini LLM for deep analysis...")
        analyzed = analyze_resume_with_gemini(
                        resume_text=resume_text,
                        job_description=job_text)
        print("Received analysis from Gemini:", analyzed)
        
        overall_fit =  (
            "Excellent" if score >= 85 else
            "Good" if score >= 70 else
            "Fair" if score >= 50 else
            "Poor"
        )

        ai_score = {
            "score": score,
            "analysis": analyzed.get("analysis", str(analyzed)),
            "matchedSkills": analyzed.get("matchedSkills", []),
            "missingSkills": analyzed.get("missingSkills", []),
            "recommendations": analyzed.get("recommendations", ""),
            "overallFit": overall_fit
        }
        
        print("Formatting and writing AI Score to MongoDB...")

        applications.update_one(
            {"_id": ObjectId(application_id)},
            {
                "$set": {
                    "aiScore": ai_score
                }
            })
        print("✓ Job Match Pipeline completed successfully!")

    except Exception as e:
        print(f"❌ Error in job_resume_match pipeline: {e}")
        raise(e)


