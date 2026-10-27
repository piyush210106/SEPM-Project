from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_DB_URL")
MONGO_NAME = os.getenv("MONGO_DB_NAME")

if not MONGO_URL:
    raise ValueError("MONGO_DB_URL not found in environment")
if not MONGO_NAME:
    raise ValueError("MONGO_DB_NAME not found in environment")

print(f"Connecting to MongoDB database: '{MONGO_NAME}'")
client = MongoClient(MONGO_URL)
db = client[MONGO_NAME]
resume_collection = db["resumes"]
applications = db["applications"]

try:
    client.admin.command("ping")
    print("✓ MongoDB connected successfully")
except Exception as e:
    print("MongoDB connection failed:", e)
