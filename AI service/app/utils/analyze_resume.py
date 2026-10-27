from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import json
import re
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    temperature=0.3,
    api_key=os.environ.get("GOOGLE_API_KEY")
)

analysis_prompt = PromptTemplate(
    input_variables=["resume", "job"],
    template="""
        You are an ATS resume evaluator.

        Job Description:
        {job}

        Resume:
        {resume}

        Return STRICT JSON only. No markdown, no backticks, no explanation.
        {{
        "matchedSkills": [],
        "missingSkills": [],
        "analysis": "",
        "recommendations": ""
        }}
    """
)

def _content_to_string(content) -> str:
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
    return str(content)


def analyze_resume_with_gemini(resume_text: str, job_description: str) -> dict:
    chain = analysis_prompt | llm
    response = chain.invoke({
        "resume": resume_text,
        "job": job_description
    })

    raw_text = _content_to_string(response.content)

    # Strip markdown code fences if LLM wraps response in ```json ... ```
    raw_text = re.sub(r"^```(?:json)?\s*", "", raw_text.strip())
    raw_text = re.sub(r"\s*```$", "", raw_text.strip())

    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        # Last resort: extract the first {...} block
        match = re.search(r"\{.*\}", raw_text, re.S)
        if match:
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                pass
        return {
            "matchedSkills": [],
            "missingSkills": [],
            "analysis": raw_text,
            "recommendations": ""
        }
