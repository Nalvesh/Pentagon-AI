"use client";

import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";


import { Button } from "@/components/ui/button";

type SubscriptionButtonProps = {
  isPro: boolean;
};

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error: unknown) {
      
      console.error("[BILLING_ERROR]: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      aria-disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

