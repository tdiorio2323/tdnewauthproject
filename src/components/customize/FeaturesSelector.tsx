import { Section } from "./Section";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FeaturesConfig {
  tipJar: boolean;
  tipAmount: string;
  monthlySubscription: boolean;
  subscriptionPrice: string;
  subscriptionTitle: string;
}

interface FeaturesSelectorProps {
  features: FeaturesConfig;
  setFeatures: (features: FeaturesConfig) => void;
}

export function FeaturesSelector({ features, setFeatures }: FeaturesSelectorProps) {
  const updateFeature = <K extends keyof FeaturesConfig>(
    key: K, 
    value: FeaturesConfig[K]
  ) => {
    setFeatures({ ...features, [key]: value });
  };

  return (
    <Section title="Premium Features">
      <div className="space-y-6">
        {/* Tip Jar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-white/90">💰 Tip Jar</Label>
            <Switch 
              checked={features.tipJar}
              onCheckedChange={(value) => updateFeature("tipJar", value)}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          {features.tipJar && (
            <div>
              <Label className="text-xs text-white/80 mb-2 block">Suggested Tip Amount</Label>
              <Input
                value={features.tipAmount}
                onChange={(e) => updateFeature("tipAmount", e.target.value)}
                placeholder="$5"
                className="bg-white border-white/30 text-black placeholder:text-black/60"
              />
            </div>
          )}
        </div>

        {/* Monthly Subscription */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-white/90">⭐ Monthly Subscription</Label>
            <Switch 
              checked={features.monthlySubscription}
              onCheckedChange={(value) => updateFeature("monthlySubscription", value)}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          {features.monthlySubscription && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-white/80 mb-2 block">Subscription Title</Label>
                <Input
                  value={features.subscriptionTitle}
                  onChange={(e) => updateFeature("subscriptionTitle", e.target.value)}
                  placeholder="VIP Access"
                  className="bg-white border-white/30 text-black placeholder:text-black/60"
                />
              </div>
              <div>
                <Label className="text-xs text-white/80 mb-2 block">Monthly Price</Label>
                <Input
                  value={features.subscriptionPrice}
                  onChange={(e) => updateFeature("subscriptionPrice", e.target.value)}
                  placeholder="$9.99"
                  className="bg-white border-white/30 text-black placeholder:text-black/60"
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-white/60 text-center pt-2 border-t border-white/20">
          More features coming soon: Event booking, Digital products, Analytics
        </div>
      </div>
    </Section>
  );
}