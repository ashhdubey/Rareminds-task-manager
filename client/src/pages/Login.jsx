import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Loader2, ArrowRight, CheckCircle2, Layout, Github } from 'lucide-react'; // Added Github
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-black overflow-hidden font-sans">
      
      {/* --- HERO SECTION (Left) --- */}
      <div className="hidden lg:flex w-1/2 relative bg-indigo-600 overflow-hidden flex-col justify-between p-16 text-white">
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
        />

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-3 text-2xl font-bold">
          <div className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
            <Layout size={26} className="text-white" />
          </div>
          <span className="tracking-tight">RareMinds</span>
        </div>

        {/* Main Visual */}
        <div className="relative z-10 flex flex-col justify-center items-center flex-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-80 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center text-green-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="h-2.5 w-24 bg-white/40 rounded-full mb-2"></div>
                  <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/10 rounded-full"></div>
                <div className="h-2 w-5/6 bg-white/10 rounded-full"></div>
                <div className="h-2 w-4/6 bg-white/10 rounded-full"></div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-indigo-300 border-2 border-indigo-600" />
                   ))}
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Completed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <p className="text-lg font-medium text-indigo-100 leading-relaxed max-w-md">
            "The secret of getting ahead is getting started."
          </p>
          <p className="mt-2 text-sm text-indigo-300 font-semibold">— Mark Twain</p>
        </div>
      </div>

      {/* --- FORM SECTION (Right) --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-black">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#0a0a0a] p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Enter your details to access your workspace.</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <Link to="/forgot-password" class="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot?</Link>
                </div>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Sign In <ArrowRight className="ml-2 h-5 w-5" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Get Started
            </Link>
          </p>
        </div>

        {/* --- FOOTER WITH LINKS (NEW) --- */}
        <div className="mt-8 text-center animate-in fade-in duration-700">
          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            Built with ❤️ by 
            <a 
              href="https://ashhdubey.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
            >
              Ashish Dubey
            </a>
          </p>
          <a 
            href="https://github.com/AshhDubey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-medium text-gray-400 hover:text-indigo-500 transition-colors"
          >
            <Github size={12} />
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;