'use client';

import { Check, Copy, Terminal } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

const methods = {
  homebrew: {
    label: 'Homebrew',
    description:
      'Already use Homebrew? Install Quodex from the maintained tap with one command.',
    command: 'brew install --cask hxbib/tap/quodex',
  },
  source: {
    label: 'Build from source',
    description:
      'Requires Swift 6 and the macOS Command Line Tools. A full Xcode installation is not required.',
    command:
      'git clone https://github.com/hxbib/Quodex.git &&\ncd Quodex &&\n./Scripts/install-app.sh',
  },
} as const;

type InstallMethod = keyof typeof methods;
type CopyStatus = 'idle' | 'copied' | 'failed';

export default function InstallMethods() {
  const [method, setMethod] = useState<InstallMethod>('homebrew');
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyRequest = useRef(0);
  const panelId = useId();
  const selected = methods[method];

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      copyRequest.current += 1;
    },
    [],
  );

  const selectMethod = (nextMethod: InstallMethod) => {
    if (timer.current) clearTimeout(timer.current);
    copyRequest.current += 1;
    setMethod(nextMethod);
    setCopyStatus('idle');
  };

  const copyCommand = async () => {
    if (timer.current) clearTimeout(timer.current);
    const request = ++copyRequest.current;
    try {
      await navigator.clipboard.writeText(selected.command);
      if (copyRequest.current !== request) return;
      setCopyStatus('copied');
      timer.current = setTimeout(() => setCopyStatus('idle'), 3000);
    } catch {
      if (copyRequest.current === request) setCopyStatus('failed');
    }
  };

  return (
    <section
      className="install-methods"
      aria-label="Alternative installation methods"
    >
      <fieldset className="method-switch">
        <legend className="sr-only">Installation method</legend>
        {(Object.keys(methods) as InstallMethod[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={method === key}
            aria-controls={panelId}
            onClick={() => selectMethod(key)}
          >
            {methods[key].label}
          </button>
        ))}
      </fieldset>

      <p className="install-methods-description">{selected.description}</p>

      <div className="install-terminal" id={panelId}>
        <div className="install-terminal-bar">
          <span>
            <Terminal size={15} aria-hidden="true" /> Terminal
          </span>
          <button
            className="copy-command"
            type="button"
            onClick={() => void copyCommand()}
            aria-label={
              copyStatus === 'copied'
                ? `Copied ${selected.label} install command`
                : `Copy command for ${selected.label}`
            }
          >
            {copyStatus === 'copied' ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )}
            <span>{copyStatus === 'copied' ? 'Copied' : 'Copy command'}</span>
          </button>
        </div>
        <textarea
          className="install-command"
          readOnly
          aria-label={`${selected.label} install command`}
          rows={method === 'homebrew' ? 1 : 3}
          value={selected.command}
          wrap="off"
        />
      </div>

      <output className="install-status" aria-live="polite" aria-atomic="true">
        {copyStatus === 'copied'
          ? 'Command copied. Paste it into Terminal to install.'
          : copyStatus === 'failed'
            ? 'Clipboard access is unavailable. Select the command above and copy it manually.'
            : ''}
      </output>
    </section>
  );
}
