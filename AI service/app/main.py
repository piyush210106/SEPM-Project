from fastapi import FastAPI, Header, HTTPException, Depends
from .resume_parse_pipeline import resume_parser_pipeline
from .job_resume_pipeline import job_resume_match
from pydantic import BaseModel
import os
from dotenv import load_dotenv
load_dotenv()
app = FastAPI(title="AI Service")

async def verify_internal_secret(x_internal_secret: str = Header(default=None)):
    expected_secret = os.environ.get("AI_INTERNAL_SECRET")
    if not expected_secret or x_internal_secret != expected_secret:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid or missing X-Internal-Secret header")
    return x_internal_secret

class ProcessResumePayload(BaseModel):
    resume_id: str
    resume_url: str
    firebase_uid: str

@app.get("/")
def read_root():
    print("Hello, Your server is running!!")
    return {"status": "Hello, Your server is running!!"}

from fastapi import BackgroundTasks

@app.post("/process-resume", dependencies=[Depends(verify_internal_secret)])
async def process_resume(payload: ProcessResumePayload, background_tasks: BackgroundTasks):
    background_tasks.add_task(
        resume_parser_pipeline,
        resume_id=payload.resume_id,
        resume_url=payload.resume_url,
        firebase_uid=payload.firebase_uid
    )
    return {"status": "processing started"}

@app.post("/application-matching", dependencies=[Depends(verify_internal_secret)])
async def analyze_application(payload: dict, background_tasks: BackgroundTasks):
    background_tasks.add_task(
        job_resume_match,
        job_text=payload["job_text"],
        resume_vector_id=payload["resumeId"],
        application_id=payload["applicationId"]
    )
    return {"status": "Analysis Started"}

