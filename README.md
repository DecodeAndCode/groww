# Groww Markets 📈

**Groww Markets** is a modern stock market dashboard built with Next.js, providing real-time data, interactive charts, and a robust fallback system for ensuring 100% uptime.

## 🚀 Features

- **Real-Time Data**: Fetches live stock prices and details via the Massive (Polygon.io) API.
- **Smart Fallback System**: Automatically switches to high-quality mock data if API rate limits (429) are hit, ensuring the UI never crashes.
- **Interactive Charts**: Custom-built charts for every stock using Lightweight Charts.
- **Smart Search**: Validated search bar that prevents 404s by checking tickers before navigation.
- **Modern UI**: Built with Tailwind CSS and Material UI for a premium, responsive feel.

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Material UI
- **State Management**: Recoil
- **API**: Massive / Polygon.io
- **Charts**: Lightweight Charts

---

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/DecodeAndCode/groww.git
cd groww
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env.local` in the root directory:
```bash
touch .env.local
```

Add your Massive/Polygon API Key to it:
```env
NEXT_PUBLIC_POLYGON_API_KEY=your_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the app.

---

## ☁️ Deployment on Vercel

When deploying to Vercel, you must manually add the Environment Variable for the API Key.

1.  **Push your code** to GitHub.
2.  **Import the project** in Vercel.
3.  **Environment Variables**:
    -   In the Vercel Dashboard, go to your project **Settings** > **Environment Variables**.
    -   Add a new variable:
        -   **Key**: `NEXT_PUBLIC_POLYGON_API_KEY`
        -   **Value**: `akVpKRToy6442erKA_DxC6B30phRCaSd` (or your valid API key)
    -   Click **Save**.
4.  **Redeploy**: If you added the variable after the build started, go to **Deployments** and click **Redeploy**.

### Node.js Version
This project requires **Node.js 20+**.
-   Ensure your Vercel Project Settings > General > **Node.js Version** is set to **20.x** or **22.x**.

---

## 🛡️ API Rate Limits & Fallback

The application is resilient to API limits (Free Tier: 5 calls/min).
-   **Primary**: Tries to fetch Real Data.
-   **Fallback**: If rate limits are hit (`429 Error`), the app instantly switches to a **Mock Data Mode**, displaying realistic data so the user experience is never interrupted.
