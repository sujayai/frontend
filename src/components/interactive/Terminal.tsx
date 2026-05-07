import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HistoryItem {
  id: string;
  type: 'input' | 'output';
  content: React.ReactNode;
}

const Terminal: React.FC = () => {
  const [buffer, setBuffer] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const profile = useMemo(
    () => ({
      name: 'Sujay',
      handle: 'sujay@supercompute',
      title: 'Technical Solutions Engineer',
      roles: [
        'Distributed Systems Engineer',
        'AI Infrastructure Architect',
        'GPU Cluster Optimizer',
      ],
      skills: [
        'CUDA / NCCL / TensorRT',
        'Kubernetes / GPU Operators',
        'RDMA / RoCE / InfiniBand / NVLink',
        'Go, Rust, C++',
        'PyTorch / JAX',
      ],
      socials: {
        github: 'https://github.com/sujaysreedharg',
        linkedin: 'https://www.linkedin.com/in/sujaysreedharg',
        twitter: 'https://x.com/sujay_sreedhar',
        website: 'https://sujay.ai',
      },
      contact: 'support@sujay.ai',
    }),
    []
  );

  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          id: crypto.randomUUID(),
          type: 'output',
          content: (
            <div className="space-y-1">
              <div className="text-foreground/90">
                Welcome to Sujay's interactive terminal.
              </div>
              <div className="text-foreground-muted">
                Type <span className="text-primary font-medium">help</span> to see what's available.
              </div>
            </div>
          ),
        },
      ]);
    }
  }, [history.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [history]);

  const commands: Record<string, () => React.ReactNode> = {
    help: () => (
      <div className="space-y-1">
        <div className="text-foreground/90">Available commands:</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-0.5 text-foreground-muted">
          {['whoami', 'roles', 'skills', 'stack', 'experience', 'socials', 'contact', 'clear'].map(
            (c) => (
              <span key={c} className="text-primary">
                {c}
              </span>
            )
          )}
        </div>
      </div>
    ),
    whoami: () => (
      <div>
        <span className="text-foreground font-medium">{profile.name}</span>{' '}
        <span className="text-foreground-muted">— {profile.title}</span>
      </div>
    ),
    title: () => <div className="text-foreground/90">{profile.title}</div>,
    roles: () => (
      <ul className="text-foreground/90 space-y-0.5">
        {profile.roles.map((r) => (
          <li key={r}>· {r}</li>
        ))}
      </ul>
    ),
    skills: () => (
      <ul className="text-foreground/90 space-y-0.5">
        {profile.skills.map((s) => (
          <li key={s}>· {s}</li>
        ))}
      </ul>
    ),
    stack: () => (
      <div className="text-foreground/90">
        Go, Rust, C++, Python, Kubernetes, CUDA, NCCL, NVLink, RoCE, RDMA, PyTorch, JAX
      </div>
    ),
    experience: () => (
      <div className="text-foreground/90">Arista Networks, xAI, Tesla, Lenovo</div>
    ),
    socials: () => (
      <ul className="space-y-0.5">
        {Object.entries(profile.socials).map(([k, v]) => (
          <li key={k} className="text-foreground-muted">
            {k.padEnd(8)}{' '}
            <a className="text-primary link-underline" href={v} target="_blank" rel="noreferrer">
              {v}
            </a>
          </li>
        ))}
      </ul>
    ),
    contact: () => (
      <div className="text-foreground/90">
        Email:{' '}
        <a className="text-primary link-underline" href={`mailto:${profile.contact}`}>
          {profile.contact}
        </a>
      </div>
    ),
    clear: () => {
      setHistory([]);
      return <div />;
    },
  };

  const run = async (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setBusy(true);
    setHistory((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'input',
        content: (
          <div>
            <span className="text-primary">{profile.handle}</span>
            <span className="text-foreground-muted">:~$</span>{' '}
            <span className="text-foreground">{raw}</span>
          </div>
        ),
      },
    ]);
    await new Promise((res) => setTimeout(res, 60));
    const handler = commands[cmd];
    const output = handler ? (
      handler()
    ) : (
      <div className="text-foreground-muted">
        Unknown command: <span className="text-destructive">{cmd}</span>. Try{' '}
        <span className="text-primary">help</span>.
      </div>
    );
    setHistory((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: 'output', content: output },
    ]);
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
      setBuffer((prev) => prev.slice(0, -1));
      return;
    }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      setBuffer((prev) => prev + e.key);
    }
  };

  const handleTerminalClick = () => {
    hiddenInputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (busy) return;
    const value = e.target.value;
    if (value.endsWith('\n')) {
      const current = buffer;
      setBuffer('');
      run(current);
      e.target.value = '';
    } else {
      setBuffer(value);
    }
  };

  return (
    <motion.div
      className="relative w-full rounded-xl border border-border bg-background-elevated/80 backdrop-blur-md overflow-hidden font-mono text-sm shadow-sm"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={handleTerminalClick}
      role="region"
      aria-label="Interactive terminal"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-background-subtle/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
        </div>
        <span className="label-mono text-[10px]">{profile.handle}</span>
        <span className="w-12" />
      </div>

      {/* Hidden input for mobile keyboard */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={buffer}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const current = buffer;
            setBuffer('');
            run(current);
            e.currentTarget.value = '';
          }
        }}
        className="absolute opacity-0 pointer-events-none"
        aria-hidden="true"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />

      <div ref={scrollRef} className="px-4 py-3 max-h-64 overflow-y-auto space-y-2">
        {history.map((h) => (
          <div key={h.id} className="leading-relaxed">
            {h.content}
          </div>
        ))}
        {/* Live input line */}
        <div className="flex items-baseline">
          <span className="text-primary mr-1">{profile.handle}</span>
          <span className="text-foreground-muted mr-2">:~$</span>
          <span className="text-foreground whitespace-pre-wrap break-words">{buffer}</span>
          <span className="caret bg-primary" />
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
