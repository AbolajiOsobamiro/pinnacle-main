import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { doSignOut } from "@/firebase/auth";

const Navigation = () => {
  const location = useLocation();
  const { userLoggedIn, loading,currentUser } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await doSignOut();
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">
            Pinnacle Investment
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/invest" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/invest') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Invest
            </Link>
            <Link 
              to="/updated-dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/updated-dashboard') || isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {userLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {currentUser.user_metadata?.full_name?.charAt(0) || currentUser.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline">
                  {currentUser.user_metadata?.full_name || currentUser.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="gradient-primary shadow-glow">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;