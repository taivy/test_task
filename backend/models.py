from pydantic import BaseModel, Field, field_validator


class Submission(BaseModel):
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$", description="Date must be in YYYY-MM-DD format")
    first_name: str = Field(..., min_length=1, max_length=50, description="First name")
    last_name: str = Field(..., min_length=1, max_length=50, description="Last name")

    @field_validator("first_name", "last_name")
    @classmethod
    def validate_name(cls, value: str, info):
        if " " in value:
            raise ValueError(f"No whitespace in {info.field_name} is allowed")
        if not value.isalpha():
            raise ValueError("Must contain only letters (no numbers or special characters)")
        return value
