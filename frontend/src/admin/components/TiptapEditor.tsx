import { useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import * as Popover from '@radix-ui/react-popover';

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

const TEXT_COLORS = [
  '#2b201a', // ink (default-ish)
  '#7a2e2e', // primary burgundy
  '#1a2942', // navy
  '#2d4a3e', // forest
  '#c89961', // accent
  '#b91c1c', // red
  '#0f766e', // teal
  '#7c3aed', // purple
];

const HIGHLIGHT_COLORS = [
  '#fef3c7', // amber
  '#fde68a',
  '#fecaca', // pink-red
  '#bbf7d0', // green
  '#bfdbfe', // blue
  '#e9d5ff', // purple
  '#f5f5f5', // gray
];

export function TiptapEditor({ value, onChange, placeholder, ariaLabel }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Placeholder.configure({
        placeholder: placeholder ?? '',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'prose-tiptap focus:outline-none min-h-[260px] px-4 py-3 text-[15px] leading-[1.7]',
        ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === '<p></p>' ? '' : html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  return (
    <div className="rounded-lg border border-line bg-bg overflow-hidden focus-within:border-primary transition-colors">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

interface ToolbarProps {
  editor: Editor | null;
}

function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return <div className="border-b border-line bg-surface px-2 py-1.5 h-[42px]" />;
  }

  const btnBase =
    'inline-flex items-center justify-center w-8 h-8 rounded-md text-ink-soft hover:bg-bg hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
  const activeCls = 'bg-primary-soft text-primary hover:bg-primary-soft hover:text-primary';

  const isActive = (name: string, attrs?: Record<string, unknown>) =>
    editor.isActive(name, attrs);

  const promptLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const input = window.prompt('URL', previous ?? 'https://');
    if (input === null) return;
    if (input === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: input }).run();
  };

  const setColor = (color: string | null) => {
    if (color === null) editor.chain().focus().unsetColor().run();
    else editor.chain().focus().setColor(color).run();
  };

  const setHighlight = (color: string | null) => {
    if (color === null) editor.chain().focus().unsetHighlight().run();
    else editor.chain().focus().setHighlight({ color }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-surface px-1.5 py-1.5">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnBase + (isActive('bold') ? ' ' + activeCls : '')}
        aria-label="Bold"
        title="Bold"
      >
        <BoldIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnBase + (isActive('italic') ? ' ' + activeCls : '')}
        aria-label="Italic"
        title="Italic"
      >
        <ItalicIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btnBase + (isActive('underline') ? ' ' + activeCls : '')}
        aria-label="Underline"
        title="Underline"
      >
        <UnderlineIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnBase + (isActive('strike') ? ' ' + activeCls : '')}
        aria-label="Strikethrough"
        title="Strikethrough"
      >
        <StrikeIcon />
      </button>

      <ColorPopover
        editor={editor}
        currentColor={(editor.getAttributes('textStyle').color as string) ?? null}
        onPick={setColor}
        palette={TEXT_COLORS}
        title="Text color"
        icon={<TextColorIcon />}
        btnClass={btnBase}
      />
      <HighlightPopover
        currentColor={(editor.getAttributes('highlight').color as string) ?? null}
        onPick={setHighlight}
        palette={HIGHLIGHT_COLORS}
        title="Highlight"
        icon={<HighlightIcon />}
        btnClass={btnBase + (isActive('highlight') ? ' ' + activeCls : '')}
      />

      <Divider />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnBase + (isActive('heading', { level: 2 }) ? ' ' + activeCls : '')}
        aria-label="Heading 2"
        title="Heading 2"
      >
        <span className="text-xs font-semibold">H2</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={btnBase + (isActive('heading', { level: 3 }) ? ' ' + activeCls : '')}
        aria-label="Heading 3"
        title="Heading 3"
      >
        <span className="text-xs font-semibold">H3</span>
      </button>

      <Divider />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={btnBase + (editor.isActive({ textAlign: 'left' }) ? ' ' + activeCls : '')}
        aria-label="Align left"
        title="Align left"
      >
        <AlignLeftIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={btnBase + (editor.isActive({ textAlign: 'center' }) ? ' ' + activeCls : '')}
        aria-label="Align center"
        title="Align center"
      >
        <AlignCenterIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={btnBase + (editor.isActive({ textAlign: 'right' }) ? ' ' + activeCls : '')}
        aria-label="Align right"
        title="Align right"
      >
        <AlignRightIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={btnBase + (editor.isActive({ textAlign: 'justify' }) ? ' ' + activeCls : '')}
        aria-label="Justify"
        title="Justify"
      >
        <AlignJustifyIcon />
      </button>

      <Divider />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnBase + (isActive('bulletList') ? ' ' + activeCls : '')}
        aria-label="Bullet list"
        title="Bullet list"
      >
        <BulletListIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnBase + (isActive('orderedList') ? ' ' + activeCls : '')}
        aria-label="Ordered list"
        title="Ordered list"
      >
        <OrderedListIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnBase + (isActive('blockquote') ? ' ' + activeCls : '')}
        aria-label="Blockquote"
        title="Blockquote"
      >
        <QuoteIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btnBase + (isActive('codeBlock') ? ' ' + activeCls : '')}
        aria-label="Code block"
        title="Code block"
      >
        <CodeIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={btnBase}
        aria-label="Horizontal rule"
        title="Horizontal rule"
      >
        <HrIcon />
      </button>

      <Divider />

      <button
        type="button"
        onClick={promptLink}
        className={btnBase + (isActive('link') ? ' ' + activeCls : '')}
        aria-label="Link"
        title="Link"
      >
        <LinkIcon />
      </button>

      <Divider />

      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className={btnBase}
        aria-label="Clear formatting"
        title="Clear formatting"
      >
        <ClearIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={btnBase}
        aria-label="Undo"
        title="Undo"
      >
        <UndoIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={btnBase}
        aria-label="Redo"
        title="Redo"
      >
        <RedoIcon />
      </button>
    </div>
  );
}

