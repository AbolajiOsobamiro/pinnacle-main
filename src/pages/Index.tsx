import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Link, Navigate } from "react-router-dom";
import { TrendingUp, Shield, Award, Users, DollarSign, Star } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import elonMuskImage from "@/assets/musk.webp";
import donaldTrumpImage from "@/assets/trump.webp";
import vitalikButerinImage from "@/assets/vitalik.webp";
import goldmanSachsLogo from "@/assets/goldman-sachs-logo.jpg";
import morganStanleyLogo from "@/assets/morgan-stanley-logo.jpg";
import jpMorganLogo from "@/assets/jpmorgan.png";
import { doSignInWithGoogle } from "@/firebase/auth";
import { useAuth } from "../contexts/authContext";

const Index = () => {
  const { loading, userLoggedIn } = useAuth()
  const navigate = useNavigate();
  
  // Redirect authenticated users to dashboard

  useEffect(() => {
    if (!loading && userLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, userLoggedIn, navigate]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 text-gold bg-gold/10 border-gold/20">
            Endorsed by Industry Leaders
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Elite <span className="text-gradient">Crypto</span> Investment
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            The institutional-grade platform that caught every major memecoin pump. 
            Trusted by professionals, backed by Wall Street giants.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {!userLoggedIn ? (
               <Link to="/invest-steps">
               <Button size="lg" className="gradient-primary shadow-glow hover:shadow-premium transition-all duration-300 text-lg px-8 py-4">
                 <DollarSign className="mr-2 h-5 w-5" />
                 Invest Now
               </Button>
             </Link>
            ) : (
              <Link to="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-border/50 hover:bg-card/50">
                View Dashboard
              </Button>
            </Link>
            )}
           
            
          </div>
          
          {/* Stats Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-gradient mb-2">$100M+</div>
              <div className="text-muted-foreground text-lg">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-gradient mb-2">20,000+</div>
              <div className="text-muted-foreground text-lg">Active Investors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Endorsements */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Endorsed by Industry Leaders</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="gradient-card shadow-card border-border/50 text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <img src={elonMuskImage} alt="Elon Musk" className="w-full h-full object-cover" />
                </div>
                <CardTitle>Elon Musk</CardTitle>
                <CardDescription>CEO of Tesla & SpaceX</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Revolutionary approach to crypto investing. The future is here."
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50 text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <img src={donaldTrumpImage} alt="Donald Trump" className="w-full h-full object-cover" />
                </div>
                <CardTitle>Donald Trump</CardTitle>
                <CardDescription>47th President of USA</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Tremendous platform. The best crypto investment strategy I've seen."
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50 text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <img src={vitalikButerinImage} alt="Vitalik Buterin" className="w-full h-full object-cover" />
                </div>
                <CardTitle>Vitalik Buterin</CardTitle>
                <CardDescription>Ethereum Co-founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "Innovative institutional approach to decentralized finance."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven <span className="text-gradient">Track Record</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We caught every major memecoin pump and delivered exceptional returns to our investors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="gradient-card shadow-card border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success mb-2">2,340%</div>
                <div className="text-sm text-muted-foreground">DOGE Returns</div>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-card border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success mb-2">1,890%</div>
                <div className="text-sm text-muted-foreground">SHIB Returns</div>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-card border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success mb-2">4,200%</div>
                <div className="text-sm text-muted-foreground">PEPE Returns</div>
              </CardContent>
            </Card>
            
            <Card className="gradient-card shadow-card border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">98.7%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Institutional Backing */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Institutional <span className="text-gradient">Backing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Supported by the world's leading financial institutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center mx-auto mb-2">
                  <img src={goldmanSachsLogo} alt="Goldman Sachs" className="w-12 h-12 object-contain" />
                </div>
                <CardTitle>Goldman Sachs</CardTitle>
                <CardDescription>Investment Banking Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strategic partnership providing institutional-grade infrastructure and risk management.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center mx-auto mb-2">
                  <img src={morganStanleyLogo} alt="Morgan Stanley" className="w-12 h-12 object-contain" />
                </div>
                <CardTitle>Morgan Stanley</CardTitle>
                <CardDescription>Wealth Management Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced portfolio management and client advisory services for high-net-worth individuals.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center mx-auto mb-2">
                  <img src={jpMorganLogo} alt="JP Morgan" className="w-12 h-12 object-contain" />
                </div>
                <CardTitle>JP Morgan</CardTitle>
                <CardDescription>Banking & Custody Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure custody solutions and banking infrastructure for institutional cryptocurrency investments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">Pinnacle Investment</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <TrendingUp className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">Proven Performance</h3>
              <p className="text-muted-foreground">
                Track record of catching major cryptocurrency pumps with institutional-grade analysis and timing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">Institutional Security</h3>
              <p className="text-muted-foreground">
                Bank-grade security infrastructure backed by Wall Street's most trusted financial institutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">Elite Network</h3>
              <p className="text-muted-foreground">
                Access to exclusive opportunities through our network of industry leaders and institutional partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient">Join the Elite</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey with the platform that has consistently delivered exceptional returns 
            in the cryptocurrency market.
          </p>
          
          <Link to="/invest-steps">
            <Button size="lg" className="gradient-primary shadow-glow hover:shadow-premium transition-all duration-300 text-lg px-12 py-4">
              <DollarSign className="mr-2 h-5 w-5" />
              Start Investing Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;