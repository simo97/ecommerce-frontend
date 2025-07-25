import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  alternativeText?: string;
  alternativeLink?: string;
  alternativeLinkText?: string;
}

export default function AuthLayout({ 
  children, 
  title, 
  subtitle,
  alternativeText,
  alternativeLink,
  alternativeLinkText
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <a href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-primary">Ktalog</h1>
          </a>
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-gray-600">
              {alternativeText && alternativeLink && alternativeLinkText ? (
                <>
                  {alternativeText}{' '}
                  <a href={alternativeLink} className="text-primary hover:text-primary-600 font-medium transition-colors">
                    {alternativeLinkText}
                  </a>
                </>
              ) : (
                subtitle
              )}
            </p>
          )}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            En continuant, vous acceptez nos{' '}
            <a href="#" className="text-primary hover:text-primary-600 transition-colors">
              Conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="#" className="text-primary hover:text-primary-600 transition-colors">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}