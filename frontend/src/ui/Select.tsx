import * as RxSelect from '@radix-ui/react-select';
import type { ReactNode } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const triggerClass =
  'inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-bg border border-line text-sm text-ink data-[state=open]:border-primary focus:border-primary focus:outline-none transition-colors';

const contentClass =
  'z-[200] overflow-hidden bg-bg border border-line rounded-lg shadow-lg dd-in min-w-[var(--radix-select-trigger-width)]';

const itemClass =
  'flex items-center gap-2 px-3 py-2 text-sm text-ink rounded-md cursor-pointer outline-none data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary data-[state=checked]:font-medium';

export function Select({ value, onValueChange, options, placeholder, className, ariaLabel, disabled }: SelectProps) {
  return (
    <RxSelect.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <RxSelect.Trigger className={triggerClass + (disabled ? ' opacity-60 cursor-not-allowed' : '') + (className ? ' ' + className : '')} aria-label={ariaLabel}>
        <RxSelect.Value placeholder={placeholder} />
        <RxSelect.Icon className="text-ink-soft">
          <ChevronDown />
        </RxSelect.Icon>
      </RxSelect.Trigger>
      <RxSelect.Portal>
        <RxSelect.Content className={contentClass} position="popper" sideOffset={6}>
          <RxSelect.Viewport className="p-1.5">
            {options.map((opt) => (
              <RxSelect.Item key={opt.value} value={opt.value} className={itemClass}>
                <RxSelect.ItemIndicator className="text-primary">
                  <Check />
                </RxSelect.ItemIndicator>
                <RxSelect.ItemText>{opt.label}</RxSelect.ItemText>
              </RxSelect.Item>
            ))}
          </RxSelect.Viewport>
        </RxSelect.Content>
      </RxSelect.Portal>
    </RxSelect.Root>
  );
}

function ChevronDown(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function Check(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
