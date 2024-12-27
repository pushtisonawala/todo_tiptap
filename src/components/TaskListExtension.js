import { Node } from '@tiptap/core';

export const TaskItem = Node.create({
  name: 'taskItem',
  group: 'block',
  content: 'text*',
  addAttributes() {
    return {
      checked: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-checked') === 'true',
        renderHTML: (attributes) => ({
          'data-checked': attributes.checked,
        }),
      },
    };
  },
  parseHTML() {
    return [{ tag: 'li[data-type="task-item"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['li', { 'data-type': 'task-item', ...HTMLAttributes }, 0];
  },
});

export const TaskList = Node.create({
  name: 'taskList',
  group: 'block',
  content: 'taskItem+',
  parseHTML() {
    return [{ tag: 'ul[data-type="task-list"]' }];
  },
  renderHTML() {
    return ['ul', { 'data-type': 'task-list' }, 0];
  },
});