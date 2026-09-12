'use client';

import {
  Activity,
  ArrowUpDown,
  ArrowUpRight,
  Bell,
  CalendarClock,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  CircleUserRound,
  CloudOff,
  Code2,
  Copy,
  Download,
  Eye,
  Gauge,
  KeyRound,
  Layers3,
  LockKeyhole,
  LoaderCircle,
  MonitorCheck,
  MousePointer2,
  Pin,
  Plus,
  RotateCcw,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trash2,
  UsersRound,
  Workflow,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type ReactNode } from 'react';

function AppIcon({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/app-icon.svg"
      alt="Quodex app icon"
      className={className}
      width={1024}
      height={1024}
      unoptimized
    />
  );
}

function PlatformSwitch() {
  return (
    <nav className="platform-switch" aria-label="Quodex platform">
      <span aria-current="page">macOS</span>
      <a href="https://quodex.app/windows/">Windows</a>
    </nav>
  );
}

type DemoLane = {
  label: string;
  remaining: number;
  reset: string;
  tone?: 'blue' | 'yellow' | 'red';
};

type DemoAccount = {
  id: string;
  email: string;
  initials: string;
  plan: 'Plus' | 'free';
  freshness: string;
  avatar: 'gold' | 'violet' | 'green' | 'blue' | 'pink';
  banked?: number;
  lanes: DemoLane[];
};

function resetMinutes(reset: string) {
  const days = Number(reset.match(/(\d+)d/)?.[1] ?? 0);
  const hours = Number(reset.match(/(\d+)h/)?.[1] ?? 0);
  const minutes = Number(reset.match(/(\d+)m/)?.[1] ?? 0);
  return days * 24 * 60 + hours * 60 + minutes;
}

const demoAccounts: DemoAccount[] = [
  {
    id: 'alex',
    email: 'alex@quodex.app',
    initials: 'AL',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'gold',
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 53, reset: 'in 6d 4h · Mon 1:17 AM' },
    ],
  },
  {
    id: 'sam',
    email: 'sam@quodex.app',
    initials: 'SA',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'violet',
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 56, reset: 'in 6d 3h · Mon 12:16 AM' },
    ],
  },
  {
    id: 'jordan',
    email: 'jordan@quodex.app',
    initials: 'JO',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'green',
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 84, reset: 'in 6d 13h · Mon 10:22 AM' },
    ],
  },
  {
    id: 'casey',
    email: 'casey@quodex.app',
    initials: 'CA',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'blue',
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 69, reset: 'in 6d 1h · Sun 10:41 PM' },
    ],
  },
  {
    id: 'morgan',
    email: 'morgan@quodex.app',
    initials: 'MO',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'pink',
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 100, reset: 'in 6d 23h · Mon 8:33 PM' },
    ],
  },
  {
    id: 'taylor',
    email: 'taylor@quodex.app',
    initials: 'TA',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'blue',
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 100, reset: 'in 6d 23h · Mon 8:33 PM' },
    ],
  },
  {
    id: 'quinn',
    email: 'quinn@quodex.app',
    initials: 'QU',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'violet',
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 100, reset: 'in 6d 23h · Mon 8:33 PM' },
    ],
  },
  {
    id: 'riley',
    email: 'riley@quodex.app',
    initials: 'RI',
    plan: 'Plus',
    freshness: 'Last updated 23 min ago',
    avatar: 'gold',
    banked: 1,
    lanes: [
      { label: '5-hour', remaining: 100, reset: 'in 4h 36m · Tue 1:33 AM' },
      { label: 'Weekly', remaining: 100, reset: 'in 6d 23h · Mon 8:33 PM' },
    ],
  },
];

const initialAccounts = [demoAccounts[0], demoAccounts[1], demoAccounts[7]].map(
  (account, index) => ({
    ...account,
    lanes: account.lanes.map((lane, laneIndex) => ({
      ...lane,
      remaining: [
        [82, 67],
        [38, 24],
        [96, 78],
      ][index][laneIndex],
    })),
  }),
);

function refreshedAccount(account: DemoAccount): DemoAccount {
  return {
    ...account,
    freshness: 'Live',
    lanes: account.lanes.map((lane) => ({
      ...lane,
      remaining: Math.floor(Math.random() * 101),
    })),
  };
}

function UsageLane({
  lane,
  compact = false,
}: {
  lane: DemoLane;
  compact?: boolean;
}) {
  return (
    <div className={`native-lane${compact ? ' compact' : ''}`}>
      <div>
        <span>{lane.label}</span>
        <strong>{lane.remaining}% left</strong>
        <small>{lane.reset}</small>
      </div>
      <i
        className={`lane-track ${lane.tone ?? (lane.remaining <= 25 ? 'red' : 'blue')}`}
      >
        <b style={{ width: `${lane.remaining}%` }} />
      </i>
    </div>
  );
}

