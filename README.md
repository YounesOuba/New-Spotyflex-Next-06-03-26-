# SpotyFlex Next.js Frontend

Welcome to the frontend repository for **SpotyFlex** — a modern fitness blog offering expert workout plans, nutrition guides, and healthy lifestyle tips.

This project is built with [Next.js](https://nextjs.org/) and uses Server-Side Rendering (SSR) along with Static Site Generation (SSG) tailored for a high-performance content platform.

## 🚀 Features
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for premium aesthetics and animations.
- **Dynamic Content**: Articles, categories, and tags are dynamically fetched from the Joomla Headless CMS (`cms.spotyflex.com`).
- **SEO Optimized**: Fully configured metadata, OpenGraph tags, and canonical links.
- **Client-Side Search**: A rich search experience to easily find workouts, nutrition guides, and more.
- **Responsive Design**: Optimized for everything from mobile phones up to ultra-wide displays.

## 💻 Tech Stack
- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + Vanilla CSS (Variables)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: Joomla Headless CMS (GraphQL/REST API)

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YounesOuba/New-Spotyflex-Next-06-03-26-.git
   cd spotyflex-next
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the necessary tokens (e.g., Joomla CMS token, Google Analytics ID).

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚢 Automated Deployment to Hostinger

This project is configured with **GitHub Actions** to automatically build and deploy to Hostinger FTP whenever changes are pushed to the `master` branch.

### How it Works:
1. You make changes to the code or articles.
2. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Your descriptive message"
   git push origin master
   ```
3. GitHub Actions triggers the `.github/workflows/deploy.yml` workflow.
4. The workflow installs Next.js dependencies, builds the static export (`npm run build`), and automatically uploads the contents of the `/out` directory to your Hostinger `public_html` via FTP.

### Required GitHub Secrets
To make the deployment pipeline work, ensure the following secrets are configured in your GitHub Repository settings (**Settings -> Secrets and variables -> Actions**):
- `FTP_SERVER`: The Hostinger FTP Host (e.g., `ftp.spotyflex.com` or the IP address).
- `FTP_USERNAME`: Your Hostinger FTP Username.
- `FTP_PASSWORD`: Your Hostinger FTP Password.
- `JOOMLA_TOKEN`: The API token needed to fetch CMS articles during the build process.

## 📝 License
Proprietary — All rights reserved to the SpotyFlex Team.
