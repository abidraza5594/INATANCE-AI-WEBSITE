import { Keyboard } from 'lucide-react';
import { memo } from 'react';

const shortcuts = [
  {
    category: 'Answer Control',
    items: [
      { keys: ['SPACE', 'DELETE'], description: 'Get Answer (Voice Mode)' },
      { keys: ['ENTER'], description: 'Submit Question (Text Mode)' },
      { keys: ['SHIFT', 'ENTER'], description: 'New Line (Text Mode)' }
    ]
  },
  {
    category: 'Input Mode Control',
    items: [
      { keys: ['CAPS LOCK'], description: 'Toggle Voice/Text Mode' },
      { keys: ['CAPS LOCK', '×2'], description: 'Change Tech Stack Profile' },
      { keys: ['CTRL', 'BACKSPACE'], description: 'Clear All Text' }
    ]
  },
  {
    category: 'Screenshot Mode',
    items: [
      { keys: ['ALT', '×2'], description: 'Screenshot Mode (Press Twice)' },
      { keys: ['SHIFT', 'ARROW'], description: 'Resize Selection Box' },
      { keys: ['CTRL', 'SHIFT', 'ARROW'], description: 'Move Selection Box' }
    ]
  },
  {
    category: 'Window Control',
    items: [
      { keys: ['CTRL', 'SPACE'], description: 'Hide/Show Window (Emergency)' },
      { keys: ['CTRL', 'ARROW'], description: 'Move Window Position' },
      { keys: ['SHIFT', '↑↓'], description: 'Scroll Answer Text' },
      { keys: ['ESC'], description: 'Close Application' }
    ]
  }
];

// Memoized shortcut item
const ShortcutItem = memo(({ item }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex items-center space-x-2">
      {item.keys.map((key, keyIndex) => (
        <span key={keyIndex} className="inline-flex items-center">
          <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm">
            {key}
          </kbd>
          {keyIndex < item.keys.length - 1 && (
            <span className="mx-2 text-gray-400">+</span>
          )}
        </span>
      ))}
    </div>
    <span className="text-gray-600 text-sm ml-4">{item.description}</span>
  </div>
));

ShortcutItem.displayName = 'ShortcutItem';

// Memoized category card
const ShortcutCategory = memo(({ category, categoryIndex }) => (
  <div className="card">
    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
      <span className="bg-primary-100 text-primary-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
        {categoryIndex + 1}
      </span>
      {category.category}
    </h3>
    <div className="space-y-4">
      {category.items.map((item, itemIndex) => (
        <ShortcutItem key={itemIndex} item={item} />
      ))}
    </div>
  </div>
));

ShortcutCategory.displayName = 'ShortcutCategory';

export default function KeyboardShortcuts() {
  return (
    <div id="shortcuts" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4">
            <Keyboard className="h-4 w-4" />
            <span className="text-sm font-semibold">Complete Keyboard Control</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master These Shortcuts
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No mouse needed during interviews. Lightning-fast control with keyboard shortcuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shortcuts.map((category, categoryIndex) => (
            <ShortcutCategory key={categoryIndex} category={category} categoryIndex={categoryIndex} />
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="bg-primary-500 text-white p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Pro Tip: Practice Before Interview</h4>
              <p className="text-gray-600">
                Practice these shortcuts 10 times each before your interview. Build muscle memory so you can use them naturally without looking at the keyboard. 
                The <kbd className="px-2 py-1 text-xs bg-white border border-gray-300 rounded">CTRL</kbd> + <kbd className="px-2 py-1 text-xs bg-white border border-gray-300 rounded">SPACE</kbd> emergency hide is especially important!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