interface PaletteProps {
  editor?: Editor;
  currentColor: string | null;
  onPick: (color: string | null) => void;
  palette: string[];
  title: string;
  icon: React.ReactNode;
  btnClass: string;
}

function ColorPopover({ currentColor, onPick, palette, title, icon, btnClass }: PaletteProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className={btnClass} aria-label={title} title={title}>
          <span className="relative flex flex-col items-center justify-center">
            {icon}
            <span
              className="block w-3.5 h-1 rounded-sm mt-0.5"
              style={{ background: currentColor ?? '#2b201a' }}
            />
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          className="z-[200] bg-bg border border-line rounded-lg shadow-lg p-2 dd-in"
        >
          <div className="grid grid-cols-4 gap-1.5">
            {palette.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onPick(c)}
                className="w-7 h-7 rounded-md border border-line hover:scale-110 transition-transform"
                style={{ background: c }}
                aria-label={c}
                title={c}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => onPick(null)}
            className="w-full mt-2 text-xs text-ink-soft hover:text-ink rounded px-2 py-1.5 border border-line"
          >
            Clear
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function HighlightPopover(props: PaletteProps) {
  return <ColorPopover {...props} />;
}

function Divider() {
  return <span className="w-px h-5 bg-line mx-1" />;
}

function BoldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}
function ItalicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  );
}
function UnderlineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a6 6 0 0 0 12 0V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  );
}
function StrikeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="M16 6a4 4 0 0 0-4-2c-3 0-5 1.5-5 4 0 1 .5 2 1.5 2.5" />
      <path d="M8 18a4 4 0 0 0 4 2c3 0 5-1.5 5-4 0-1-.5-2-1.5-2.5" />
    </svg>
  );
}
function TextColorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16" />
      <path d="M7 16L12 4l5 12" />
      <path d="M9 12h6" />
    </svg>
  );
}
function HighlightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l-5 5v3h3l5-5" />
      <path d="M14 6l4 4-7 7-4-4z" />
      <path d="M14 6l3-3 4 4-3 3" />
    </svg>
  );
}
function AlignLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="15" y2="12" />
      <line x1="3" y1="18" x2="18" y2="18" />
    </svg>
  );
}
function AlignCenterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
function AlignRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="6" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function AlignJustifyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function BulletListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </svg>
  );
}
function OrderedListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h2v.01" />
      <path d="M4 10h2l-2 4h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-2-1-2 0" />
    </svg>
  );
}
function QuoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3-3 5-6 5-10V5H4v6h4" />
      <path d="M14 21c3-3 5-6 5-10V5h-4v6h4" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function HrIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
    </svg>
  );
}
function UndoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 7 3 13 9 13" />
      <path d="M3 13a9 9 0 0 1 16-4" />
    </svg>
  );
}
function RedoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 7 21 13 15 13" />
      <path d="M21 13a9 9 0 0 0-16-4" />
    </svg>
  );
}
