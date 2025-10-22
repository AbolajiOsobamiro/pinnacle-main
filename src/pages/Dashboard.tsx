import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { TrendingUp, DollarSign, PieChart, Award } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";


const portfolioData = [
  {
    asset: "Bitcoin",
    symbol: "BTC",
    amount: "$12,500",
    percentage: "45%",
    change: "+8.2%",
    status: "profitable"
  },
  {
    asset: "Ethereum", 
    symbol: "ETH",
    amount: "$8,750",
    percentage: "32%",
    change: "+5.1%",
    status: "profitable"
  },
  {
    asset: "Dogecoin",
    symbol: "DOGE", 
    amount: "$4,200",
    percentage: "15%",
    change: "+15.3%",
    status: "profitable"
  },
  {
    asset: "Shiba Inu",
    symbol: "SHIB",
    amount: "$2,100",
    percentage: "8%",
    change: "+22.7%",
    status: "profitable"
  }
];

const Dashboard = () => {
  const { userLoggedIn, loading, currentUser } = useAuth();
  
    // 🔁 Show a spinner while checking auth state
    if (loading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }
  
    // 🔒 Redirect to login if user is not logged in
    if (!userLoggedIn || !currentUser) {
      return <Navigate to="/auth" replace />;
    }
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back <span className="text-gradient">{currentUser.displayName.split(" ")[0] || "Investor"}</span>
            </h1>
            <p className="text-muted-foreground">
              Track your cryptocurrency investments and portfolio performance
            </p>
          </div>

          {/* Portfolio Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">$27,550</div>
                <div className="flex items-center text-sm text-success mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.8% this month
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$25,000</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <DollarSign className="mr-1 h-3 w-3" />
                  Initial capital
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">+$2,550</div>
                <div className="flex items-center text-sm text-success mt-1">
                  <Award className="mr-1 h-3 w-3" />
                  +10.2% ROI
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <PieChart className="mr-1 h-3 w-3" />
                  Diversified
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Breakdown */}
          <Card className="gradient-card shadow-premium border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Portfolio Breakdown</CardTitle>
              <CardDescription>Your current cryptocurrency holdings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.map((item) => (
                  <div key={item.symbol} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{item.symbol}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{item.asset}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage} of portfolio</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">{item.amount}</div>
                      <Badge variant="secondary" className="text-success bg-success/10">
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key investment statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Performing Asset</span>
                  <span className="font-semibold text-success">SHIB (+22.7%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Portfolio Beta</span>
                  <span className="font-semibold">1.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sharpe Ratio</span>
                  <span className="font-semibold text-primary">2.8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Drawdown</span>
                  <span className="font-semibold">-5.2%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-card border-border/50">
              <CardHeader>
                <CardTitle>Investment Timeline</CardTitle>
                <CardDescription>Your investment journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div className="flex-1">
                    <div className="font-medium">Initial Investment</div>
                    <div className="text-sm text-muted-foreground">$25,000 • 30 days ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <div className="font-medium">Portfolio Rebalancing</div>
                    <div className="text-sm text-muted-foreground">Optimized allocation • 15 days ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                  <div className="flex-1">
                    <div className="font-medium">Profit Taking</div>
                    <div className="text-sm text-muted-foreground">Secured gains • 5 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;