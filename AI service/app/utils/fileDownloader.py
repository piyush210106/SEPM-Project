import requests
import uuid
import tempfile
import os

def download_pdf(url: str) -> str:
    response = requests.get(url, timeout=15)
    response.raise_for_status()

    temp_dir = tempfile.gettempdir()  # OS-safe
    file_path = os.path.join(temp_dir, f"{uuid.uuid4()}.pdf")

    with open(file_path, "wb") as f:
        f.write(response.content)
    print("Pdf Downloaded", file_path)
    return file_path
