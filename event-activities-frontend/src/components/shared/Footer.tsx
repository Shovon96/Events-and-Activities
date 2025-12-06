import Link from 'next/link';
import CommonLogo from './CommonLogo';

function Footer() {
  return (
    <footer className="bg-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <CommonLogo />
            <p className="text-sm text-muted py-2">The Eventora is a platform for event organizers to create and manage events.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-muted hover:text-secondary hover:underline">Home</Link></li>
              <li><Link href="/about" className="text-muted hover:text-secondary hover:underline">About Us</Link></li>
              <li><Link href="#" className="text-muted hover:text-secondary hover:underline">Services</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-secondary hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted hover:text-secondary hover:underline">FAQ</Link></li>
              <li><Link href="#" className="text-muted hover:text-secondary hover:underline">Help Center</Link></li>
              <li><Link href="#" className="text-muted hover:text-secondary hover:underline">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted hover:text-secondary hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary">Contact Us</h3>
            <p className="text-sm text-muted">
              Address: 123 Main St, City, Country<br />
              Phone: +1 123-456-7890<br />
              eventro@support.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-secondary">
          &copy; {new Date().getFullYear()} Eventora All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;