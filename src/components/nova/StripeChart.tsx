import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface DataPoint {
  name: string;
  value: number;
  secondary?: number;
}

interface StripeChartProps {
  data: DataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showSecondary?: boolean;
  className?: string;
}

// Stripe-inspired tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg shadow-xl p-3">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-semibold">{payload[0].value}</p>
        {payload[1] && (
          <p className="text-sm text-muted-foreground">{payload[1].value}</p>
        )}
      </div>
    );
  }
  return null;
};

export function StripeChart({
  data,
  title,
  subtitle,
  height = 200,
  showGrid = false,
  showSecondary = false,
  className,
}: StripeChartProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header - Stripe style */}
      {(title || subtitle) && (
        <div className="flex items-baseline justify-between">
          <div>
            {title && <h3 className="text-sm font-medium text-foreground">{title}</h3>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </div>
      )}
      
      {/* Chart */}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                strokeOpacity={0.3}
                vertical={false}
              />
            )}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Primary gradient */}
            <defs>
              <linearGradient id="stripeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="stripeGradientSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            {showSecondary && (
              <Area
                type="monotone"
                dataKey="secondary"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1.5}
                fill="url(#stripeGradientSecondary)"
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(var(--muted-foreground))' }}
              />
            )}
            
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              fill="url(#stripeGradient)"
              dot={false}
              activeDot={{ r: 5, fill: 'hsl(var(--accent))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}