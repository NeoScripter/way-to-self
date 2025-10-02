import { cn } from '@/lib/utils';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

type MarkdownEditorProps = {
    value: string;
    onChange: (arg: string) => void;
    className?: string;
};

export default function MarkdownEditor({
    className,
    value,
    onChange,
}: MarkdownEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit, Markdown],
        editorProps: {
            attributes: {
                class: cn(
                    'prose px-3 py-2 prose-sm min-h-40 max-w-none rounded-lg border border-text-black bg-white shadow-xs transition-[color,box-shadow] outline-none selection:bg-bright-salad selection:text-white placeholder:text-gray-500 disabled:opacity-50',
                    'focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-dark-swamp/80',
                    className,
                ),
            },
        },
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.storage.markdown.getMarkdown());
        },
    });

    if (!editor) return null;

    return (
        <>
            <EditorContent editor={editor} />
            {/* <FloatingMenu editor={editor}> */}
            {/*     This is the floating menu */}
            {/* </FloatingMenu> */}
            {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </>
    );
}

// <textarea
//     data-slot="textarea"
//     className={}
//     {...props}
// />
