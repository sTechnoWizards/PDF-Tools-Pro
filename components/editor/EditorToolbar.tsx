"use client";

import {
  Copy,
  Download,
  FileImage,
  Highlighter,
  Image as ImageIcon,
  Layers,
  MousePointer2,
  Move,
  PenLine,
  Redo2,
  RotateCcw,
  Trash2,
  Type,
  Undo2,
} from "lucide-react";
import type { ActiveTool } from "@/lib/editor/types";
import { EditorIconButton } from "./EditorIconButton";

type EditorToolbarProps = {
  activeTool: ActiveTool;
  hasSelectedLayer: boolean;
  canUndo: boolean;
  canRedo: boolean;
  isPremium: boolean;
  onSelectTool: (tool: ActiveTool) => void;
  onImageClick: () => void;
  onSignatureClick: () => void;
  onSignatureImageClick: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onClearPage: () => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onPremiumRequired: () => void;
};

function ToolGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-1 shadow-sm">
        {children}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}

export function EditorToolbar(props: EditorToolbarProps) {
  const {
    activeTool,
    hasSelectedLayer,
    canUndo,
    canRedo,
    isPremium,
    onSelectTool,
    onImageClick,
    onSignatureClick,
    onSignatureImageClick,
    onDelete,
    onDuplicate,
    onClearPage,
    onReset,
    onUndo,
    onRedo,
    onExport,
    onPremiumRequired,
  } = props;

  function guardPremium(action: () => void) {
    if (isPremium) {
      action();
    } else {
      onPremiumRequired();
    }
  }

  return (
    <div className="flex flex-wrap items-end gap-2.5">
      <ToolGroup label="Mode">
        <EditorIconButton
          label="Select text"
          description="Select and copy real PDF text."
          active={activeTool === "select"}
          onClick={() => onSelectTool("select")}
        >
          <MousePointer2 size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Edit object"
          description="Select, move, resize, duplicate, or delete editor objects."
          active={activeTool === "object"}
          tone="sky"
          onClick={() => onSelectTool("object")}
        >
          <Move size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Edit text"
          description="Click real PDF text to create an editable replacement layer."
          active={activeTool === "edit"}
          tone="indigo"
          locked={!isPremium}
          onClick={() => guardPremium(() => onSelectTool("edit"))}
        >
          <Type size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Text box"
          description="Drag on the page to draw a text annotation box."
          active={activeTool === "text"}
          tone="indigo"
          onClick={() => onSelectTool("text")}
        >
          <span className="text-base font-black">T</span>
        </EditorIconButton>

        <EditorIconButton
          label="Highlight"
          description="Select real PDF text to highlight like a marker."
          active={activeTool === "highlight"}
          tone="amber"
          onClick={() => onSelectTool("highlight")}
        >
          <Highlighter size={17} />
        </EditorIconButton>
      </ToolGroup>

      <ToolGroup label="Insert">
        <EditorIconButton
          label="Image"
          description="Insert an image layer."
          tone="sky"
          locked={!isPremium}
          onClick={() => guardPremium(onImageClick)}
        >
          <ImageIcon size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Signature"
          description="Add a typed signature."
          tone="violet"
          locked={!isPremium}
          onClick={() => guardPremium(onSignatureClick)}
        >
          <PenLine size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Sign image"
          description="Upload a signature image."
          tone="violet"
          locked={!isPremium}
          onClick={() => guardPremium(onSignatureImageClick)}
        >
          <FileImage size={17} />
        </EditorIconButton>
      </ToolGroup>

      <ToolGroup label="History">
        <EditorIconButton
          label="Undo"
          description="Undo last action (Ctrl+Z)"
          disabled={!canUndo}
          onClick={onUndo}
        >
          <Undo2 size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Redo"
          description="Redo last undone action (Ctrl+Y)"
          disabled={!canRedo}
          onClick={onRedo}
        >
          <Redo2 size={17} />
        </EditorIconButton>
      </ToolGroup>

      <ToolGroup label="Actions">
        <EditorIconButton
          label="Duplicate"
          description="Duplicate selected object."
          disabled={!hasSelectedLayer}
          onClick={onDuplicate}
        >
          <Copy size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Delete"
          description="Delete selected object. (Del)"
          disabled={!hasSelectedLayer}
          tone="red"
          onClick={onDelete}
        >
          <Trash2 size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Clear page"
          description="Clear all objects on this page."
          onClick={onClearPage}
        >
          <Layers size={17} />
        </EditorIconButton>

        <EditorIconButton
          label="Reset all"
          description="Clear all objects in the document."
          onClick={onReset}
        >
          <RotateCcw size={17} />
        </EditorIconButton>
      </ToolGroup>

      <div className="ml-auto flex flex-col items-center gap-1">
        <EditorIconButton
          label="Export PDF"
          description="Download the edited PDF."
          tone="emerald"
          onClick={onExport}
        >
          <Download size={17} />
        </EditorIconButton>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Export</span>
      </div>
    </div>
  );
}
