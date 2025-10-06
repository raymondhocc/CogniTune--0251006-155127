import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
interface ConfigSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
  disabled?: boolean;
}
export function ConfigSlider({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  className,
  disabled = false,
}: ConfigSliderProps) {
  const handleSliderChange = (values: number[]) => {
    onValueChange(values[0]);
  };
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <Label className="font-medium">{label}</Label>
        <Input
          type="number"
          className="w-24 h-8 text-center"
          value={value}
          onChange={(e) => onValueChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
    </div>
  );
}