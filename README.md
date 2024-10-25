# ClientWords

**ClientWords** is a SaaS platform built with Next.js and TypeScript that enables businesses to effortlessly collect, manage, and display customer testimonials on their websites. This tool turns positive customer experiences into social proof, helping businesses build trust and boost conversions.

## 🌐 Website
[ClientWords.com](https://clientwords.com)

---

## 📖 Table of Contents

- [Features](#features)
- [Build With](#build-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

- **Simple Testimonial Collection**: Send direct links to customers to collect testimonials.
- **Customizable Display**: Showcase testimonials in various formats to suit your brand style.
- **Automated Approval Workflows**: Review and manage testimonials seamlessly.
- **Responsive Design**: Optimized for mobile and desktop viewing.

## Build With

- [Next.js 14](https://nextjs.org)
- [shadcn-ui](https://ui.shadcn.com)
- [MongoDB](https://mongodb.com)
- [NextAuth.js](https://next-auth.js.org)
- [Cloudinary](https://cloudinary.com)
- [Upstash Redis](https://upstash.com)
- Deployed on [Vercel](https://vercel.com)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.x)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/your-username/clientwords.git
   cd clientwords
   ```
3. Install dependencies:
   
   ```bash
   npm install
   ```
### Environment Variables
Create a `.env` file in the root directory and configure the following environment variables:
   ```
# MongoDB
MONGODB_URI=<your MongoDB URI>
DB_NAME=<your database name>

# Hosting & API
HOST=<your host URL>
NEXT_PUBLIC_APP_URL=<your app URL>

# Paddle (Payments)
NEXT_PUBLIC_PADDLE_VENDER_ID=<Paddle Vendor ID>
PADDLE_API_KEY=<Paddle API Key>
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=<Paddle Client Token>
NEXT_PUBLIC_PADDLE_ENVIRONMENT=<Paddle Environment>

# Authentication
AUTH_SECRET=<Authentication secret>
AUTH_GOOGLE_ID=<Google Auth ID>
AUTH_GOOGLE_SECRET=<Google Auth Secret>
AUTH_GITHUB_ID=<GitHub Auth ID>
AUTH_GITHUB_SECRET=<GitHub Auth Secret>
AUTH_TRUST_HOST=TRUE

# Cloudinary (Media)
CLOUDINARY_CLOUD_NAME=<Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Cloudinary API Key>
CLOUDINARY_API_SECRET=<Cloudinary API Secret>

# Google Recaptcha
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<Recaptcha Site Key>
RECAPTCHA_SECRET_KEY=<Recaptcha Secret Key>

# Upstash (Rate Limiting)
UPSTASH_REDIS_REST_URL=<Upstash Redis URL>
UPSTASH_REDIS_REST_TOKEN=<Upstash Redis Token>
   ```

3. Start the development server:
   
   ```bash
     npm run dev
      ```

4. Open http://localhost:3000 to view ClientWords in development mode.

### Build for Production
To build the application for production, use:

```bash
npm run build
npm start
```
---

## Contributing
Contributions are very welcome! A contribution can be as small as a ⭐ or even finding and creating issues.

1. Fork the repository on GitHub.
2. Clone your forked repository:

   ```bash
   git clone https://github.com/your-username/clientwords.git
   ```
3. Create a new branch for your feature or fix:
   
    ```bash
     git checkout -b feature/your-feature-name
    ```

4. Make your changes and commit them with clear and concise messages.
5. Push your branch to GitHub
  ```bash
   git push origin feature/your-feature-name
  ```

6. Open a pull request on the main repository.

### Guidelines
- Keep your pull requests small and focused.
- Ensure code adheres to the project's style guidelines.
- Include documentation for new features or changes.
- Test your changes to avoid breaking existing functionality.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

---
## Acknowledgments
Thanks to all early adopters and contributors for valuable feedback and support!

---
Enjoy using ClientWords? Give us a star ⭐ on GitHub to show your support!

## Contact
For questions or support, reach out to us:

LinkedIn
Twitter
Email

```bash
This README includes instructions, environment setup, contributing guidelines, and contact information to help users and contributors understand, deploy, and collaborate on **ClientWords**.
```

