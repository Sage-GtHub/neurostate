import { useState, forwardRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import {
  MessageSquare,
  Plus,
  PanelLeftClose,
  MoreHorizontal,
  Pencil,
  Archive,
  ArchiveRestore,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChatThread } from '@/hooks/useChatThreads';

interface ThreadItemProps {
  thread: ChatThread;
  isArchived?: boolean;
  isSelected: boolean;
  isEditing: boolean;
  editTitle: string;
  onEditTitleChange: (title: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onStartEdit: (thread: ChatThread) => void;
  onSelect: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onDelete: () => void;
}

const ThreadItem = memo(forwardRef<HTMLDivElement, ThreadItemProps>(({
  thread,
  isArchived = false,
  isSelected,
  isEditing,
  editTitle,
  onEditTitleChange,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onSelect,
  onArchive,
  onUnarchive,
  onDelete,
}, ref) => {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className={cn(
        "group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
        isSelected
          ? "bg-accent/10 text-foreground border border-accent/20"
          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
      )}
    >
      <MessageSquare className="h-4 w-4 flex-shrink-0" />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-1">
            <Input
              value={editTitle}
              onChange={(e) => onEditTitleChange(e.target.value)}
              className="h-6 text-xs py-0 px-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveEdit();
                if (e.key === 'Escape') onCancelEdit();
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={onSaveEdit}
            >
              <Check className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={onCancelEdit}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div onClick={onSelect}>
            <p className="text-sm truncate font-medium">{thread.title}</p>
            <p className="text-[10px] text-muted-foreground">
              {thread.message_count || 0} messages • {formatDistanceToNow(new Date(thread.updated_at), { addSuffix: true })}
            </p>
          </div>
        )}
      </div>

      {!isEditing && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onStartEdit(thread)}>
              <Pencil className="h-3.5 w-3.5 mr-2" />
              Rename
            </DropdownMenuItem>
            {isArchived ? (
              <DropdownMenuItem onClick={onUnarchive}>
                <ArchiveRestore className="h-3.5 w-3.5 mr-2" />
                Restore
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onArchive}>
                <Archive className="h-3.5 w-3.5 mr-2" />
                Archive
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </motion.div>
  );
}));

ThreadItem.displayName = 'ThreadItem';

interface ThreadSidebarProps {
  open: boolean;
  onClose: () => void;
  threads: ChatThread[];
  archivedThreads: ChatThread[];
  currentThread: ChatThread | null;
  loading: boolean;
  onSelectThread: (thread: ChatThread) => void;
  onCreateThread: () => void;
  onRenameThread: (threadId: string, title: string) => void;
  onArchiveThread: (threadId: string) => void;
  onUnarchiveThread: (threadId: string) => void;
  onDeleteThread: (threadId: string) => void;
  onFetchArchived: () => void;
}

export function ThreadSidebar({
  open,
  onClose,
  threads,
  archivedThreads,
  currentThread,
  loading,
  onSelectThread,
  onCreateThread,
  onRenameThread,
  onArchiveThread,
  onUnarchiveThread,
  onDeleteThread,
  onFetchArchived,
}: ThreadSidebarProps) {
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const handleStartEdit = (thread: ChatThread) => {
    setEditingThreadId(thread.id);
    setEditTitle(thread.title);
  };

  const handleSaveEdit = () => {
    if (editingThreadId && editTitle.trim()) {
      onRenameThread(editingThreadId, editTitle.trim());
    }
    setEditingThreadId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingThreadId(null);
    setEditTitle('');
  };

  const handleToggleArchived = () => {
    if (!showArchived) {
      onFetchArchived();
    }
    setShowArchived(!showArchived);
  };

  const renderThreadItem = (thread: ChatThread, isArchived = false) => (
    <ThreadItem
      key={thread.id}
      thread={thread}
      isArchived={isArchived}
      isSelected={currentThread?.id === thread.id}
      isEditing={editingThreadId === thread.id}
      editTitle={editTitle}
      onEditTitleChange={setEditTitle}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      onStartEdit={handleStartEdit}
      onSelect={() => {
        onSelectThread(thread);
        onClose();
      }}
      onArchive={() => onArchiveThread(thread.id)}
      onUnarchive={() => onUnarchiveThread(thread.id)}
      onDelete={() => onDeleteThread(thread.id)}
    />
  );

  return (
    <>
      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-72 bg-background/95 backdrop-blur-xl border-r border-border/30 z-40",
          "transform transition-transform duration-300 ease-out",
          "pt-[57px] flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <span className="text-sm font-medium">Conversations</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Thread List */}
        <ScrollArea className="flex-1">
          <div className="py-3 px-3 space-y-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : threads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground/30 mb-3" />
                <p className="text-xs text-muted-foreground">No conversations yet</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                  Start chatting to create one
                </p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {threads.map((thread) => renderThreadItem(thread, false))}
              </AnimatePresence>
            )}

            {/* Archived Section */}
            {(archivedThreads.length > 0 || threads.length > 0) && (
              <Collapsible open={showArchived} onOpenChange={handleToggleArchived}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xs text-muted-foreground mt-4"
                  >
                    {showArchived ? (
                      <ChevronDown className="h-3 w-3 mr-2" />
                    ) : (
                      <ChevronRight className="h-3 w-3 mr-2" />
                    )}
                    <Archive className="h-3 w-3 mr-2" />
                    Archived ({archivedThreads.length})
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  <AnimatePresence mode="popLayout">
                    {archivedThreads.map((thread) => renderThreadItem(thread, true))}
                  </AnimatePresence>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border/30">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onCreateThread();
              onClose();
            }}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-background/60 z-30 pt-[57px]"
          onClick={onClose}
        />
      )}
    </>
  );
}