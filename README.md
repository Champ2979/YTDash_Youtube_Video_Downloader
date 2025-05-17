# 🎬 YTDash_Youtube_Video_Downloader

A production-ready web application that allows users to download YouTube videos using a FastAPI backend and the powerful `yt-dlp` tool.

---

## 🚀 Features

- Download YouTube videos via public URLs
- Supports `cookies.txt` in Netscape format for authenticated downloads
- Deployable to [Render.com](https://render.com/)
- Fully configurable via environment variables

---

## 🛠 Tech Stack

- **Backend**: FastAPI (Python)
- **Downloader**: [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- **Deployment**: Render.com

---

## 🔧 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Champ2979/YTDash_Youtube_Video_Downloader
cd YTDash_Youtube_Video_Downloader
```

### 2. Create Virtual Environment & Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

pip install -r requirements.txt
```
### 3. 🍪 Cookie Authentication Setup

YouTube may prompt "Sign in to confirm you’re not a bot". To work around this, you must provide valid YouTube session cookies in Netscape format.

#### Export Cookies from your browser
```bash
yt-dlp --cookies-from-browser chrome --cookies cookies.txt
```
- This creates cookies.txt in the required format.

- Works with Chrome, Firefox, Edge.

### 4. 🛑 Do NOT commit cookies to GitHub
- Add cookies.txt to .gitignore.


## For now, it is easy to run this application locally on your computer. It will work great and download the best quality youtube video to your computer.

