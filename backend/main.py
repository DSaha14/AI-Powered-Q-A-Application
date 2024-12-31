from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from db import SessionLocal, engine, Base
from models import QuestionAnswer
from services import get_ai_response
from pydantic import BaseModel

class QuestionRequest(BaseModel):
    question: str


# Initialize app and database
Base.metadata.create_all(bind=engine)
app = FastAPI()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Health Check Endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Ask Endpoint
@app.post("/ask")
def ask(request: QuestionRequest, db: Session = Depends(get_db)):
    question = request.question
    if not question or len(question) > 500:
        raise HTTPException(status_code=400, detail="Invalid question")
    answer = get_ai_response(question)
    qa = QuestionAnswer(question=question, answer=answer)
    db.add(qa)
    db.commit()
    db.refresh(qa)
    return {"question": question, "answer": answer}

# History Endpoint
@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    history = db.query(QuestionAnswer).all()
    return history

from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

