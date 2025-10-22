import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/authContext";
import { Copy, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const InvestFlow = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const { toast } = useToast();
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  const cryptoOptions = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      price: "$108,532.50",
      walletAddress: "bc1pxts2465dsqlw0tqv2hdvj5qdd4krmu2wtxwqx7mtcqmcqdp34yfs5kr96w"
    },
    {
      name: "Ethereum", 
      symbol: "ETH",
      icon: "Ξ",
      price: "$3,889.78",
      walletAddress: "0xC66583F5053f4bAEAE2515BA1B3d010D42d5C81C"
    },
    {
      name: "Solana",
      symbol: "SOL",
      icon: "S",
      price: "$186.55",
      walletAddress: "8N2sV5LNeoY5QmeRiPfgyCQi1T3VALFRfDJv7XcnhDto"
      },
    {
      name: "Dogecoin",
      symbol: "DOGE", 
      icon: "Ð",
      price: "$0.19",
      walletAddress: "0x4206931337dc273a630d328da6441786bfad668f"
    },
    {
      name: "USDC",
      symbol: "USDC",
      icon: "$",
      price: "$1.00",
      walletAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    },
  ];

  const selectedCryptoData = cryptoOptions.find(crypto => crypto.symbol === selectedCrypto);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleCryptoSelect = (symbol: string) => {
    setSelectedCrypto(symbol);
    setStep(2);
  };

  const handleInvestment = async () => {
    if (!userLoggedIn || !amount || !selectedCryptoData) return;

    try {
      const investmentsRef = collection(db, "users", currentUser.uid, "investments");
      await addDoc(investmentsRef, {
        user_id: currentUser.uid,
        cryptocurrency: selectedCryptoData.name,
        symbol: selectedCryptoData.symbol,
        amount_usd: parseFloat(amount),
        wallet_address: selectedCryptoData.walletAddress,
        status: 'pending',
        created_at: new Date() // optional: for ordering
      });
  

      toast({
        title: "Investment Recorded!",
        description: "Your investment has been recorded. Transfer the funds to complete the process."
      });

      setStep(3);
    } catch (error) {
      console.error("Error recording investment:", error);
      toast({
        title: "Error",
        description: "Failed to record investment",
        variant: "destructive"
      });
    }
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/invest-steps">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Steps
              </Button>
            </Link>
          </div>

          {step === 1 && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Choose Your Cryptocurrency
                </h1>
                <p className="text-xl text-muted-foreground">
                  Select the cryptocurrency you want to invest in
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cryptoOptions.map((crypto) => (
                  <Card 
                    key={crypto.symbol} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCryptoSelect(crypto.symbol)}
                  >
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{crypto.icon}</div>
                      <CardTitle className="text-2xl">{crypto.name}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-primary">
                        {crypto.symbol} - {crypto.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Button className="w-full">
                        Select {crypto.symbol}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {step === 2 && selectedCryptoData && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Enter Investment Amount
                </h1>
                <p className="text-xl text-muted-foreground">
                  How much would you like to invest in {selectedCryptoData.name}?
                </p>
              </div>

              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{selectedCryptoData.icon}</div>
                  <CardTitle className="text-2xl">{selectedCryptoData.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-primary">
                    {selectedCryptoData.symbol} - {selectedCryptoData.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Investment Amount (USD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount in USD"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Wallet Address</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={selectedCryptoData.walletAddress}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedCryptoData.walletAddress)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleInvestment}
                      disabled={!amount || parseFloat(amount) <= 0}
                      className="flex-1"
                    >
                      Record Investment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {step === 3 && selectedCryptoData && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Transfer Your Funds
                </h1>
                <p className="text-xl text-muted-foreground">
                  Complete your investment by transferring the funds
                </p>
              </div>

              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{selectedCryptoData.icon}</div>
                  <CardTitle className="text-2xl">Investment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-lg"><strong>Cryptocurrency:</strong> {selectedCryptoData.name}</p>
                    <p className="text-lg"><strong>Amount:</strong> ${amount} USD</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Transfer to this wallet address:</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={selectedCryptoData.walletAddress}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedCryptoData.walletAddress)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Next Steps:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Copy the wallet address above</li>
                      <li>Open your crypto wallet app</li>
                      <li>Send exactly ${amount} worth of {selectedCryptoData.symbol}</li>
                      <li>Check your dashboard to monitor your investment</li>
                    </ol>
                  </div>

                  <Button onClick={handleComplete} className="w-full">
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default InvestFlow;