# import os 
# from pinecone import Pinecone, ServerlessSpec
# from dotenv import load_dotenv

# load_dotenv()

# pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
# index_name = os.getenv("PINECONE_INDEX_NAME")

# index = pc.Index(index_name)
from pinecone import Pinecone
from dotenv import load_dotenv
import os
load_dotenv()

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
index_name = os.environ["PINECONE_INDEX_NAME"]
index = pc.Index(index_name)
try:
    pc.describe_index(index_name)
    print("✅ Pinecone connected successfully")
except Exception as e:
    print("❌ Pinecone connection failed:", e)
    raise
