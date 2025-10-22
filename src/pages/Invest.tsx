import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { Bitcoin, DollarSign, TrendingUp, Coins, Circle, Copy } from "lucide-react";

const cryptoOptions = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    price: "$108,532.50",
    change: "+2.4%",
    description: "The original cryptocurrency",
    address: "bc1pxts2465dsqlw0tqv2hdvj5qdd4krmu2wtxwqx7mtcqmcqdp34yfs5kr96w"
  },
  {
    name: "Solana",
    symbol: "SOL",
    icon: Circle,
    price: "$186.55",
    change: "+5.2%",
    description: "High-performance blockchain",
    address: "8N2sV5LNeoY5QmeRiPfgyCQi1T3VALFRfDJv7XcnhDto"
  },
  {
    name: "Ethereum",
    symbol: "ETH", 
    icon: Coins,
    price: "$3,889.78",
    change: "+1.8%",
    description: "Smart contract platform",
    address: "0xC66583F5053f4bAEAE2515BA1B3d010D42d5C81C"
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: TrendingUp,
    price: "$1.00",
    change: "+0.1%",
    description: "Stable digital currency",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    icon: TrendingUp,
    price: "$0.19",
    change: "+12.5%",
    description: "The people's crypto",
    address: "0x4206931337dc273a630d328da6441786bfad668f"
  }
];

const Invest = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Invest in <span className="text-gradient">Premium Crypto</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access institutional-grade cryptocurrency investments backed by our proven track record 
              of catching major pumps and $100M+ AUM.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {cryptoOptions.map((crypto) => {
              const IconComponent = crypto.icon;
              return (
                <Card key={crypto.symbol} className="gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{crypto.name}</CardTitle>
                          <CardDescription>{crypto.symbol}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{crypto.price}</div>
                        <div className="text-success text-sm">{crypto.change}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{crypto.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`wallet-${crypto.symbol}`}>Wallet Address</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id={`wallet-${crypto.symbol}`}
                            value={crypto.address}
                            readOnly
                            className="font-mono text-sm bg-muted/50"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(crypto.address)}
                            className="px-3"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <Link to="/invest-flow">
                          <Button className="w-full gradient-primary shadow-glow hover:shadow-premium transition-all duration-300">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Invest in {crypto.symbol}
                          </Button>
                        </Link>
                      
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="gradient-card shadow-premium border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Investment Summary</CardTitle>
              <CardDescription className="text-center">
                Review your portfolio allocation before proceeding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-success">$0</div>
                  <div className="text-sm text-muted-foreground">Total Investment</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Assets Selected</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold text-gold">Pro</div>
                  <div className="text-sm text-muted-foreground">Management Tier</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Invest;