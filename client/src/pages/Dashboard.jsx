import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { io } from 'socket.io-client';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';
import { 
  Plus, Trash2, Calendar, User, ListTodo, 
  ChevronLeft, ChevronRight, Search, Loader2, Github 
} from 'lucide-react'; // <--- Added Github Icon here
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 

  // --- PAGINATION & SEARCH STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); 

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', priority: 'Medium', dueDate: '', assignedTo: ''
  });
  const [users, setUsers] = useState([]); 

  // --- Data Fetching ---
  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/tasks?page=${page}&limit=9`);
      setTasks(data.tasks); 
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (user.role === 'manager') {
      try {
        const { data } = await api.get('/tasks/users');
        setUsers(data);
        if (data.length > 0) setFormData(prev => ({ ...prev, assignedTo: data[0]._id }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
    fetchUsers();
  }, [currentPage]); 

  // --- SOCKET.IO ---
  useEffect(() => {
    const socket = io('http://localhost:5000'); 

    socket.on('taskCreated', (newTask) => {
      if (user.role === 'manager' || newTask.assignedTo?._id === user._id) {
        setTasks((prev) => [newTask, ...prev]); 
        toast.success(`New Task: ${newTask.title}`);
      }
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prev) => 
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on('taskDeleted', (deletedTaskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== deletedTaskId));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]); 

  // --- Drag and Drop Logic ---
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;

    const newStatus = destination.droppableId; 
    
    const updatedTasks = tasks.map(t => 
      t._id === draggableId ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);

    try {
      await api.put(`/tasks/${draggableId}`, { status: newStatus });
      toast.success(`Moved to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
      fetchTasks(currentPage); 
    }
  };

  // --- Handlers ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = { ...formData, assignedTo: formData.assignedTo || user._id };
      await api.post('/tasks', taskData);
      setShowForm(false);
      setFormData({ title: '', description: '', priority: 'Medium', dueDate: '', assignedTo: users[0]?._id || '' });
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const getTasksByStatus = (status) => {
    return tasks
      .filter(t => t.status === status)
      .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200 font-sans pb-10">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 py-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Project Board</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="pl-10 pr-4 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64 dark:text-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {user.role === 'manager' && (
              <button 
                onClick={() => setShowForm(!showForm)}
                className="flex items-center justify-center px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-all"
              >
                <Plus size={18} className="mr-2" /> New Task
              </button>
            )}
          </div>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-indigo-100 dark:border-gray-800 animate-in slide-in-from-top-2">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Create New Task</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Title" required
                className="w-full p-2 border rounded dark:bg-black dark:border-gray-700 dark:text-white"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <select 
                className="w-full p-2 border rounded dark:bg-black dark:border-gray-700 dark:text-white"
                value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input 
                type="date" 
                className="w-full p-2 border rounded dark:bg-black dark:border-gray-700 dark:text-white"
                value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})}
              />
              {user.role === 'manager' && (
                <select 
                  className="w-full p-2 border rounded dark:bg-black dark:border-gray-700 dark:text-white"
                  value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})}
                >
                   {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
              )}
              <textarea 
                placeholder="Description" className="md:col-span-2 w-full p-2 border rounded dark:bg-black dark:border-gray-700 dark:text-white"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <div className="md:col-span-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 dark:text-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
              </div>
            </form>
          </div>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-500">Loading your workspace...</p>
          </div>
        ) : (
          /* KANBAN BOARD */
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-8">
              {['Pending', 'In Progress', 'Completed'].map((status) => (
                <Droppable key={status} droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`bg-gray-100 dark:bg-[#0a0a0a] rounded-xl p-4 min-h-[400px] flex flex-col transition-colors border border-transparent ${
                        snapshot.isDraggingOver ? 'bg-indigo-50 dark:bg-black ring-2 ring-indigo-500/20' : 'dark:border-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${
                            status === 'Pending' ? 'bg-yellow-400' : 
                            status === 'In Progress' ? 'bg-blue-400' : 'bg-green-400'
                          }`}></span>
                          {status}
                        </h3>
                        <span className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-xs px-2 py-1 rounded-full font-medium border dark:border-gray-700">
                          {getTasksByStatus(status).length}
                        </span>
                      </div>

                      <div className="flex-1 space-y-3">
                        {getTasksByStatus(status).map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white dark:bg-black p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow group ${
                                  snapshot.isDragging ? 'shadow-xl rotate-2 ring-2 ring-indigo-500 opacity-90' : ''
                                }`}
                                style={provided.draggableProps.style}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                    task.priority === 'High' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30'
                                  }`}>
                                    {task.priority}
                                  </span>
                                  {user.role === 'manager' && (
                                    <button onClick={() => handleDelete(task._id)} className="text-gray-300 hover:text-red-500">
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                </div>
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{task.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800">
                                  <div className="flex items-center text-xs text-gray-400">
                                    <User size={12} className="mr-1" />
                                    {task.assignedTo?.name || 'Unassigned'}
                                  </div>
                                  {task.dueDate && (
                                    <div className="flex items-center text-xs text-gray-400">
                                      <Calendar size={12} className="mr-1" />
                                      {new Date(task.dueDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        )}

        {/* PAGINATION CONTROLS */}
        {!loading && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors shadow-sm dark:text-white"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              onClick={() => setCurrentPage(p => (p < totalPages ? p + 1 : p))}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors shadow-sm dark:text-white"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* --- FOOTER --- */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 animate-in fade-in duration-700">
          <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            Built with ❤️ by 
            <a 
              href="https://ashhdubey.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
            >
              Ashish Dubey
            </a>
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/AshhDubey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm"
            >
              <Github size={14} />
              GitHub Profile
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;