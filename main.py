from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import yt_dlp
import os
import uuid
import uvicorn

app = FastAPI()

# CORS for frontend fetch
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_index():
    with open("static/index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/download")
async def download_video(request: Request):
    data = await request.json()
    url = data.get("url")

    if not url:
        return JSONResponse(content={"success": False, "error": "No URL provided"}, status_code=400)

    try:
        uid = str(uuid.uuid4())[:8]
        outtmpl = f'downloads/%(title)s_{uid}.%(ext)s'

        os.makedirs("downloads", exist_ok=True)

        ydl_opts = {
            'format': 'bestvideo+bestaudio',
            'merge_output_format': 'mp4',
            'outtmpl': outtmpl,
            'quiet': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
            if not filename.endswith(".mp4"):
                filename = filename.rsplit('.', 1)[0] + ".mp4"

        return JSONResponse(content={"success": True, "filename": f"/{filename}"})
    except Exception as e:
        return JSONResponse(content={"success": False, "error": str(e)})

@app.get("/{file_path:path}")
async def serve_file(file_path: str):
    path = os.path.join(".", file_path)
    if os.path.exists(path):
        return FileResponse(path, media_type="application/octet-stream", filename=os.path.basename(path))
    return JSONResponse(content={"error": "File not found"}, status_code=404)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)