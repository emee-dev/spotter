"use client";

import { createSignal } from "solid-js";
import { Check } from "lucide-solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { Slider } from "~/components/ui/slider";
import { Button } from "~/components/ui/button";

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = createSignal(false);
  const [requestVolume, setRequestVolume] = createSignal([400]);

  const calculatePrice = (requests: number) => {
    const basePrice = 34;
    const additionalRequests = Math.max(0, requests - 400);
    const additionalCost = Math.floor(additionalRequests / 500) * 1;
    return basePrice + additionalCost;
  };

  return (
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
        <p class="text-muted-foreground">
          Choose the plan that's right for you
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>
              For individual developers and small teams
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="text-4xl font-bold">$0</div>
            <p class="text-sm text-muted-foreground">No credit card required</p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>1 API</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>250K API Requests</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>3 Users</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>7 Days Data Retention</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>Live Chat Support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button class="w-full" variant="outline">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Pay as you go Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Pay as you go</CardTitle>
            <CardDescription>For Growing Companies</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-center gap-2">
              <span>Monthly</span>
              <Switch
                checked={isAnnual()}
                onCheckedChange={setIsAnnual}
                class="data-[state=checked]:bg-green-600"
              />
              <span>Annual</span>
            </div>

            <div>
              <div class="text-4xl font-bold mb-2">
                $
                {isAnnual()
                  ? Math.floor(calculatePrice(requestVolume()[0]) * 0.9)
                  : calculatePrice(requestVolume()[0])}
                <span class="text-base font-normal text-muted-foreground">
                  /{isAnnual() ? "year" : "month"}
                </span>
              </div>
              <div class="text-sm text-muted-foreground mb-4">
                {requestVolume()}k requests per month
              </div>
              <Slider
                value={requestVolume()}
                onValueChange={setRequestVolume}
                max={2000}
                min={400}
                step={100}
                class="mb-6 [&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-600 [&_[role=track]]:bg-green-600"
              />
              <p class="text-sm text-muted-foreground">
                Then $1 per 500k events
              </p>
            </div>

            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>Everything in free plan</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>Unlimited team members</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>Opentelemetry Logs and Traces</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>API testing pipelines</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>API swagger/OpenAPI hosting / Generation</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>API webhooks / Notifications</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>API live traffic AI-based validations</span>
              </li>
              <li class="flex items-center gap-2">
                <Check class="h-4 w-4 text-green-600" />
                <span>30 days data retention</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button class="w-full bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
