# Neurova - Cognitive Interface Lab

> The interface is no longer the screen.

A cutting-edge web experience showcasing the future of cognitive interfaces. Built with React, Three.js, and modern web technologies.

## 🚀 Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **3D Visualization**: Interactive synapse model with real-time rendering
- **Performance Optimized**: Adaptive quality based on device capabilities
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Neural Network Effects**: Dynamic particle field with cursor interaction
- **Modern Stack**: React 19, TypeScript, Tailwind CSS, Vite

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Framer Motion + GSAP
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Manit098/neurova.git
cd neurova

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Development

### Project Structure

```
src/
├── components/
│   ├── neurova/          # Main application components
│   │   ├── Synapse.tsx   # 3D synapse model component
│   │   ├── Hero.tsx      # Landing hero section
│   │   ├── Nav.tsx       # Navigation component
│   │   └── ...
│   └── ui/               # Reusable UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── routes/               # Page routes (TanStack Router)
└── styles.css           # Global styles and design tokens
```

### Key Components

- **Synapse.tsx**: Interactive 3D model with mobile optimizations
- **NeuralField.tsx**: Performance-optimized particle background
- **Hero.tsx**: Responsive landing section with adaptive typography
- **Nav.tsx**: Mobile-first navigation with touch-friendly interactions

## 🎨 Design System

The project uses a custom dark theme with neural cyan accents:

- **Primary**: Neural cyan glow (`oklch(0.77 0.155 218)`)
- **Background**: Dark cinematic (`oklch(0.07 0.006 242)`)
- **Typography**: Inter + JetBrains Mono
- **Animations**: Custom keyframes for floating, pulsing, and flickering effects

## 📱 Responsive Features

- **Mobile Optimizations**:
  - Reduced 3D model complexity on mobile
  - Touch-friendly tap targets (44px minimum)
  - Adaptive typography with clamp() functions
  - Performance detection for low-end devices

- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## ⚡ Performance

- **3D Optimizations**:
  - Adaptive particle count based on device
  - Simplified lighting on mobile
  - LOD (Level of Detail) adjustments
  - WebGL performance preferences

- **Bundle Optimization**:
  - Tree-shaking for 3D libraries
  - Code splitting by route
  - Optimized assets and textures

## 🔧 Configuration

### Vite Config

The project uses custom Vite configuration for TanStack Router and optimal build settings.

### Tailwind CSS

Custom design tokens and utilities are defined in `styles.css` with mobile-first responsive utilities.

## 🚀 Deployment

### Vercel

The project is configured for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the React/Vite setup
3. Build command: `npm run build`
4. Output directory: `dist`
5. Install command: `npm install`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 🐛 Troubleshooting

### Common Issues

**3D Model Not Loading**
- Check WebGL support in your browser
- Ensure hardware acceleration is enabled
- Try refreshing the page

**Performance Issues**
- The app automatically detects low-end devices
- 3D quality is reduced on mobile
- Close other browser tabs for better performance

**Deployment Issues**
- Ensure `package.json` has correct build scripts
- Check that all dependencies are properly installed
- Verify build output in `dist/` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Demo**: [https://neurova-pi.vercel.app/]
- **GitHub Repository**: https://github.com/Manit098/neurova
- **Vercel Dashboard**: https://vercel.com/dashboard

---

Built with ❤️ using modern web technologies
