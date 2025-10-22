import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Chrome, Shield, TrendingUp } from "lucide-react";
import { doSignInWithGoogle } from "@/firebase/auth";
import { useAuth } from "../contexts/authContext"

const Auth = () => {
  const { userLoggedIn, loading } = useAuth()
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Redirect if already signed in

  const handleGoogleSignIn = async (e) => {
    e.preventDefault()
    if(!isSigningIn) {
      setIsSigningIn(true)
      await doSignInWithGoogle().catch(err => {
        setIsSigningIn(false)
      })
    }
  }

  if (!loading && userLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading || isSigningIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Pinnacle Investment
          </h1>
          <p className="text-muted-foreground">
            Join 20,000+ elite crypto investors
          </p>
        </div>

        <Card className="gradient-card shadow-premium border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your investment dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full gradient-primary shadow-glow hover:shadow-premium transition-all duration-300"
              size="lg"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-success" />
                <span>Bank-grade security</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-success" />
                <span>Institutional-grade platform</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Chrome className="h-4 w-4 text-success" />
                <span>Secure Google authentication</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;