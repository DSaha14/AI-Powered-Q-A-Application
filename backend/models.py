from sqlalchemy import Column, Integer, String
from db import Base

class QuestionAnswer(Base):
    __tablename__ = "question_answer"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, nullable=False)
    answer = Column(String, nullable=False)
