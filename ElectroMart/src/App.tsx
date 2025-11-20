import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandShowcase } from './components/BrandShowcase';
import { ProductShowcase } from './components/ProductShowcase';
import { Features } from './components/Features';
import { ComparisonSection } from './components/ComparisonSection';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <Cart />
      <Toaster position="top-right" richColors closeButton />
      <main>
        <Hero />
        <BrandShowcase />
        <ProductShowcase />
        <Features />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
}
