from ..db.mongo import resume_collection
from datetime import datetime
from bson.objectid import ObjectId

def update_resume_success(
    resume_id: str,
    extracted_text: str,
    features: dict,
    vector_id: str
):
    print(f"Updating resume in DB | resume_id: {resume_id} | vector_id: {vector_id}")
    result = resume_collection.update_one(
        {"_id": ObjectId(resume_id)},
        {
           "$set": {
                "processing_status": "completed",
                "extractedText": extracted_text,
                "features": features,
                "embedding_vectorId": vector_id
            }
        }
    )
    print(f"DB update result — matched: {result.matched_count}, modified: {result.modified_count}")
    if result.matched_count == 0:
        print(f"⚠️  WARNING: No document found with _id={resume_id}. Nothing was updated.")
    else:
        print("✓ Database Updated successfully")

def update_resume_failed(resume_id: str):
    resume_collection.update_one(
        {"_id": ObjectId(resume_id)},
        {
            "$set": {
                "processing_status": "failed"
            }
        }
    )
    print("Database Resume failed")
    