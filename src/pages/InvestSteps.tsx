import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const InvestSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Click on the invest now button",
      description: "Navigate to the investment page by clicking the invest now button at the bottom of this page"
    },
    {
      number: 2,
      title: "Choose your cryptocurrency",
      description: "Select the cryptocurrency or coin you want to invest in from our available options"
    },
    {
      number: 3,
      title: "Enter investment amount",
      description: "Specify the amount that you want to invest in USD"
    },
    {
      number: 4,
      title: "Copy the wallet address",
      description: "Copy the unique wallet address for the particular coin or cryptocurrency"
    },
    {
      number: 5,
      title: "Transfer your funds",
      description: "Transfer the amount that you want to invest to that unique wallet address"
    },
    {
      number: 6,
      title: "Check your dashboard",
      description: "Monitor your investment by checking your dashboard to see the amount invested"
    },
    {
      number: 7,
      title: "Watch your portfolio grow",
      description: "Keep checking to see your portfolio grow over time"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            How to Invest
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to start your cryptocurrency investment journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {steps.map((step, index) => (
              <Card key={step.number} className="relative">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mr-4">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base ml-16">
                    {step.description}
                  </CardDescription>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="absolute left-6 bottom-0 transform translate-y-6">
                    <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/invest-flow">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Investing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestSteps;