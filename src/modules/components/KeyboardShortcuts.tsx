import React, { useEffect, useState } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export function KeyboardShortcuts({ shortcuts, enabled = true }: KeyboardShortcutsProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const altMatch = shortcut.alt ? e.altKey : !e.altKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);

  return null;
}

// Keyboard shortcuts help modal
export function KeyboardShortcutsHelp({ shortcuts, language = 'english', onClose }: { 
  shortcuts: KeyboardShortcut[];
  language?: string;
  onClose: () => void;
}) {
  const text = {
    spanish: {
      title: 'Atajos de Teclado',
      close: 'Cerrar',
      pressEscape: 'Presiona Esc para cerrar'
    },
    english: {
      title: 'Keyboard Shortcuts',
      close: 'Close',
      pressEscape: 'Press Esc to close'
    },
    catalan: {
      title: 'Dreceres de Teclat',
      close: 'Tancar',
      pressEscape: 'Premeu Esc per tancar'
    }
  };

  const content = text[language as keyof typeof text] || text.english;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatShortcut = (shortcut: KeyboardShortcut) => {
    const keys = [];
    if (shortcut.ctrl) keys.push('Ctrl');
    if (shortcut.shift) keys.push('Shift');
    if (shortcut.alt) keys.push('Alt');
    keys.push(shortcut.key.toUpperCase());
    return keys.join(' + ');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div 
        className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="shortcuts-title" className="text-2xl text-white drop-shadow-lg">{content.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={content.close}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <span className="text-white/80">{shortcut.description}</span>
              <kbd className="px-3 py-1 bg-white/20 border border-white/30 rounded text-white text-sm font-mono">
                {formatShortcut(shortcut)}
              </kbd>
            </div>
          ))}
        </div>

        <p className="text-white/60 text-sm mt-6 text-center">{content.pressEscape}</p>
      </div>
    </div>
  );
}
