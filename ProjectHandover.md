## Services Used

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**
* Images/PDFs: **Cloudinary**
* Email Service: **Resend**
* Domain: **Hostinger**

All services are created and managed using the official organization email ID, not any personal email. This ensures future technical teams can continue managing the project without depending on an individual's account.

---

## Access

The following members should have access to events dashboard whenever a new team takes over:

* Technical Chair
* Event Heads
* Event Chairs
* Leaderboard Members

Remove access for members who are no longer part of the team.

---

## Admin Accounts

Admin accounts are created using:

```bash
scripts/seedAdmin.js
```

Whenever the team changes:

1. Update the admin details in `scripts/seedAdmin.js`.
2. Run the seed script.
3. Verify the new admin accounts.
4. Remove old admin accounts if required.
5. Update the DEFAULT_PASSWORD in the .env file before running the admin seed script.


---

## Database

For every new session:

* Take a backup if required.
* Clear old event-related data.
* Seed the new admin accounts.
* Verify the application before opening registrations.

---

## Website Content Updates

At the beginning of every new session, update:

* Team member images
* Resume links
* LinkedIn profile URLs
* Team member details

Ensure all profile information reflects the current session.

---

## Developer Information

Maintain the developer section on the website's footer as follows:

* The **Actual Developer** should remain unchanged to acknowledge the original developer of the project.
* Add the **Current Technical Chair/Developer** for the ongoing session below the original developer.
* Update only the current session details while keeping the original developer's name permanently.


---

## Future Updates

Whenever any dynamic functionality is modified or a new feature is added, update this documentation accordingly.

Keep this document updated so future teams always have the latest project information.

## A Note from the Developer

To every future Technical Chair and developer, thank you for carrying this project forward. Improve it, maintain it well, document your changes, and leave it in a better state than you found it.

Most importantly, I hope that every time I look back at this project, I find something new. Not just a redesigned UI, but meaningful features, better architecture, cleaner code, and improvements that make the platform more useful than it was before.

Treat this project as something you inherit and pass on. Every Technical Team should leave its own mark by contributing something valuable, so that with every session the website becomes more capable, more polished, and more impactful than the last.

Wishing you and your team all the best for the sessions ahead.

Written by:
Rudraksh Chamoli
