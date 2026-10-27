from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import json
import re
import os
from dotenv import load_dotenv
load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0,
    api_key=os.environ["GOOGLE_API_KEY"]
)

PROMPT = PromptTemplate(
    input_variables=["resume_text"],
    template="""
You are an AI resume parser.

Return STRICT JSON only.
Do NOT include explanations.
Do NOT include markdown.
Do NOT include backticks.

{{
  "skills": [string],
  "experienceYears": number,
  "education": [
    {{
      "degree": string,
      "field": string,
      "institution": string,
      "graduationYear": number
    }}
  ],
  "jobTitles": [string],
  "summary": string
}}

Resume:
{resume_text}
"""
)

def normalize_llm_content(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, dict) and "text" in item:
                # LangChain content block: {'type': 'text', 'text': '...', 'extras': {...}}
                parts.append(item["text"])
            else:
                parts.append(json.dumps(item))
        return "\n".join(parts)
    raise ValueError("Unsupported LLM output format")

def safe_json_parse(text: str) -> dict:
    match = re.search(r"\{.*\}", text, re.S)
    if not match:
        raise ValueError("No JSON found in LLM output")
    return json.loads(match.group())

def parse_resume(resume_text: str) -> dict:
    response = llm.invoke(
        PROMPT.format(resume_text=resume_text)
    )

    raw_text = normalize_llm_content(response.content)
    print("Resume parsed:", raw_text)
    return safe_json_parse(raw_text)
