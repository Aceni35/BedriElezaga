import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { format, parseISO, isValid } from 'date-fns';
import { sq } from 'date-fns/locale';
import 'react-day-picker/style.css';

interface DatePickerProps {
  value: string;
  onChange: (iso: string) => void;
  className?: string;
}

const triggerClass =
  'inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-bg border border-line text-sm text-ink data-[state=open]:border-primary focus:border-primary focus:outline-none transition-colors';

const contentClass =
  'z-[200] bg-bg border border-line rounded-xl shadow-lg p-3 dd-in';

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = value ? parseISO(value) : undefined;
  const isSelectedValid = selected && isValid(selected);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(date.toISOString());
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className={triggerClass + (className ? ' ' + className : '')}>
        <span className={isSelectedValid ? '' : 'text-ink-soft'}>
          {isSelectedValid ? format(selected as Date, 'd MMMM yyyy', { locale: sq }) : 'Zgjidh datën'}
        </span>
        <CalendarIcon />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={contentClass} sideOffset={6} align="start">
          <DayPicker
            mode="single"
            locale={sq}
            selected={isSelectedValid ? (selected as Date) : undefined}
            onSelect={handleSelect}
            showOutsideDays
            className="rdp-bedri"
            classNames={{
              months: 'flex',
              month: 'space-y-2',
              caption: 'flex justify-center items-center text-sm font-medium',
              caption_label: 'capitalize',
              nav: 'flex items-center gap-1',
              nav_button:
                'inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-surface text-ink-soft',
              table: 'w-full border-collapse',
              head_row: 'flex',
              head_cell: 'text-ink-soft w-9 font-normal text-[11px]',
              row: 'flex w-full mt-1',
              cell: 'h-9 w-9 text-center text-sm p-0',
              day: 'h-9 w-9 rounded-md hover:bg-surface text-ink',
              day_today: 'font-semibold text-primary',
              day_selected:
                'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary',
              day_outside: 'text-ink-soft/50',
              day_disabled: 'opacity-40',
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-soft">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
