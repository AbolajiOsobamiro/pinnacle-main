import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useAuth } from "../contexts/authContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { collection, query, where, orderBy, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { TrendingUp, TrendingDown, DollarSign, Wallet, Calendar, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";

interface Investment {
  id: string;
  cryptocurrency: string;
  symbol: string;
  amount_usd: number;
  status: string;
  created_at: string;
}

const UpdatedDashboard = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [multiplier, setMultiplier] = useState(1);


  useEffect(() => {
    if (userLoggedIn) {
      // Track login and increment multiplier
      const currentMultiplier = localStorage.getItem(`investment_multiplier_${userLoggedIn.id}`) || '1';
      const newMultiplier = parseFloat(currentMultiplier) * 2;
      localStorage.setItem(`investment_multiplier_${userLoggedIn.id}`, newMultiplier.toString());
      setMultiplier(newMultiplier);
      
      fetchInvestments();
    }
  }, [userLoggedIn]);

  const fetchInvestments = async () => {
    try {
      const investmentsRef = collection(db, "users", currentUser.uid, "investments");
      const q = query(investmentsRef, orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
  
      const investments: Investment[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
  
        return {
          id: doc.id,
          cryptocurrency: data.cryptocurrency,
          symbol: data.symbol,
          amount_usd: data.amount_usd,
          wallet_address: data.wallet_address,
          status: data.status,
          created_at: data.created_at?.toDate?.() ?? new Date() // handles Firestore timestamp
        };
      });
  
      setInvestments(investments);
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleWithdraw = async () => {
    if (!selectedInvestment || !withdrawAddress) return;
  
    console.log({
      currentUser,
      selectedInvestment,
      withdrawAddress
    });
    try {
      // 1. Add withdrawal record
      const withdrawalsRef = collection(db, "withdrawals");
      await addDoc(withdrawalsRef, {
        user_id: currentUser?.uid,
        investment_id: selectedInvestment.id,
        wallet_address: withdrawAddress,
        amount_usd: selectedInvestment.amount_usd * multiplier,
        status: 'withdrawn',
        created_at: new Date()
      });
  
      // 2. Update investment status to 'withdrawn'
      const investmentRef = doc(db, "users", currentUser.uid, "investments", selectedInvestment.id);
      await updateDoc(investmentRef, { status: 'withdrawn' });
  
      // 3. Notify & reset
      toast({
        title: "Withdrawal Initiated!",
        description: "You will receive your crypto deposit in a few seconds"
      });
  
      setIsWithdrawOpen(false);
      setWithdrawAddress("");
      setSelectedInvestment(null);
      fetchInvestments(); // Refresh
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast({
        title: "Error",
        description: "Failed to process withdrawal",
        variant: "destructive"
      });
    }
  };
  

  const totalInvested = investments.reduce((sum, inv) => sum + (inv.amount_usd * multiplier), 0);
  const activeAssets = investments.filter(inv => inv.status !== 'withdrawn').length;
  const confirmedInvestments = investments.filter(inv => inv.status === 'confirmed');
  const totalReturns = confirmedInvestments.reduce((sum, inv) => sum + (inv.amount_usd * multiplier * 0.15), 0); // Simulated 15% returns

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {currentUser.displayName || currentUser?.email?.split('@')[0]}!
          </h1>
          <p className="text-muted-foreground">Here's your investment portfolio overview</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card shadow-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalInvested + totalReturns).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Invested</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total capital deployed
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+${totalReturns.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15.2% average return
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAssets}</div>
              <p className="text-xs text-muted-foreground">
                Currently invested
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Investment Holdings */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Investments</CardTitle>
            <CardDescription>
              Track all your cryptocurrency investments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {investments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No investments yet</p>
               <Link to="/invest">
                  <Button>Start Investing</Button>      
                </Link>
                
              </div>
            ) : (
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div key={investment.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{investment.symbol}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{investment.cryptocurrency}</h3>
                        <p className="text-sm text-muted-foreground">
                          Invested: ${(investment.amount_usd * multiplier).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge 
                          variant={investment.status === 'confirmed' ? 'default' : 
                                   investment.status === 'withdrawn' ? 'secondary' : 'outline'}
                        >
                          {investment.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(investment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {['confirmed', 'pending'].includes(investment.status?.toLowerCase()) && (
                        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedInvestment(investment)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Withdraw
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Withdraw {selectedInvestment?.cryptocurrency}</DialogTitle>
                              <DialogDescription>
                                Enter your wallet address to receive your cryptocurrency
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="withdraw-address">Wallet Address</Label>
                                <Input
                                  id="withdraw-address"
                                  placeholder="Enter your wallet address"
                                  value={withdrawAddress}
                                  onChange={(e) => setWithdrawAddress(e.target.value)}
                                />
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" onClick={() => setIsWithdrawOpen(false)} className="flex-1">
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={handleWithdraw}
                                  disabled={!withdrawAddress}
                                  className="flex-1"
                                >
                                  Withdraw Now
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Key statistics about your investment performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">Bitcoin</div>
                <div className="text-sm text-muted-foreground">Best Performer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">0.85</div>
                <div className="text-sm text-muted-foreground">Portfolio Beta</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">2.1</div>
                <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive mb-1">-8.2%</div>
                <div className="text-sm text-muted-foreground">Max Drawdown</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UpdatedDashboard;