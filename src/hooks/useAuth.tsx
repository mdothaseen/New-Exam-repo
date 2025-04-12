
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type UserRole = 'admin' | 'assessor' | 'candidate' | 'team' | 'ssc';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check local storage for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // This is just a mock login for demonstration
      // In a real app, you would validate credentials against your backend
      
      // Mock users for demonstration - Updated to CeeVision emails
      const mockUsers: Record<string, User> = {
        'admin@ceevision.in': {
          id: '1',
          name: 'Admin User',
          email: 'admin@ceevision.in',
          role: 'admin',
          permissions: ['all']
        },
        'assessor@ceevision.in': {
          id: '2',
          name: 'Assessor User',
          email: 'assessor@ceevision.in',
          role: 'assessor',
          permissions: ['view_candidates', 'view_batches', 'conduct_assessment']
        },
        'candidate@ceevision.in': {
          id: '3',
          name: 'Candidate User',
          email: 'candidate@ceevision.in',
          role: 'candidate',
          permissions: ['take_exam', 'view_results']
        },
        'team@ceevision.in': {
          id: '4',
          name: 'Team/NCVET User',
          email: 'team@ceevision.in',
          role: 'team',
          permissions: ['view_reports', 'view_candidates']
        },
        'ssc@ceevision.in': {
          id: '5',
          name: 'SSC User',
          email: 'ssc@ceevision.in',
          role: 'ssc',
          permissions: ['view_content', 'view_reports']
        }
      };

      // Check if email exists and password is "password" (for demo)
      if (mockUsers[email] && password === "password") {
        const loggedInUser = mockUsers[email];
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));

        // Redirect based on role
        if (loggedInUser.role === 'candidate') {
          navigate('/exam/demo-exam');
        } else {
          navigate('/dashboard');
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Navigate to login regardless of current location
    navigate('/login');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin' || user.permissions.includes('all')) {
      return true;
    }
    
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    userRole: user?.role || null,
    login,
    logout,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
