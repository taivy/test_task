from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import random
import time

from models import Submission


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Intercepts FastAPI validation errors and reformats them into the required structure."""
    error_dict = {}
    for error in exc.errors():
        print(error)
        field = error["loc"][-1]  # Get the field name
        error_dict.setdefault(field, []).append(error["msg"].strip("Value error, "))

    return JSONResponse(status_code=400, content={"success": False, "error": error_dict})


@app.post("/submit")
async def submit_form(data: Submission):
    # Simulate delay
    time.sleep(random.uniform(0, 3))

    # Generate response data
    response_data = [
        {
            "date": data.date,
            "name": f"{data.first_name} {data.last_name}"} for _ in range(random.randint(2, 5))
    ]
    return {"success": True, "data": response_data}
