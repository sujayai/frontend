import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HistoryItem {
  id: string;
  type: 'input' | 'output';
  content: string | JSX.Element;
}

const Terminal: React.FC = () => {
  const [buffer, setBuffer] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLSpanElement>(null);

  const profile = useMemo(() => ({
    name: 'Sujay',
    handle: 'sujay@supercompute',
    title: 'Supercompute Network Engineer',
    roles: ['Distributed Systems Expert','AI Infrastructure Architect','GPU Cluster Optimizer'],
    skills: ['CUDA / NCCL / TensorRT','Kubernetes / GPU Operators','RDMA / RoCE / InfiniBand / NVLink','Go, Rust, C++','PyTorch / JAX / TPU'],
    socials: {
      github: 'https://github.com/sujayai',
      linkedin: 'https://www.linkedin.com/in/sujay',
      twitter: 'https://x.com/sujay',
      website: 'https://sujay.ai'
    },
    contact: 'sujay@supercompute.dev',
  }), []);

  useEffect(() => {
    if (history.length === 0) {
      setHistory([{
        id: crypto.randomUUID(),
        type: 'output',
        content: (
          <div>
          <div className="text-emerald-600 dark:text-emerald-400">Welcome to Sujay's interactive terminal.</div>
          <div className="text-gray-600 dark:text-gray-300">Type <span className="text-emerald-600 dark:text-emerald-400">help</span>. Press Enter to submit. Focus terminal with click.</div>
          </div>
        ),
      }]);
    }
  }, [history.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.scrollIntoView({ block: 'nearest' });
  }, [buffer]);

  const commands: Record<string, () => JSX.Element> = {
    help: () => (
      <div className="space-y-1">
        <div className="text-emerald-600 dark:text-emerald-400">Available commands:</div>
        <div className="text-gray-700 dark:text-gray-300">whoami, title, roles, skills, stack, projects, experience, socials, contact, clear</div>
      </div>
    ),
    whoami: () => (<div><span className="text-gray-900 dark:text-white font-semibold">{profile.name}</span> — {profile.title}</div>),
    title: () => (<div className="text-gray-700 dark:text-gray-300">{profile.title}</div>),
    roles: () => (<ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">{profile.roles.map(r => <li key={r}>{r}</li>)}</ul>),
    skills: () => (<ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">{profile.skills.map(s => <li key={s}>{s}</li>)}</ul>),
    stack: () => (<div className="text-gray-700 dark:text-gray-300">Go, Rust, C++, Python, Kubernetes, CUDA, NCCL, NVLink, RoCE, RDMA, PyTorch, JAX</div>),
    projects: () => (<div className="text-gray-700 dark:text-gray-300">See the projects section below for featured work: GPU Orchestrator, NN Compiler, Petascale Pipeline.</div>),
    experience: () => (<div className="text-gray-700 dark:text-gray-300">OpenAI (Infra), NVIDIA (Systems), DeepMind (ML Infra), Meta (Research Eng).</div>),
    socials: () => (
      <ul className="list-disc pl-5 text-gray-300">
        <li>GitHub: <a className="text-emerald-600 dark:text-emerald-400" href={profile.socials.github} target="_blank" rel="noreferrer">{profile.socials.github}</a></li>
        <li>LinkedIn: <a className="text-blue-600 dark:text-blue-400" href={profile.socials.linkedin} target="_blank" rel="noreferrer">{profile.socials.linkedin}</a></li>
        <li>X/Twitter: <a className="text-gray-600 dark:text-gray-300" href={profile.socials.twitter} target="_blank" rel="noreferrer">{profile.socials.twitter}</a></li>
        <li>Website: <a className="text-emerald-600 dark:text-emerald-400" href={profile.socials.website} target="_blank" rel="noreferrer">{profile.socials.website}</a></li>
      </ul>
    ),
    contact: () => (<div className="text-gray-700 dark:text-gray-300">Email: <a className="text-emerald-600 dark:text-emerald-400" href={`mailto:${profile.contact}`}>{profile.contact}</a></div>),
    clear: () => { setHistory([]); return (<div />); },
  };

  const run = async (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setBusy(true);
    setHistory(prev => ([...prev, { id: crypto.randomUUID(), type: 'input', content: `${profile.handle}:~$ ${raw}` }]));
    await new Promise(res => setTimeout(res, 80));
    const handler = commands[cmd];
    const output = handler ? handler() : (<div className="text-gray-700 dark:text-gray-300">Unknown command: <span className="text-red-600 dark:text-red-400">{cmd}</span>. Try <span className="text-emerald-600 dark:text-emerald-400">help</span>.</div>);
    setHistory(prev => ([...prev, { id: crypto.randomUUID(), type: 'output', content: output }]));
    setBusy(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (busy) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const current = buffer;
      setBuffer('');
      run(current);
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      setBuffer(prev => prev.slice(0, -1));
      return;
    }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      setBuffer(prev => prev + e.key);
    }
  };

  return (
    <motion.div
      className="terminal-blur rounded-xl p-4 mb-6 max-w-xl mx-auto text-left backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="region"
      aria-label="Interactive terminal"
    >
      <div className="flex items-center mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
        <span className="text-emerald-700 dark:text-emerald-500 font-mono text-sm">{profile.handle}:~$</span>
      </div>

      <div ref={scrollRef} className="max-h-56 overflow-y-auto pr-1 space-y-2">
        {history.map(h => (
          <div key={h.id} className={h.type === 'input' ? 'text-gray-800 dark:text-gray-200 font-mono' : 'text-gray-600 dark:text-gray-300'}>
            {h.content}
          </div>
        ))}
        {/* Live input line */}
        <div className="font-mono text-gray-800 dark:text-gray-200 flex items-center">
          <span className="text-emerald-600 dark:text-emerald-400 mr-2">$</span>
          <span ref={inputRef} className="whitespace-pre-wrap break-words">{buffer}</span>
          <span className="ml-1 inline-block w-2 h-5 bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
