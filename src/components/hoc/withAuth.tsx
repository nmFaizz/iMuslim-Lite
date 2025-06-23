import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loader from '@/components/Loader';

const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null: loading, true: allowed, false: redirecting

    useEffect(() => {
      const checkAuth = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session?.access_token) {
          toast.error('You must be logged in to access this page.');
          router.push('/login');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      };

      checkAuth(); 
    }, [router]);

    if (isAuthenticated === null) {
      return <Loader />;
    }

    if (isAuthenticated === false) {
      return null;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAuth;
