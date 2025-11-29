<div align="center">

<img src="https://github.com/user-attachments/assets/fe0d6fcd-8f52-4bac-adce-d3351fbb0af7" alt="google-gemini-icon" height="70" />

# Gemini Clone (Next.js)

![GitHub Created At](https://img.shields.io/github/created-at/RanitManik/Gemini-Clone)
![Repo Size](https://img.shields.io/github/repo-size/RanitManik/Gemini-Clone)
![Discussions](https://img.shields.io/github/discussions/RanitManik/Gemini-Clone)
![License](https://img.shields.io/github/license/RanitManik/Gemini-Clone)
![Forks](https://img.shields.io/github/forks/RanitManik/Gemini-Clone?style=default)
![Stars](https://img.shields.io/github/stars/RanitManik/Gemini-Clone?style=default)
![Vercel Deploy Status](https://deploy-badge.vercel.app/vercel/Gemini-Clone)
![Wakatime](https://wakatime.com/badge/github/RanitManik/Gemini-Clone.svg)

</div>

## 🌟 What is Gemini Clone?

**Gemini Clone** is a simple and clean chatbot web app built using **Next.js 15**, **React**, **TypeScript**, and **Tailwind CSS**.  
It connects to the **Google Gemini API** through a Next.js API route to provide AI‑powered answers — just like Google's real Gemini AI.

This project is perfect for learning how to work with APIs, build chat interfaces, and create modern **Next.js** projects.

---

## 📚 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Getting Started](#getting-started)
* [How to Use](#how-to-use)
* [Project Structure](#project-structure)
* [Scripts](#scripts)
* [Contribute](#contribute)
* [License](#license)
* [Thanks](#thanks)

---

## 🧠 Overview

This web app lets you chat with an AI powered by the **Google Gemini API**.  
It mimics how the real Gemini chatbot works and responds in real time, using the **Next.js App Router**.

Whether you're new to coding or just curious about how to build your own AI chatbot with Next.js, this is a great place to start!

---

## ✨ Features

### 🔹 Core Features

* **Chat Interface** – A clean and responsive design that works on any screen.
* **Typing Animation** – The bot types responses just like a human would.
* **AI Integration** – Uses a Next.js API route to call the Google Gemini API securely.

### 🔹 Tech Stack

* **Next.js 15** (App Router)
* **React 19**
* **TypeScript**
* **Tailwind CSS**

### 🔮 Future Ideas

* Save previous chats (conversation history)
* Support emojis and avatars
* Add extra tools like image search, language translation, and more!

---

## ⚙️ Getting Started

Follow these steps to set it up on your own computer:

1. **Clone the project:**

   ```bash
   git clone https://github.com/Dundanagoudp/gemini.git
   ```

2. **Move into the folder:**

   ```bash
   cd gemini
   ```

3. **Install all the required packages:**

   ```bash
   npm install
   ```

4. **Set up your API key:**

   * Create a file named `.env.local` in the project root.
   * Add this line with your Gemini API key:

     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

5. **Run the Next.js dev server:**

   ```bash
   npm run dev
   ```

6. **Open in your browser:**

   Go to [http://localhost:3000](http://localhost:3000)

---

## 💬 How to Use

Once the app is running:

* Type your question or message in the input box.
* The Gemini AI will respond in a conversational style.
* You can keep chatting and explore different responses.

---

## 🧱 Project Structure

High‑level overview of the main folders:

```text
gemini/
├── app/             # Next.js App Router (pages, layout, API routes)
├── components/      # Reusable UI components (chat UI, sidebar, etc.)
├── context/         # React Context (e.g. global app state)
├── assets/          # TS asset exports/config
└── public/          # Static files (including /public/assets images)
```

For more detailed setup and migration notes, see `SETUP.md`.

---

## 🛠 Scripts

The most important npm scripts:

* `npm run dev` – Start the Next.js development server.
* `npm run build` – Build the production bundle.
* `npm run start` – Start the production server.
* `npm run lint` – Run ESLint.

---

## 🤝 Contribute

Want to help make this better? Great!

1. Fork this repo
2. Create a new branch:

   ```bash
   git checkout -b your-feature-name
   ```

3. Make your changes and commit:

   ```bash
   git commit -m "Add your message here"
   ```

4. Push your branch:

   ```bash
   git push origin your-feature-name
   ```

5. Open a pull request with a short description of what you did.

---

## 📄 License

This project is open-source and available under the **MIT License**.  
See the `LICENSE` file for more info.

---

## 🙌 Thanks

* **[GreatStack](https://www.youtube.com/@GreatStackDev)** for their awesome [Gemini Clone tutorial](https://youtu.be/0yboGn8errU?feature=shared).
* **Google** for providing the Gemini API.
* **Vercel** for free hosting that made this live deployment easy.
* And a big thank you to the **open-source community**! 💖

---

<p align="center"><strong>Thanks for checking out Gemini Clone! Happy coding! 🚀</strong></p>
