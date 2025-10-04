import { cn } from '@/lib/utils';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import { Markdown } from 'tiptap-markdown';

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
    className?: string;
};

export default function MarkdownEditor({
    className,
    value,
    onChange,
}: MarkdownEditorProps) {
    const [labels, setLabels] = useState<boolean[]>([]);

    const editor = useEditor({
        extensions: [StarterKit, Markdown],
        editorProps: {
            attributes: {
                class: 'prose prose-sm min-h-40 max-w-full outline-none transition-[color,box-shadow] selection:bg-bright-salad selection:text-white placeholder:text-gray-500 disabled:opacity-50',
            },
        },
        content: value,
        onTransaction: ({ editor }) => {
            onChange(editor.storage.markdown.getMarkdown());
            setLabels(getActiveStates(editor));
        },
    });

    if (!editor) return null;

    return (
        <div
            className={cn(
                'focus-within:border-ring rounded-lg border border-text-black bg-white px-3 py-2 shadow-xs focus-within:ring-[1px] focus-within:ring-dark-swamp/80',
                className,
            )}
        >
            <menu className="mb-4 flex items-center flex-wrap rounded-md p-2 shadow-md">
                {markdownBtns.map((btn, i) => (
                    <MarkdownBtn
                        key={btn.title}
                        editor={editor}
                        title={btn.title}
                        icon={btn.icon}
                        onClick={() => btn.onClick(editor)}
                        isActive={labels[i]}
                    />
                ))}
            </menu>
            <EditorContent editor={editor} />
        </div>
    );
}

type MarkdownBtnProps = {
    title: string;
    icon: string;
    onClick: (editor: Editor) => void;
    isActive?: boolean;
    editor: Editor;
};

function MarkdownBtn({
    title,
    icon,
    onClick,
    isActive,
    editor,
}: MarkdownBtnProps) {
    return (
        <li>
            <button
                type="button"
                title={title}
                onClick={() => onClick(editor)}
                className={cn(
                    'cursor-pointer rounded p-2 transition-colors hover:bg-indigo-400/60',
                    isActive && 'bg-bright-salad text-white',
                )}
            >
                <i className={icon} />
            </button>
        </li>
    );
}

type MarkdownButton = {
    title: string;
    icon: string;
    onClick: (editor: Editor) => void;
};

const markdownBtns: MarkdownButton[] = [
    {
        title: 'Bold',
        icon: 'ri-bold',
        onClick: (e) => e.chain().focus().toggleBold().run(),
    },
    {
        title: 'Italic',
        icon: 'ri-italic',
        onClick: (e) => e.chain().focus().toggleItalic().run(),
    },
    {
        title: 'Strike',
        icon: 'ri-strikethrough',
        onClick: (e) => e.chain().focus().toggleStrike().run(),
    },
    {
        title: 'Blockquote',
        icon: 'ri-double-quotes-l',
        onClick: (e) => e.chain().focus().toggleBlockquote().run(),
    },
    {
        title: 'Link',
        icon: 'ri-link',
        onClick: (e) => {
            const href = prompt('Enter URL') || '';
            e.chain().focus().setLink({ href }).run();
        },
    },
    {
        title: 'Ordered list',
        icon: 'ri-list-ordered',
        onClick: (e) => e.chain().focus().toggleOrderedList().run(),
    },
    {
        title: 'Unordered list',
        icon: 'ri-list-unordered',
        onClick: (e) => e.chain().focus().toggleBulletList().run(),
    },
    {
        title: 'Heading 1',
        icon: 'ri-h-1',
        onClick: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
        title: 'Heading 2',
        icon: 'ri-h-2',
        onClick: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
        title: 'Heading 3',
        icon: 'ri-h-3',
        onClick: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    },
];

function getActiveStates(editor: Editor): boolean[] {
    return [
        editor.isActive('bold'),
        editor.isActive('italic'),
        editor.isActive('strike'),
        editor.isActive('blockquote'),
        editor.isActive('link'),
        editor.isActive('orderedList'),
        editor.isActive('bulletList'),
        editor.isActive('heading', { level: 2 }),
        editor.isActive('heading', { level: 3 }),
        editor.isActive('heading', { level: 4 }),
    ];
}