function PoolSummary({
  accounts,
  compact = false,
}: {
  accounts: DemoAccount[];
  compact?: boolean;
}) {
  const laneRows = ['5-hour', 'Weekly', 'Reserve', 'Free Monthly']
    .map((label) => {
      const lanes = accounts.flatMap((account) =>
        account.lanes.filter((lane) => lane.label === label),
      );
      if (!lanes.length) return null;
      return {
        label,
        remaining: lanes.reduce((total, lane) => total + lane.remaining, 0),
        accountCount: lanes.length,
        reset: lanes.reduce(
          (earliest, lane) =>
            resetMinutes(lane.reset) < resetMinutes(earliest)
              ? lane.reset
              : earliest,
          lanes[0].reset,
        ),
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);
  const resetCount = accounts.reduce(
    (total, account) => total + (account.banked ?? 0),
    0,
  );
  const visibleRows = compact
    ? laneRows.filter((row) => row.label !== 'Free Monthly')
    : laneRows;
  const liveCount = accounts.filter(
    (account) => account.freshness === 'Live',
  ).length;
  const statusLabel =
    liveCount === accounts.length
      ? `Live across all ${accounts.length} accounts`
      : liveCount > 0
        ? `${liveCount} live · ${accounts.length - liveCount} last updated`
        : 'All updated 23 min ago or newer';

  return (
    <div className={`quodex-pool${compact ? ' compact' : ''}`}>
      <div className="pool-heading">
        <span>
          <strong>Pool capacity</strong>
          <small>{statusLabel}</small>
        </span>
        {resetCount > 0 ? (
          <b className="reset-pill">
            <span className="reset-glyph" aria-hidden="true">
              <RotateCcw size={7} strokeWidth={3} />
            </span>
            {resetCount} reset{resetCount === 1 ? '' : 's'}
          </b>
        ) : null}
      </div>
      {visibleRows.map((row) => (
        <div className="pool-row" key={row.label}>
          <span>
            {row.label} · {row.accountCount} acct
            {row.accountCount === 1 ? '' : 's'}
          </span>
          <strong>{row.remaining}%</strong>
          <small>next {row.reset}</small>
        </div>
      ))}
    </div>
  );
}

function AccountCard({
  account,
  notificationsEnabled,
  refreshing,
  onCopyEmail,
  onToggleNotifications,
  onRefresh,
  onRemove,
}: {
  account: DemoAccount;
  notificationsEnabled: boolean;
  refreshing: boolean;
  onCopyEmail: () => void;
  onToggleNotifications: () => void;
  onRefresh: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="quodex-account-card">
      <div className="account-heading">
        <span className={`native-avatar ${account.avatar}`}>
          {account.initials}
        </span>
        <span className="account-identity">
          <button
            className="account-email"
            onClick={onCopyEmail}
            aria-label={`Copy ${account.email}`}
          >
            <strong>{account.email}</strong>
            <Copy size={11} />
          </button>
          <small>
            <b>{account.plan}</b>
            <em className={account.freshness === 'Live' ? 'is-live' : ''}>
              {account.freshness}
            </em>
          </small>
        </span>
        {account.banked ? (
          <span className="reset-pill">
            <span className="reset-glyph" aria-hidden="true">
              <RotateCcw size={7} strokeWidth={3} />
            </span>
            {account.banked} reset{account.banked > 1 ? 's' : ''}
          </span>
        ) : null}
        <span className="account-actions">
          <button
            className={notificationsEnabled ? 'enabled' : ''}
            onClick={onToggleNotifications}
            aria-label={`${notificationsEnabled ? 'Disable' : 'Enable'} reset notifications for ${account.email}`}
          >
            {notificationsEnabled ? (
              <Bell size={11} fill="currentColor" />
            ) : (
              <Bell size={11} />
            )}
          </button>
          <button onClick={onRefresh} aria-label={`Refresh ${account.email}`}>
            {refreshing ? (
              <LoaderCircle size={12} className="spin" />
            ) : (
              <RotateCw size={12} />
            )}
          </button>
          <button
            className="remove"
            onClick={onRemove}
            aria-label={`Remove ${account.email}`}
          >
            <Trash2 size={12} />
          </button>
        </span>
      </div>
      {account.lanes.map((lane) => (
        <UsageLane key={lane.label} lane={lane} />
      ))}
      {account.banked ? (
        <div className="banked-row">
          <span className="reset-glyph" aria-hidden="true">
            <RotateCcw size={7} strokeWidth={3} />
          </span>
          {account.banked} banked reset{account.banked > 1 ? 's' : ''} available
        </div>
      ) : null}
    </article>
  );
}

function QuodexDashboard({
  accounts,
  pinned,
  refreshingAll,
  refreshingAccount,
  notificationStates,
  onPin,
  onSort,
  onRefreshAll,
  onAdd,
  onToggleNotifications,
  onCopyEmail,
  onRefreshAccount,
  onRemoveAccount,
}: {
  accounts: DemoAccount[];
  pinned: boolean;
  refreshingAll: boolean;
  refreshingAccount: string | null;
  notificationStates: Record<string, boolean>;
  onPin: () => void;
  onSort: () => void;
  onRefreshAll: () => void;
  onAdd: () => void;
  onToggleNotifications: (id: string) => void;
  onCopyEmail: (id: string) => void;
  onRefreshAccount: (id: string) => void;
  onRemoveAccount: (id: string) => void;
}) {
  const accountCount = accounts.length;
  return (
    <div className={`quodex-dashboard${accountCount === 0 ? ' is-empty' : ''}`}>
      <header className="quodex-dashboard-header">
        <AppIcon className="dashboard-icon" />
        <span>
          <strong>Quodex</strong>
          <small>
            {accountCount} {accountCount === 1 ? 'account' : 'accounts'}
          </small>
        </span>
        <div>
          <button
            className={pinned ? 'enabled' : ''}
            onClick={onPin}
            aria-label={pinned ? 'Unpin Quodex' : 'Pin Quodex open'}
          >
            <Pin size={12} fill={pinned ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={onSort}
            disabled={accountCount === 0 || refreshingAll}
            aria-label="Sort accounts by soonest reset"
          >
            <ArrowUpDown size={12} />
          </button>
          <button
            onClick={onRefreshAll}
            disabled={refreshingAll || accountCount === 0}
            aria-label="Refresh all accounts"
          >
            {refreshingAll ? (
              <LoaderCircle size={12} className="spin" />
            ) : (
              <RotateCw size={12} />
            )}
          </button>
          <button
            className="add"
            onClick={onAdd}
            disabled={accountCount >= 100}
            aria-label="Add account"
          >
            <Plus size={13} />
          </button>
        </div>
      </header>
      {accountCount === 0 ? (
        <div className="quodex-empty-state">
          <div className="empty-account-icon">
            <UsersRound size={36} strokeWidth={1.35} />
            <CirclePlus size={16} strokeWidth={1.8} />
          </div>
          <strong>Track your ChatGPT accounts</strong>
          <p>Sign in to see live usage limits and reset information.</p>
          <button className="empty-add-button" onClick={onAdd}>
            Add your first account
          </button>
          <small>
            Quodex stores this account&apos;s tokens locally in your Mac&apos;s
            Keychain. It does not read or modify the official ChatGPT or Codex
            apps.
          </small>
        </div>
      ) : (
        <div className="quodex-dashboard-body">
          <PoolSummary accounts={accounts} />
          <div className="quodex-dashboard-scroll">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                notificationsEnabled={notificationStates[account.id] ?? false}
                refreshing={refreshingAccount === account.id}
                onCopyEmail={() => onCopyEmail(account.id)}
                onToggleNotifications={() => onToggleNotifications(account.id)}
                onRefresh={() => onRefreshAccount(account.id)}
                onRemove={() => onRemoveAccount(account.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DemoPopover() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingAccount, setRefreshingAccount] = useState<string | null>(
    null,
  );
  const [showAdd, setShowAdd] = useState(false);
  const [loginStage, setLoginStage] = useState<
    'idle' | 'requesting' | 'waiting' | 'complete'
  >('idle');
  const [pinned, setPinned] = useState(false);
  const [notificationStates, setNotificationStates] = useState<
    Record<string, boolean>
  >({
    alex: true,
    sam: true,
    jordan: true,
    casey: true,
    morgan: true,
    taylor: true,
    quinn: true,
    riley: true,
  });
  const [toast, setToast] = useState('');
  const [pendingRemoval, setPendingRemoval] = useState<DemoAccount | null>(
    null,
  );
  const sheetRef = useRef<HTMLDialogElement>(null);
  const removalDialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const removalPreviousFocusRef = useRef<HTMLElement | null>(null);
  const loginTimerRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);
  useEffect(() => {
    if (!showAdd && !pendingRemoval) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showAdd, pendingRemoval]);
  const scheduleTimeout = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((value) => value !== timer);
      if (loginTimerRef.current === timer) loginTimerRef.current = null;
      callback();
    }, delay);
    timersRef.current.push(timer);
    return timer;
  };
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);
  useEffect(() => {
    if (!showAdd) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const dialog = sheetRef.current;
    dialog?.querySelector<HTMLElement>('button:not([disabled])')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (loginTimerRef.current !== null) {
          window.clearTimeout(loginTimerRef.current);
          loginTimerRef.current = null;
        }
        setShowAdd(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = Array.from(
        dialog?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [],
      );
      if (focusables.length < 2) return;
      const current = document.activeElement;
      const index = focusables.indexOf(current as HTMLElement);
      if (event.shiftKey && (index <= 0 || index === -1)) {
        event.preventDefault();
        focusables.at(-1)?.focus();
      } else if (
        !event.shiftKey &&
        (index === focusables.length - 1 || index === -1)
      ) {
        event.preventDefault();
        focusables[0]?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [showAdd]);
  useEffect(() => {
    if (!pendingRemoval) return;
    removalPreviousFocusRef.current =
      document.activeElement as HTMLElement | null;
    const dialog = removalDialogRef.current;
    dialog?.querySelector<HTMLElement>('button:not([disabled])')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setPendingRemoval(null);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = Array.from(
        dialog?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [],
      );
      if (focusables.length < 2) return;
      const current = document.activeElement;
      const index = focusables.indexOf(current as HTMLElement);
      if (event.shiftKey && (index <= 0 || index === -1)) {
        event.preventDefault();
        focusables.at(-1)?.focus();
      } else if (
        !event.shiftKey &&
        (index === focusables.length - 1 || index === -1)
      ) {
        event.preventDefault();
        focusables[0]?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (removalPreviousFocusRef.current?.isConnected) {
        removalPreviousFocusRef.current.focus();
      }
    };
  }, [pendingRemoval]);
  const cancelLoginTimer = () => {
    if (loginTimerRef.current === null) return;
    window.clearTimeout(loginTimerRef.current);
    loginTimerRef.current = null;
  };
  const openAdd = () => {
    cancelLoginTimer();
    setLoginStage('idle');
    setShowAdd(true);
  };
  const closeAdd = () => {
    cancelLoginTimer();
    setShowAdd(false);
  };
  const doRefreshAll = () => {
    if (refreshing) return;
    setRefreshing(true);
    setToast(
      accounts.length === 1
        ? `Refreshing ${accounts[0].email} usage limits.`
        : `Refreshing all ${accounts.length} accounts’ usage limits.`,
    );
    scheduleTimeout(() => {
      setRefreshing(false);
      setAccounts((items) => items.map(refreshedAccount));
    }, 1050);
  };
  const refreshAccount = (id: string) => {
    if (refreshingAccount) return;
    const account = accounts.find((item) => item.id === id);
    setRefreshingAccount(id);
    if (account) setToast(`Refreshing ${account.email} usage limits.`);
    scheduleTimeout(() => {
      setRefreshingAccount(null);
      setAccounts((items) =>
        items.map((item) => (item.id === id ? refreshedAccount(item) : item)),
      );
    }, 760);
  };
  const requestRemoveAccount = (id: string) => {
    const account = accounts.find((item) => item.id === id);
    if (account) setPendingRemoval(account);
  };
  const removeAccount = () => {
    if (!pendingRemoval) return;
    setAccounts((items) =>
      items.filter((item) => item.id !== pendingRemoval.id),
    );
    setPendingRemoval(null);
    setToast('Account removed from Quodex.');
  };
  const copyEmail = async (id: string) => {
    const account = accounts.find((item) => item.id === id);
    if (!account) return;
    try {
      await navigator.clipboard?.writeText(account.email);
      setToast(`Copied ${account.email} to clipboard.`);
    } catch {
      return;
    }
  };
  const toggleNotifications = (id: string) => {
    const account = accounts.find((item) => item.id === id);
    if (!account) return;
    const enabled = !notificationStates[id];
    setNotificationStates((states) => ({ ...states, [id]: enabled }));
    setToast(
      `Reset alerts turned ${enabled ? 'on' : 'off'} for ${account.email}.`,
    );
  };
  const sortBySoonestReset = () => {
    if (refreshing || accounts.length === 0) return;
    setRefreshing(true);
    setToast('Refreshing all accounts before sorting.');
    scheduleTimeout(() => {
      setAccounts((items) =>
        [...items]
          .map((account) => ({ ...account, freshness: 'Live' }))
          .sort((left, right) => {
            const leftReset = Math.min(
              ...left.lanes.map((lane) => resetMinutes(lane.reset)),
            );
            const rightReset = Math.min(
              ...right.lanes.map((lane) => resetMinutes(lane.reset)),
            );
            return (
              leftReset - rightReset || left.email.localeCompare(right.email)
            );
          }),
      );
      setRefreshing(false);
      setToast('Sorted by soonest reset.');
    }, 1050);
  };
  const completeDemoLogin = () => {
    if (accounts.length >= 100) return;
    setAccounts((items) => {
      const nextAccount = demoAccounts.find(
        (candidate) => !items.some((item) => item.id === candidate.id),
      );
      if (nextAccount) return [...items, refreshedAccount(nextAccount)];
      let number = items.length + 1;
      while (items.some((item) => item.id === `account-${number}`)) number++;
      return [
        ...items,
        refreshedAccount({
          id: `account-${number}`,
          email: `account${number}@quodex.app`,
          initials: `A${number}`.slice(0, 2),
          plan: 'Plus',
          freshness: 'Live',
          avatar: ['blue', 'violet', 'green', 'gold', 'pink'][
            number % 5
          ] as DemoAccount['avatar'],
          lanes: [
            {
              label: '5-hour',
              remaining: 100,
              reset: 'in 4h 36m · Tue 1:33 AM',
            },
            {
              label: 'Weekly',
              remaining: 100,
              reset: 'in 6d 23h · Mon 8:33 PM',
            },
          ],
        }),
      ];
    });
    setLoginStage('complete');
  };
  const startLogin = () => {
    cancelLoginTimer();
    setLoginStage('requesting');
    loginTimerRef.current = scheduleTimeout(() => {
      setLoginStage('waiting');
      loginTimerRef.current = scheduleTimeout(completeDemoLogin, 1100);
    }, 350);
  };

  return (
    <>
      <div className="demo-preview">
        <section
          className={`demo-popover${showAdd ? ' is-login' : ''}`}
          aria-label="Interactive Quodex demo"
        >
          <div className="add-account-cue" aria-hidden="true">
            <span>
              {accounts.length === 0
                ? 'Add your first account'
                : 'Add another account'}
            </span>
            <ArrowUpRight size={22} strokeWidth={1.7} />
          </div>
          <QuodexDashboard
            accounts={accounts}
            pinned={pinned}
            refreshingAll={refreshing}
            refreshingAccount={refreshingAccount}
            notificationStates={notificationStates}
            onPin={() => setPinned((value) => !value)}
            onSort={sortBySoonestReset}
            onRefreshAll={doRefreshAll}
            onAdd={openAdd}
            onToggleNotifications={toggleNotifications}
            onCopyEmail={copyEmail}
            onRefreshAccount={refreshAccount}
            onRemoveAccount={requestRemoveAccount}
          />
          <output className="sr-only" aria-live="polite" aria-atomic="true">
            {toast}
          </output>
        </section>
        <div
          className="notification-rail"
          aria-label="Example Quodex notifications"
        >
          <div className="floating-note notification-five-hour">
            <AppIcon className="notification-app-icon" />
            <div>
              <span className="notification-meta">
                <strong>Quodex</strong>
                <time>now</time>
              </span>
              <b>Usage reset detected</b>
              <small>5-hour is available again for alex@quodex.app.</small>
            </div>
          </div>
          <div className="floating-note notification-weekly">
            <AppIcon className="notification-app-icon" />
            <div>
              <span className="notification-meta">
                <strong>Quodex</strong>
                <time>now</time>
              </span>
              <b>Usage reset detected</b>
              <small>Weekly is available again for sam@quodex.app.</small>
            </div>
          </div>
        </div>
      </div>
      {showAdd &&
        createPortal(
          <div className="demo-sheet-backdrop">
            <dialog
              ref={sheetRef}
              open
              className="demo-sheet"
              aria-modal="true"
              aria-labelledby="demo-sheet-title"
              aria-describedby="demo-sheet-description"
            >
              <button
                className="sheet-close"
                onClick={closeAdd}
                aria-label="Back to accounts"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="sheet-titlebar">
                <h3 id="demo-sheet-title">Add ChatGPT account</h3>
              </div>
              <div className="sheet-native-content">
                {loginStage === 'idle' && (
                  <>
                    <div className="sheet-icon">
                      <CircleUserRound size={48} strokeWidth={1.45} />
                      <CirclePlus
                        className="sheet-icon-plus"
                        size={20}
                        strokeWidth={1.8}
                      />
                    </div>
                    <h3>Sign in with a one-time code</h3>
                    <p id="demo-sheet-description">
                      A secure OpenAI page will open in your browser. Sign in to
                      the account you want to track, then enter the code shown
                      here.
                    </p>
                    <button
                      className="primary-button sheet-button"
                      onClick={startLogin}
                    >
                      Start sign-in
                    </button>
                  </>
                )}
                {loginStage === 'requesting' && (
                  <>
                    <div className="sheet-icon">
                      <LoaderCircle size={42} className="spin" />
                    </div>
                    <h3>Requesting a secure sign-in code…</h3>
                  </>
                )}
                {loginStage === 'waiting' && (
                  <>
                    <div className="sheet-icon">
                      <ShieldCheck size={46} strokeWidth={1.8} />
                    </div>
                    <h3>Enter this code</h3>
                    <div className="device-code">QUO–DEX</div>
                    <div className="sheet-secondary-actions">
                      <button
                        onClick={() =>
                          void navigator.clipboard?.writeText('QUO–DEX')
                        }
                      >
                        Copy code
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            'https://auth.openai.com/codex/device',
                            '_blank',
                            'noopener,noreferrer',
                          )
                        }
                      >
                        Open login page
                      </button>
                    </div>
                    <small className="sheet-waiting">
                      Waiting for OpenAI to confirm sign-in…
                    </small>
                  </>
                )}
                {loginStage === 'complete' && (
                  <>
                    <div className="sheet-icon complete">
                      <Check size={46} strokeWidth={1.8} />
                    </div>
                    <h3>Account ready</h3>
                    <p id="demo-sheet-description">
                      {accounts.at(-1)?.email} is ready.
                    </p>
                    <button
                      className="primary-button sheet-button"
                      onClick={closeAdd}
                    >
                      Done <Check size={14} />
                    </button>
                  </>
                )}
              </div>
              <p className="sheet-privacy">
                Quodex stores this account&apos;s tokens locally in your
                Mac&apos;s Keychain. It does not read or modify the official
                ChatGPT or Codex apps.
              </p>
            </dialog>
          </div>,
          document.body,
        )}
      {pendingRemoval &&
        createPortal(
          <div className="demo-confirm-backdrop">
            <dialog
              ref={removalDialogRef}
              open
              className="demo-confirm"
              aria-modal="true"
              aria-labelledby="remove-account-title"
              aria-describedby="remove-account-description"
            >
              <div className="confirm-icon">
                <Trash2 size={22} />
              </div>
              <span className="card-eyebrow">Remove account</span>
              <h3 id="remove-account-title">Remove account?</h3>
              <p id="remove-account-description">
                This removes the account and its Quodex credentials from this
                Mac. It does not alter the ChatGPT account or sign it out
                elsewhere.
              </p>
              <div className="confirm-actions">
                <button
                  className="secondary-button"
                  onClick={() => setPendingRemoval(null)}
                >
                  Cancel
                </button>
                <button className="danger-button" onClick={removeAccount}>
                  Remove {pendingRemoval.email} <Trash2 size={14} />
                </button>
              </div>
            </dialog>
          </div>,
          document.body,
        )}
    </>
  );
}

function FeatureCard({
  icon,
  eyebrow,
  title,
  copy,
  className = '',
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: ReactNode;
  copy: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={`feature-card ${className}`}>
      <div className="feature-icon">{icon}</div>
      <span className="card-eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {children}
    </article>
  );
}

const orderAccounts = [
  { email: 'alex@quodex.app', initials: 'AL', tone: 'gold', plan: 'Plus' },
  { email: 'sam@quodex.app', initials: 'SA', tone: 'violet', plan: 'Plus' },
  { email: 'jordan@quodex.app', initials: 'JO', tone: 'green', plan: 'Plus' },
];

function OrderPreview() {
  const [earliestFirst, setEarliestFirst] = useState(true);
  const rows = earliestFirst ? orderAccounts : [...orderAccounts].reverse();

  return (
    <div className="order-visual">
      <button
        className="sort-control"
        onClick={() => setEarliestFirst((value) => !value)}
        aria-label={`Sort by ${earliestFirst ? 'latest' : 'earliest'} reset`}
      >
        <ArrowUpDown size={12} />
      </button>
      {rows.map((account) => (
        <span key={account.email}>
          <i className={`avatar ${account.tone}`}>{account.initials}</i>
          <span className="order-account-copy">
            <strong>{account.email}</strong>
            <small>
              <b>{account.plan}</b> Last updated 23 min ago
            </small>
          </span>
          <span className="order-account-actions" aria-hidden="true">
            <i className="enabled">
              <Bell size={9} fill="currentColor" />
            </i>
            <i>
              <RotateCw size={9} />
            </i>
            <i className="remove">
              <Trash2 size={9} />
            </i>
          </span>
        </span>
      ))}
    </div>
  );
}

function HomebrewInstallCard() {
  const command = 'brew install --cask hxbib/tap/quodex';
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setCopyFailed(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <article className="homebrew-card">
      <div className="homebrew-copy">
        <div className="source-title">
          <Terminal size={19} />
          <span>Install with Homebrew</span>
        </div>
        <p>Install Quodex from its maintained Homebrew tap with one command.</p>
      </div>
      <div className="brew-command" aria-label="Homebrew install command">
        <code>
          <span>$</span> {command}
        </code>
        <button type="button" onClick={copyCommand} aria-label="Copy Homebrew install command">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <output className="sr-only" aria-live="polite">{copied ? 'Install command copied.' : copyFailed ? 'Select the command to copy it manually.' : ''}</output>
    </article>
  );
}

export default function Home() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) return;

    const root = document.documentElement;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.statement-section, .features-section .section-heading-row, .feature-card, .flow-section .section-kicker, .flow-header, .steps-grid article, .privacy-section > *, .native-card, .install-section > *, .faq-section > *, .final-cta, .site-footer',
      ),
    );

    root.classList.add('scroll-motion');
    revealTargets.forEach((target, index) => {
      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-delay', `${(index % 4) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -4%', threshold: 0.04 },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      revealTargets.forEach((target) => {
        target.classList.remove('scroll-reveal', 'is-visible');
        target.style.removeProperty('--reveal-delay');
      });
      root.classList.remove('scroll-motion');
    };
  }, []);

  return (
    <main>
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-wallpaper ambient-wallpaper-top" />
        <div className="ambient-wallpaper ambient-wallpaper-upper" />
        <div className="ambient-wallpaper ambient-wallpaper-middle" />
        <div className="ambient-wallpaper ambient-wallpaper-bottom" />
        <div className="ambient-wallpaper ambient-wallpaper-final" />
        <i />
        <i />
        <i />
        <span />
      </div>
      <a className="skip-link" href="#features">
        Skip to content
      </a>
      <nav className="site-nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Quodex home">
          <AppIcon className="brand-icon" />
          <span>Quodex</span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <a
            href="https://github.com/hxbib/Quodex"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className="nav-end">
          <PlatformSwitch />
          <a
            className="nav-cta"
            href="https://github.com/hxbib/Quodex/releases/latest"
            target="_blank"
            rel="noreferrer"
          >
            Download <ArrowUpRight size={15} />
          </a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> Built for macOS
          </div>
          <h1>
            Know your limits.
            <br />
            <em>Own your resets.</em>
          </h1>
          <p>
            A lightweight menu bar app for every ChatGPT{' '}
            <span className="hero-phrase">account — live usage,</span>{' '}
            <span className="hero-phrase">pooled capacity,</span>{' '}
            <span className="hero-phrase">countdowns,</span> and{' '}
            <span className="hero-phrase">banked resets.</span>
          </p>
          <div className="hero-actions">
            <a
              className="primary-button"
              href="https://github.com/hxbib/Quodex/releases/latest"
              target="_blank"
              rel="noreferrer"
            >
              <AppIcon className="button-icon" /> Download for Mac
            </a>
            <a
              className="secondary-button"
              href="https://github.com/hxbib/Quodex"
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={18} /> View source
            </a>
          </div>
          <div className="requirements">
            <span>macOS 14+</span>
            <span>MIT licensed</span>
          </div>
          <div className="demo-jump-row">
            <a className="demo-jump" href="#quodex-demo">
              <MousePointer2 size={14} /> Try the interactive app preview
              <ChevronRight size={14} />
            </a>
            <span>Sample data</span>
          </div>
        </div>

        <section
          className="product-stage"
          id="quodex-demo"
          aria-label="Interactive preview of the Quodex menu-bar app"
        >
          <div className="native-wallpaper" aria-hidden="true" />
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <DemoPopover />
        </section>
      </section>

      <section className="trust-strip shell" aria-label="Key product qualities">
        <div>
          <Zap size={16} />
          <span>
            <b>Native Swift</b> — light by design
          </span>
        </div>
        <div>
          <ShieldCheck size={16} />
          <span>
            <b>Private</b> — data stays local
          </span>
        </div>
        <div>
          <CloudOff size={16} />
          <span>
            <b>Standalone</b> — no local server
          </span>
        </div>
        <div>
          <Layers3 size={16} />
          <span>
            <b>Up to 100 accounts</b> — built to scale
          </span>
        </div>
      </section>

      <section className="statement-section shell">
        <div className="section-kicker">
          <Sparkles size={14} /> One glance. Zero guesswork.
        </div>
        <h2>
          Every account. Every limit.
          <br />
          <span>Finally, one clear picture.</span>
        </h2>
        <p className="section-lede">
          Quodex turns scattered usage windows and buried reset data into a
          centralized command center—right in your menu bar.
        </p>
        <div className="signal-grid" aria-label="Quodex at a glance">
          <div>
            <span className="signal-number">5h</span>
            <p>Short-window usage and exact countdowns</p>
          </div>
          <div>
            <span className="signal-number">7d</span>
            <p>Weekly capacity across every account</p>
          </div>
          <div>
            <span className="signal-number">100</span>
            <p>Accounts supported with smooth scrolling</p>
          </div>
          <div>
            <span className="signal-number">30m</span>
            <p>Background checks while Quodex runs</p>
          </div>
        </div>
      </section>

      <section className="features-section shell" id="features">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">
              <Activity size={14} /> Your usage, decoded
            </div>
            <h2>
              Built for people who
              <br />
              actually push the limits.
            </h2>
          </div>
          <p>
            Every surface is designed to answer one question quickly:{' '}
            <em>what can I use, and when does it come back?</em>
          </p>
        </div>

        <div className="bento-grid">
          <FeatureCard
            icon={<Gauge size={20} />}
            eyebrow="Pooled capacity"
            title="See the whole runway."
            copy="Combine remaining capacity across connected accounts into one instantly readable signal."
            className="feature-pool"
          >
            <PoolSummary accounts={initialAccounts} compact />
          </FeatureCard>

          <FeatureCard
            icon={<Bell size={20} />}
            eyebrow="Reset intelligence"
            title="Know the moment you're back."
            copy="Get optional local alerts for scheduled and early usage resets—plus automatic detection of newly banked resets."
            className="feature-alerts"
          >
            <div className="alert-stack">
              <div className="quodex-notification">
                <AppIcon className="feature-notification-icon" />
                <p>
                  <span className="notification-meta">
                    <strong>Quodex</strong>
                    <time>now</time>
                  </span>
                  <b>Usage reset detected</b>
                  <small>5-hour is available again for alex@quodex.app.</small>
                </p>
              </div>
              <div className="quodex-notification">
                <AppIcon className="feature-notification-icon" />
                <p>
                  <span className="notification-meta">
                    <strong>Quodex</strong>
                    <time>2m</time>
                  </span>
                  <b>New banked reset</b>
                  <small>
                    1 new banked reset detected for sam@quodex.app (3
                    available).
                  </small>
                </p>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<CalendarClock size={20} />}
            eyebrow="Every usage lane"
            title={
              <>
                <span>Nothing hidden.</span>
                <span>Nothing invented.</span>
              </>
            }
            copy="See 5 hour, weekly, gpt-reserve, and every other lane the service actually reports."
            className="feature-lanes"
          >
            <div className="lane-visual">
              <UsageLane
                compact
                lane={{
                  label: '5-hour',
                  remaining: 82,
                  reset: 'in 4h 36m · Tue 1:33 AM',
                }}
              />
              <UsageLane
                compact
                lane={{
                  label: 'Weekly',
                  remaining: 67,
                  reset: 'in 6d 4h · Mon 1:17 AM',
                }}
              />
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<Eye size={20} />}
            eyebrow="Truthful freshness"
            title="“Live” means live."
            copy="Fresh data is labeled live for only a short window. Older snapshots show their exact age instead of pretending to be current."
            className="feature-live"
          >
            <div className="freshness-visual">
              <span>
                <i className="avatar gold">AL</i>
                <span>
                  <strong>alex@quodex.app</strong>
                  <small>
                    <b>Plus</b> <em className="is-live">Live</em>
                  </small>
                </span>
              </span>
              <span>
                <i className="avatar violet">SA</i>
                <span>
                  <strong>sam@quodex.app</strong>
                  <small>
                    <b>Plus</b> <em>Last updated 23 min ago</em>
                  </small>
                </span>
              </span>
              <span>
                <i className="avatar green">JO</i>
                <span>
                  <strong>jordan@quodex.app</strong>
                  <small>
                    <b>Plus</b>{' '}
                    <em className="requires-login">Login required</em>
                  </small>
                </span>
              </span>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<MousePointer2 size={20} />}
            eyebrow="Your order"
            title="Arrange accounts your way."
            copy="Drag accounts into a custom order. Paid accounts stay prominent while new free accounts settle neatly at the bottom."
            className="feature-order"
          >
            <OrderPreview />
          </FeatureCard>

          <FeatureCard
            icon={<RotateCw size={20} />}
            eyebrow="Refresh your way"
            title="All at once—or just one."
            copy="Refresh all accounts, update one account independently, or let Quodex check every account every 30 minutes while it runs."
            className="feature-refresh"
          >
            <div className="refresh-visual">
              <span className="refresh-app-identity">
                <AppIcon />
                <span>
                  <strong>Quodex</strong>
                  <small>3 accounts</small>
                </span>
              </span>
              <div className="refresh-actions" aria-hidden="true">
                <i>
                  <Pin size={12} />
                </i>
                <i>
                  <ArrowUpDown size={12} />
                </i>
                <i className="is-refreshing">
                  <LoaderCircle size={12} />
                </i>
                <i className="add">
                  <Plus size={13} />
                </i>
              </div>
            </div>
          </FeatureCard>
        </div>
      </section>

      <section className="flow-section">
        <div className="shell">
          <div className="section-kicker light">
            <Workflow size={14} /> From download to clarity
          </div>
          <div className="flow-header">
            <h2>
              Up and running
              <br />
              in three quick steps.
            </h2>
            <p>
              No browser extension. No helper process. No Electron runtime. Just
              a tiny native app that lives where it belongs.
            </p>
          </div>
          <div className="steps-grid">
            <article>
              <span className="step-index">Step 01</span>
              <div className="step-icon">
                <Download size={22} />
              </div>
              <h3>Download Quodex</h3>
              <p>Install with Homebrew, or open the DMG and drag Quodex into Applications.</p>
            </article>
            <article>
              <span className="step-index">Step 02</span>
              <div className="step-icon">
                <KeyRound size={22} />
              </div>
              <h3>Connect an account</h3>
              <p>
                Use OpenAI&apos;s device-code sign-in. Add one—or add a hundred.
              </p>
            </article>
            <article>
              <span className="step-index">Step 03</span>
              <div className="step-icon">
                <MonitorCheck size={22} />
              </div>
              <h3>Open your menu bar</h3>
              <p>
                Your limits, resets, freshness, and capacity are ready at a
                glance.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section shell" id="privacy">
        <div className="privacy-copy">
          <div className="section-kicker">
            <LockKeyhole size={14} /> Private by architecture
          </div>
          <h2>
            Your accounts belong
            <br />
            to you. Full stop.
          </h2>
          <p>
            Quodex is intentionally boring about your data: credentials live in
            your macOS Keychain, metadata stays on your Mac, and nothing is
            routed through a Quodex server.
          </p>
          <div className="privacy-checks">
            <span>
              <Check size={14} /> OAuth tokens stored per account in Keychain
            </span>
            <span>
              <Check size={14} /> Refresh tokens discarded after device login
            </span>
            <span>
              <Check size={14} /> Local metadata written with owner-only
              permissions
            </span>
            <span>
              <Check size={14} /> No cookie reading, chat routing, or credential
              logging
            </span>
          </div>
          <a
            className="text-link"
            href="https://github.com/hxbib/Quodex#data-and-privacy"
            target="_blank"
            rel="noreferrer"
          >
            Read the complete privacy model <ArrowUpRight size={14} />
          </a>
        </div>

        <div
          className="privacy-diagram"
          aria-label="Diagram showing that Quodex data stays on your Mac"
        >
          <div className="mac-frame">
            <div className="mac-top">
              <i />
              <i />
              <i />
              <span>Your Mac</span>
            </div>
            <div className="mac-body">
              <div className="data-node main-node">
                <AppIcon className="node-icon" />
                <span>
                  <b>Quodex</b>
                  <small>Native menu-bar app</small>
                </span>
              </div>
              <div className="connector-network" aria-hidden="true">
                <i className="connector-trunk" />
                <i className="connector-branch" />
                <i className="connector-drop connector-drop-left" />
                <i className="connector-drop connector-drop-right" />
              </div>
              <div className="data-row">
                <div className="data-node">
                  <LockKeyhole size={18} />
                  <span>
                    <b>Keychain</b>
                    <small>OAuth tokens</small>
                  </span>
                </div>
                <div className="data-node">
                  <Code2 size={18} />
                  <span>
                    <b>Local file</b>
                    <small>Metadata + snapshots</small>
                  </span>
                </div>
              </div>
              <div className="local-badge">
                <ShieldCheck size={14} /> Stays on your Mac
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="native-section shell">
        <div className="native-card">
          <div className="native-glow" />
          <div className="native-copy">
            <div className="section-kicker light">
              <Zap size={14} /> Native to the core
            </div>
            <h2>
              Feels like macOS
              <br />
              because it is macOS.
            </h2>
            <p>
              No third-party Swift packages. No helper. No local server. No
              extension. A focused, dependency-light app built to launch fast
              and stay out of your way.
            </p>
          </div>
          <figure className="native-proof">
            <Image
              unoptimized
              src="/quodex-native-dashboard.avif"
              alt="Quodex app preview showing pooled capacity and three sample accounts"
              width={1752}
              height={2272}
            />
          </figure>
        </div>
      </section>

      <section className="install-section shell" id="install">
        <div className="section-heading-row install-heading">
          <div>
            <div className="section-kicker">
              <Download size={14} /> Get Quodex
            </div>
            <h2>Choose your way in.</h2>
          </div>
          <p>
            Install with Homebrew, download the official release, or build the
            entire app yourself from public source.
          </p>
        </div>
        <div className="install-grid">
          <HomebrewInstallCard />
          <article className="download-card">
            <span className="release-pill">Latest · v0.1.0</span>
            <AppIcon className="download-icon" />
            <h3>Download for macOS</h3>
            <p>For Macs running macOS 14 or later.</p>
            <a
              className="primary-button wide"
              href="https://github.com/hxbib/Quodex/releases/latest"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={17} /> Get the latest DMG
            </a>
          </article>
          <article className="source-card">
            <div className="source-title">
              <Terminal size={19} />
              <span>Build from source</span>
            </div>
            <pre aria-label="Build commands">
              <code>
                <span>$</span> git clone https://github.com/hxbib/Quodex.git{`\n`}
                <span>$</span> cd Quodex{`\n`}
                <span>$</span> ./Scripts/install-app.sh
              </code>
            </pre>
            <div className="source-meta">
              <span>
                <Check size={13} /> Swift 6
              </span>
              <span>
                <Check size={13} /> Command Line Tools
              </span>
              <span>
                <Check size={13} /> No full Xcode required
              </span>
            </div>
            <a
              className="secondary-button wide"
              href="https://github.com/hxbib/Quodex"
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={17} /> Browse the source
            </a>
          </article>
        </div>
        <p className="gatekeeper-note">
          <ShieldCheck size={14} /><span> This release is not notarized. If macOS blocks
          the first launch, open System Settings → Privacy &amp; Security → <b>Open Anyway</b>.</span>
        </p>
      </section>

      <section className="faq-section shell">
        <div className="faq-intro">
          <div className="section-kicker">
            <Sparkles size={14} /> Good questions
          </div>
          <h2>The details that matter.</h2>
          <p>
            Quodex is intentionally small, transparent, and specific about what
            it does.
          </p>
        </div>
        <div className="faq-list">
          <details>
            <summary>
              Does Quodex send or route my chats?
              <ChevronRight size={17} />
            </summary>
            <p>
              No. Quodex does not submit chats, route traffic, redeem banked
              resets, or read conversation content. It only reads usage and
              reset information through OpenAI services.
            </p>
          </details>
          <details>
            <summary>
              Where are my credentials stored?
              <ChevronRight size={17} />
            </summary>
            <p>
              Access and ID tokens are saved as per-account generic-password
              items in the macOS Keychain. Refresh tokens returned during device
              login are discarded.
            </p>
          </details>
          <details>
            <summary>
              What happens when a token expires?
              <ChevronRight size={17} />
            </summary>
            <p>
              Quodex does not retry or refresh an expired or rejected access
              token. The account is marked “Login required,” and you can begin a
              fresh device-code flow for that account.
            </p>
          </details>
          <details>
            <summary>
              Why is the release not notarized?
              <ChevronRight size={17} />
            </summary>
            <p>
              Quodex is distributed independently. macOS may ask you to confirm
              the first launch in System Settings → Privacy &amp; Security → Open Anyway. Local source
              builds are ad-hoc signed for personal development.
            </p>
          </details>
          <details>
            <summary>
              Is Quodex affiliated with OpenAI?
              <ChevronRight size={17} />
            </summary>
            <p>
              No. Quodex is an independent open-source project and is not
              affiliated with or endorsed by OpenAI.
            </p>
          </details>
        </div>
      </section>

      <section className="final-cta shell">
        <AppIcon className="cta-icon" />
        <div>
          <span className="cta-kicker">
            Your menu bar is about to get smarter.
          </span>
          <h2>
            Stop guessing.
            <br />
            <em>Start knowing.</em>
          </h2>
          <p>Every account, limit, reset, and countdown—beautifully clear.</p>
        </div>
        <div className="cta-actions">
          <a className="cta-preview-button" href="#quodex-demo">
            <MousePointer2 size={16} /> Try the interactive app preview
            <ChevronRight size={15} />
          </a>
          <a
            className="primary-button"
            href="https://github.com/hxbib/Quodex/releases/latest"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={17} /> Download Quodex
          </a>
          <a
            className="text-link light-link"
            href="https://github.com/hxbib/Quodex"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <footer className="site-footer shell">
        <a className="brand" href="#top">
          <AppIcon className="brand-icon" />
          <span>Quodex</span>
        </a>
        <p>
          Independent, open source, and made for macOS.
          <br />
          Not affiliated with or endorsed by OpenAI.
        </p>
        <div>
          <a
            href="https://github.com/hxbib/Quodex"
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
          <a
            href="https://github.com/hxbib/Quodex/releases"
            target="_blank"
            rel="noreferrer"
          >
            Releases
          </a>
          <a
            href="https://github.com/hxbib/Quodex/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            MIT License
          </a>
        </div>
      </footer>
    </main>
  );
}
