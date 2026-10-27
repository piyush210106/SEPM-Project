from langchain_community.document_loaders import PyPDFLoader

def extract_text(pdf_path: str) -> str:
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    return "\n".join([doc.page_content for doc in documents])
