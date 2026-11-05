---
name: update-site
description: Use when I ask to change, add to or publish my personal website.
---

# Update my personal website

The site is plain HTML and CSS (`index.html`, `style.css`) in this repo. GitHub Pages serves it from the `main` branch at https://aloysiusyam.github.io/my-website/.

## Rules

1. **Never invent facts about me.** That includes dates, roles, schools, grades, achievements and contact details. For anything I haven't given you, use a clearly marked placeholder in square brackets with `class="placeholder"`, e.g. `<span class="placeholder">[Start date]</span>`. List every placeholder still on the page so I know what to fill in.
2. **Keep the tone professional and clean.** Write short, plain sentences with no slang, hype or filler, and stay consistent with the existing wording and the green-and-white design.
3. **Never add sensitive details.** That means no phone numbers, no home addresses and no NRIC numbers. Also leave out military unit names and any details of security operations. If a source such as my CV includes them, leave them out and tell me you did.

## Workflow

4. **Edit, then stop for approval.** Make the changes, run `open index.html` so I can see them, and list every change: which file, which section, and what changed. Then wait for my approval. Don't commit or push before I say yes.
5. **Publish after I approve.**
   - Commit with a clear message that describes the change, e.g. `Add Net Zero certificate to Certificates section`.
   - Get the change onto `main` and push it to GitHub with `git push origin main`.
   - Wait for the GitHub Pages build to finish (`gh api repos/AloysiusYam/my-website/pages/builds/latest`), check the live page shows the change, and tell me the live URL: https://aloysiusyam.github.io/my-website/
