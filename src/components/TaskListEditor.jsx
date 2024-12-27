import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';

const TaskListEditor = () => {
  const [newTask, setNewTask] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem,
    ],
    content: '<ul data-type="task-list"></ul>',
  });

  const addTask = () => {
    if (newTask.trim()) {
      editor.chain().focus().insertContent(`<li data-type="task-item" data-checked="false">${newTask}</li>`).run();
      setNewTask('');
    }
  };

  const toggleTask = (item) => {
    const checked = item.getAttribute('data-checked') === 'true';
    item.setAttribute('data-checked', !checked);
    editor.commands.updateAttributes('taskItem', { checked: !checked });
  };

  return (
    <div className="editor-container">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button onClick={addTask} className="add-task-button">Add Task</button>
      <EditorContent
        editor={editor}
        onClick={(event) => {
          const taskItem = event.target.closest('li[data-type="task-item"]');
          if (taskItem) {
            toggleTask(taskItem);
          }
        }}
      />
    </div>
  );
};

export default TaskListEditor;
