# Travel Agency Frontend site

A modern, responsive travel agency website built with Next.js 15, TypeScript, and Tailwind CSS. This application showcases beautiful travel destinations, packages, and provides seamless user experience for travel bookings and inquiries.

## ✨ Features,,,

- 🏠 **Hero Section** with video background and floating inquiry form
- 📦 **Featured Travel Packages** with detailed information
- 🌍 **Destinations Gallery** showcasing popular travel spots
- 💬 **Customer Testimonials** with ratings and reviews
- ❓ **Why Choose Us** section highlighting company benefits
- 📞 **Contact & About Pages** for customer engagement
- 📱 **Fully Responsive** design for all devices
- 🎨 **Modern UI/UX** with smooth animations and gradients
- 🌙 **Dark/Light Mode** support with next-themes
- 📝 **Inquiry Forms** for customer lead generation
- end----------------------------------------------

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + Custom UI components
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Build Tool**: [Turbopack](https://turbo.build/pack)

## 📁 Project Structure

```
travel-agency-frontend/
├── public/                 # Static assets
│   ├── *.svg              # SVG icons and logos
│   └── favicon.ico        # Website favicon
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── sonner.tsx
│   │   ├── Destinations.tsx
│   │   ├── FeaturedPackages.tsx
│   │   ├── FloatingInquiryForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── InquiryForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── Testimonials.tsx
│   │   └── WhyChooseUs.tsx
│   └── lib/
│       └── utils.ts       # Utility functions
├── components.json        # shadcn/ui configuration
├── next.config.ts         # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── eslint.config.mjs     # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd travel-agency-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Key Components

### Core Components

- **Hero**: Landing section with video background and CTA
- **Navbar**: Navigation with responsive design
- **FeaturedPackages**: Display travel packages with pricing
- **Destinations**: Showcase popular travel destinations
- **Testimonials**: Customer reviews and ratings
- **WhyChooseUs**: Company benefits and features
- **Footer**: Contact information and links

### Form Components

- **InquiryForm**: Main contact form for leads
- **FloatingInquiryForm**: Compact floating form variant

### UI Components

- **Button**: Customizable button with variants
- **Card**: Reusable card container
- **Badge**: Status and category indicators

## 🎨 Styling & Design

- **Tailwind CSS v4** for utility-first styling
- **Custom gradients** and animations
- **Responsive design** for mobile, tablet, and desktop
- **Modern typography** with custom font configurations
- **Smooth transitions** and hover effects

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: One-click deployment
- **Docker**: Use the included Dockerfile for containerization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any inquiries or support, please contact:

- Phone: +91-9876543210
- Email: info@travelagency.com

---

**Built with ❤️ using Next.js and TypeScript**
