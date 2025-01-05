
import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import './TaskListEditor.css';

const TaskListEditor = () => {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);

  const editor = useEditor({
    extensions: [StarterKit, TaskList, TaskItem],
    content: '<ul data-type="task-list"></ul>',
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        priority,
        completed: false,
        dueDate: new Date().toISOString().split('T')[0],
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setPriority('Low');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="editor-container">
      <div className="task-controls">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask} className="add-task-button">Add Task</button>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="search-bar"
      />

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
            style={{ borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}
          >
            <span
              className="task-text"
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <span className="task-due-date">{task.dueDate}</span>
            <button
              className="edit-task-button"
              onClick={() => {
                const newText = prompt('Edit task:', task.text);
                if (newText) editTask(task.id, newText);
              }}
            >
              ✏️
            </button>
            <button
              className="delete-task-button"
              onClick={() => deleteTask(task.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button onClick={clearCompleted} className="clear-completed-button">
        Clear Completed
      </button>
    </div>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return '#FF6B6B';
    case 'Medium':
      return '#FFD93D';
    case 'Low':
    default:
      return '#6BCB77';
  }
};

export default TaskListEditor;
