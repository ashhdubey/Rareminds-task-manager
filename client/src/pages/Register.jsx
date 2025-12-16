import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Briefcase, Loader2, ArrowRight, Layout, Github } from 'lucide-react'; // Added Github
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, role);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-black overflow-hidden font-sans">
      
      {/* --- FORM SECTION (Left) --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-black order-last lg:order-first">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-[#0a0a0a] p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create Account</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Join 10,000+ teams organizing their work.</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors"><User className="h-5 w-5" /></div>
                <input type="text" required className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors"><Mail className="h-5 w-5" /></div>
                <input type="email" required className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
               <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors"><Lock className="h-5 w-5" /></div>
                <input type="password" required className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">I am a...</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors"><Briefcase className="h-5 w-5" /></div>
                <select className="block w-full pl-11 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none appearance-none" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">Team Member (User)</option>
                  <option value="manager">Project Lead (Manager)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-lg shadow-purple-500/20 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <>Create Account <ArrowRight className="ml-2 h-5 w-5" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-500 transition-colors">Sign In</Link>
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
              className="font-semibold text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
            >
              Ashish Dubey
            </a>
          </p>
          <a 
            href="https://github.com/AshhDubey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-medium text-gray-400 hover:text-purple-500 transition-colors"
          >
            <Github size={12} />
            GitHub Profile
          </a>
        </div>
      </div>

      {/* --- HERO SECTION (Right) --- */}
      <div className="hidden lg:flex w-1/2 relative bg-purple-700 overflow-hidden flex-col justify-between p-16 text-white">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20" 
        />

        {/* Branding */}
        <div className="relative z-10 flex items-center justify-end gap-3 text-2xl font-bold opacity-80">
          <span className="tracking-tight">RareMinds</span>
          <div className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
            <Layout size={26} className="text-white" />
          </div>
        </div>

        {/* Main Visual */}
        <div className="relative z-10 flex flex-col justify-center items-center flex-1 w-full">
           <div className="relative w-full max-w-sm h-64">
              {/* Animated Columns */}
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute left-0 bottom-0 w-28 h-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 space-y-3"
              >
                 <div className="w-8 h-8 rounded-full bg-pink-400/30 flex items-center justify-center text-xs font-bold">JD</div>
                 <div className="h-2 w-full bg-white/20 rounded-full"></div>
                 <div className="h-2 w-2/3 bg-white/20 rounded-full"></div>
              </motion.div>

              <motion.div 
                 initial={{ y: 100, opacity: 0 }}
                 animate={{ y: -30, opacity: 1 }}
                 transition={{ delay: 0.4, duration: 0.8 }}
                 className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-64 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-4 space-y-4 z-20"
              >
                 <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-400/30 flex items-center justify-center font-bold">ME</div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                 </div>
                 <div className="h-2.5 w-full bg-white/40 rounded-full"></div>
                 <div className="h-2.5 w-full bg-white/40 rounded-full"></div>
                 <div className="h-20 w-full bg-white/10 rounded-xl border border-white/10 mt-4"></div>
              </motion.div>

              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute right-0 bottom-0 w-28 h-56 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 space-y-3"
              >
                 <div className="w-8 h-8 rounded-full bg-blue-400/30 flex items-center justify-center text-xs font-bold">AS</div>
                 <div className="h-2 w-full bg-white/20 rounded-full"></div>
                 <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                 <div className="h-16 w-full bg-white/5 rounded-lg"></div>
              </motion.div>
           </div>
        </div>

        {/* Text */}
        <div className="relative z-10 text-right">
          <h3 className="text-3xl font-bold leading-tight">
            Collaborate.<br/>Innovate. <span className="text-purple-200">Done.</span>
          </h3>
          <p className="mt-4 text-purple-100 max-w-xs ml-auto">
            Everything your team needs to ship faster and work happier.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register;