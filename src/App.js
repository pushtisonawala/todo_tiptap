import React from 'react';
import { TaskList } from '@tiptap/extension-task-list';

import TaskListEditor from './components/TaskListEditor';
import './components/TaskListEditor.css';

function App() {
  return (
    <div className="App">
      <TaskListEditor />
    </div>
  );
}

export default App;
