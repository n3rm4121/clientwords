import Link from 'next/link';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-200 to-gray-300 min-h-screen flex items-center justify-center">
      <MaxWidthWrapper>
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Oops! Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <Link href="/">
            <Button>
              Go Back to Homepage
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
