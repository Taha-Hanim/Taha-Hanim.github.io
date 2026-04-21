# Portfolio — Taha Hanim

This repository is a starter portfolio site tailored for job applications (game testing/QA). It is a simple static site you can host on GitHub Pages, Netlify or Vercel.

Files added:
- `index.html` — main single-page site
- `styles.css` — site styles
- `script.js` — contact form handling (EmailJS placeholders)
- `resume.md` — generated resume (edit as needed)

Quick local preview

1. Open `index.html` in a browser. No build step required.

Contact form (EmailJS)

1. Create an EmailJS account and add a new email service.
2. Create a template with fields `from_name`, `reply_to`, `message`.
3. Replace the placeholders in `script.js`:

   - `EMAILJS_USER_ID`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`

4. Add the EmailJS SDK to `index.html` before `script.js`:

```
<script src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script>
```

Deploy to GitHub Pages

1. Initialize a git repo (if not already):

```
git init
git add .
git commit -m "Initial portfolio"
```

2. Create a new GitHub repo named `Taha-Hanim.github.io` and push. Then enable GitHub Pages from the repository settings.

Next steps I can do for you

- Replace placeholders with your real email and resume
- Add a professional headshot or avatar
- Create an additional page with a downloadable PDF resume
- Add a sample automation script to the repo and a real project with a README and code
- Create a tailored cover letter for Lionbridge

If you'd like, I can now:
- Commit this scaffold into your workspace (done). Open it locally and edit content
- Generate a PDF resume and a tailored cover letter for Lionbridge — tell me if you want that next.
