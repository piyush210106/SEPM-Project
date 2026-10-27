from .utils.fileDownloader import download_pdf
from .utils.pdf_loader import extract_text
from .utils.resume_parser import parse_resume
from .services.vector_store import store_resume_vector
from .services.update_resume import update_resume_failed
from .services.update_resume import update_resume_success

def resume_parser_pipeline(
        resume_id: str,
        resume_url: str,
        firebase_uid: str
):
    try:
        pdf_path = download_pdf(resume_url)

        extracted_text = extract_text(pdf_path)
        if not extracted_text.strip():
            raise Exception("No resume text")
        
        features = parse_resume(extracted_text)

        vector_id = store_resume_vector(
            text=extracted_text,
            resume_id=resume_id, 
            firebase_uid=firebase_uid)

        update_resume_success(
            resume_id=resume_id,
            extracted_text=extracted_text,
            features=features,
            vector_id=vector_id
        )

    except Exception as e:
        update_resume_failed(resume_id=resume_id)
        raise(e)
