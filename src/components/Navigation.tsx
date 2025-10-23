import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu, X } from "lucide-react";
import { doSignOut } from "@/firebase/auth";

const Navigation = () => {
  const location = useLocation();
  const { userLoggedIn, currentUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await doSignOut();
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">
            Pinnacle Investment
          </Link>

          {/* Mobile toggle button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks isActive={isActive} />
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <UserSection
              userLoggedIn={userLoggedIn}
              currentUser={currentUser}
              handleSignOut={handleSignOut}
            />
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col space-y-4 md:hidden">
            <NavLinks isActive={isActive} />
            <UserSection
              userLoggedIn={userLoggedIn}
              currentUser={currentUser}
              handleSignOut={handleSignOut}
            />
          </div>
        )}
      </div>
    </header>
  );
};

// --- Reusable Subcomponents ---
const NavLinks = ({ isActive }: { isActive: (path: string) => boolean }) => (
  <>
    <Link
      to="/"
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive("/") ? "text-primary" : "text-muted-foreground"
      }`}
    >
      Home
    </Link>
    <Link
      to="/invest"
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive("/invest") ? "text-primary" : "text-muted-foreground"
      }`}
    >
      Invest
    </Link>
    <Link
      to="/updated-dashboard"
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive("/updated-dashboard") || isActive("/dashboard")
          ? "text-primary"
          : "text-muted-foreground"
      }`}
    >
      Dashboard
    </Link>
  </>
);

const UserSection = ({
  userLoggedIn,
  currentUser,
  handleSignOut,
}: any) => (
  <>
    {userLoggedIn ? (
      <div className="flex items-center space-x-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.user_metadata?.avatar_url} />
          <AvatarFallback>
            {currentUser.user_metadata?.full_name?.charAt(0) ||
              currentUser.email?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">
          {currentUser.user_metadata?.full_name || currentUser.email}
        </span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
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
  </>
);

export default Navigation;
