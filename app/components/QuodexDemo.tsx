'use client';

import {
  ArrowDownUp,
  ArrowRight,
  Bell,
  Check,
  Copy,
  MoreHorizontal,
  Plus,
  RotateCw,
  Trash2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import './quodex-demo.css';

type Scenario = 'flow' | 'limit' | 'reset';
type ResetPreview = { fiveHour: number; weekly: number; advanceBy: number };
type Account = {
  id: string;
  name: string;
  initials: string;
  color: string;
  fiveHour: number;
  weekly: number;
  resetMinutes: number;
  weeklyResetMinutes: number;
  banked: number;
  alerts: boolean;
  refreshed: boolean;
};

const people = [
  ['alex', 'Alex', 'AL', 'gold'],
  ['sam', 'Sam', 'SA', 'violet'],
  ['riley', 'Riley', 'RI', 'green'],
  ['jordan', 'Jordan', 'JO', 'blue'],
  ['casey', 'Casey', 'CA', 'rose'],
  ['morgan', 'Morgan', 'MO', 'gold'],
  ['taylor', 'Taylor', 'TA', 'violet'],
  ['quinn', 'Quinn', 'QU', 'green'],
];

const scenarios: { id: Scenario; label: string; note: string }[] = [
  {
    id: 'flow',
    label: 'In the flow',
    note: 'Explore the sample controls, or preview what happens at the next reset.',
  },
  {
    id: 'limit',
    label: 'Near a limit',
    note: 'A low balance, a short wait. Preview the reset to see which numbers change.',
  },
  {
    id: 'reset',
    label: 'After a reset',
    note: 'The 5-hour window is full again. The weekly balance stays separate.',
  },
];

function sampleAccount(index: number, scenario: Scenario = 'flow'): Account {
  const [id, name, initials, color] = people[index];
  const fiveHour =
    scenario === 'limit'
      ? [7, 2, 18]
      : scenario === 'reset'
        ? [7, 100, 18]
        : [82, 38, 96];
  const resetMinutes =
    scenario === 'flow'
      ? [276, 43, 188, 132, 214, 85, 167, 64][index]
      : [96, 12, 188, 132, 214, 85, 167, 64][index];
  return {
    id,
    name,
    initials,
    color,
    fiveHour: fiveHour[index] ?? 74,
    weekly: [67, 24, 78, 58, 90, 63, 42, 86][index],
    resetMinutes:
      scenario === 'reset'
        ? index === 1
          ? 300
          : resetMinutes - 12
        : resetMinutes,
    weeklyResetMinutes:
      [8897, 8836, 9933, 7600, 9240, 6520, 8460, 7010][index] -
      (scenario === 'reset' ? 12 : 0),
    banked: index === 2 ? 1 : 0,
    alerts: index !== 1,
    refreshed: scenario === 'reset',
  };
}

function resetLabel(minutes: number) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  return days
    ? `${days}d ${hours}h`
    : hours
      ? `${hours}h ${mins}m`
      : `${mins}m`;
}

function UsageRow({
  label,
  value,
  reset,
}: {
  label: string;
  value: number;
  reset: number;
}) {
  return (
    <div className={`qd-usage ${value <= 20 ? 'qd-usage-low' : ''}`}>
      <div className="qd-usage-labels">
        <span>{label}</span>
        <strong>{value}% left</strong>
        <small>Resets in {resetLabel(reset)}</small>
      </div>
      <meter
        className="qd-meter"
        aria-label={`${label} remaining`}
        min={0}
        max={100}
        value={value}
      >
        {value}%
      </meter>
    </div>
  );
}

function closeMenuOnEscape(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== 'Escape') return;
  const details = event.currentTarget.closest('details');
  if (!details) return;
  event.preventDefault();
  details.open = false;
  details.querySelector('summary')?.focus();
}

export default function QuodexDemo() {
  const [scenario, setScenario] = useState<Scenario>('flow');
  const [accounts, setAccounts] = useState<Account[]>(() =>
    [0, 1].map((index) => sampleAccount(index)),
  );
  const [refreshing, setRefreshing] = useState<string[]>([]);
  const [status, setStatus] = useState(scenarios[0].note);
  const [dialogAction, setDialogAction] = useState<'add' | Account | null>(
    null,
  );
  const [lastResetPreview, setLastResetPreview] = useState<ResetPreview | null>(
    null,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const accountsRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    accountsRef.current?.scrollTo({ top: 0 });
  }, [scenario, lastResetPreview]);
  useEffect(() => {
    if (dialogAction) dialogRef.current?.showModal();
    else {
      if (dialogRef.current?.open) dialogRef.current.close();
      if (previousFocus.current) {
        if (previousFocus.current.isConnected) previousFocus.current.focus();
        else addButtonRef.current?.focus();
        previousFocus.current = null;
      }
    }
  }, [dialogAction]);

  const closeDialog = () => {
    dialogRef.current?.close();
    setDialogAction(null);
  };
  const openDialog = (action: 'add' | Account, returnFocus?: HTMLElement) => {
    previousFocus.current =
      returnFocus ?? (document.activeElement as HTMLElement | null);
    setDialogAction(action);
  };
  const changeScenario = (next: Scenario) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRefreshing([]);
    setScenario(next);
    setLastResetPreview(
      next === 'reset' ? { fiveHour: 2, weekly: 24, advanceBy: 12 } : null,
    );
    setAccounts(
      (next === 'flow' ? [0, 1] : [1, 0]).map((index) =>
        sampleAccount(index, next),
      ),
    );
    setStatus(
      scenarios.find((item) => item.id === next)?.note ?? 'Sample loaded.',
    );
  };
  const refresh = (ids: string[]) => {
    if (!ids.length) return;
    setRefreshing((current) => [...new Set([...current, ...ids])]);
    setStatus(
      ids.length > 1
        ? 'Refreshing sample accounts…'
        : 'Refreshing sample usage…',
    );
    const timer = setTimeout(() => {
      setAccounts((current) =>
        current.map((account) =>
          ids.includes(account.id)
            ? {
                ...account,
                refreshed: true,
              }
            : account,
        ),
      );
      setRefreshing((current) => current.filter((id) => !ids.includes(id)));
      setStatus(
        'Sample snapshot refreshed. Checking usage does not spend your allowance.',
      );
      timers.current = timers.current.filter((entry) => entry !== timer);
    }, 500);
    timers.current.push(timer);
  };

  const previewReset = () => {
    if (scenario === 'reset') {
      changeScenario('limit');
      return;
    }
    const sam = accounts.find((account) => account.id === 'sam');
    if (!sam) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRefreshing([]);
    const advanceBy = sam.resetMinutes;
    setLastResetPreview({
      fiveHour: sam.fiveHour,
      weekly: sam.weekly,
      advanceBy,
    });
    setAccounts((current) => {
      const advanced = current.map((account) => {
        const shortWindowReset = account.resetMinutes <= advanceBy;
        const weeklyWindowReset = account.weeklyResetMinutes <= advanceBy;
        return {
          ...account,
          fiveHour: shortWindowReset ? 100 : account.fiveHour,
          weekly: weeklyWindowReset ? 100 : account.weekly,
          resetMinutes: shortWindowReset
            ? 300 - ((advanceBy - account.resetMinutes) % 300)
            : account.resetMinutes - advanceBy,
          weeklyResetMinutes: weeklyWindowReset
            ? 10080 - ((advanceBy - account.weeklyResetMinutes) % 10080)
            : account.weeklyResetMinutes - advanceBy,
          refreshed: true,
        };
      });
      return [
        ...advanced.filter((account) => account.id === 'sam'),
        ...advanced.filter((account) => account.id !== 'sam'),
      ];
    });
    setScenario('reset');
    setStatus(
      `Sample time advanced ${resetLabel(advanceBy)}. Sam’s 5-hour balance refilled; his weekly balance did not.`,
    );
  };
  const toggleAlerts = (account: Account) => {
    setAccounts((current) =>
      current.map((item) =>
        item.id === account.id ? { ...item, alerts: !item.alerts } : item,
      ),
    );
    setStatus(
      `Sample reset alerts ${account.alerts ? 'disabled' : 'enabled'} for ${account.name}.`,
    );
  };
  const copyEmail = async (account: Account) => {
    const email = `${account.id}@quodex.app`;
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      setStatus(`Copied sample email: ${email}`);
    } catch {
      setStatus(`Select and copy this sample email: ${email}`);
    }
  };
  const confirmDialog = () => {
    if (dialogAction === 'add') {
      const index = people.findIndex(
        ([id]) => !accounts.some((account) => account.id === id),
      );
      if (index >= 0) {
        const account = sampleAccount(index, scenario);
        setAccounts((current) => [...current, account]);
        if (account.id === 'sam' && scenario === 'reset')
          setLastResetPreview({ fiveHour: 2, weekly: 24, advanceBy: 12 });
        setStatus(`${account.name} added as a sample account.`);
      }
    } else if (dialogAction) {
      setAccounts((current) =>
        current.filter((account) => account.id !== dialogAction.id),
      );
      if (dialogAction.id === 'sam') setLastResetPreview(null);
      setStatus(`${dialogAction.name} removed from this preview.`);
    }
    closeDialog();
  };

  const totalFiveHour = accounts.reduce(
    (sum, account) => sum + account.fiveHour,
    0,
  );
  const totalWeekly = accounts.reduce(
    (sum, account) => sum + account.weekly,
    0,
  );
  const nextReset = accounts.length
    ? Math.min(...accounts.map((account) => account.resetMinutes))
    : 0;
  const banked = accounts.reduce((sum, account) => sum + account.banked, 0);
  const sam = accounts.find((account) => account.id === 'sam');
  const comparisonBefore = lastResetPreview?.fiveHour ?? sam?.fiveHour ?? 0;
  const comparisonAfter = lastResetPreview ? (sam?.fiveHour ?? 0) : 100;
  const comparisonWeekly = lastResetPreview?.weekly ?? sam?.weekly ?? 0;
  const comparisonTime = lastResetPreview?.advanceBy ?? sam?.resetMinutes ?? 0;

  return (
    <div className="qd-demo">
      <fieldset
        className="qd-scenarios"
        aria-label="Choose a sample usage scenario"
      >
        {scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={scenario === item.id}
            onClick={() => changeScenario(item.id)}
          >
            {item.label}
          </button>
        ))}
      </fieldset>
      <section
        className={`qd-rehearsal${lastResetPreview ? ' qd-rehearsal-complete' : ''}`}
        aria-label="Sam’s sample reset rehearsal"
      >
        <div className="qd-rehearsal-heading">
          <span>Sam’s 5-hour window</span>
          <span>
            {sam
              ? `+${resetLabel(comparisonTime)} sample time`
              : 'Sample account removed'}
          </span>
        </div>
        {sam ? (
          <>
            <div className="qd-comparison">
              <div className="qd-before">
                <span>{lastResetPreview ? 'BEFORE' : 'CURRENT'}</span>
                <strong>
                  {comparisonBefore}
                  <small>%</small>
                </strong>
              </div>
              <ArrowRight
                className="qd-comparison-arrow"
                size={25}
                aria-hidden="true"
              />
              <div className="qd-after">
                <span>AFTER RESET</span>
                <strong>
                  {comparisonAfter}
                  <small>%</small>
                </strong>
              </div>
              <button
                type="button"
                className="qd-rehearse-button"
                onClick={previewReset}
              >
                {lastResetPreview ? 'Replay sample' : 'Preview Sam’s reset'}
                <ArrowRight size={14} />
              </button>
            </div>
            <p className="qd-weekly-comparison">
              <span className="qd-weekly-symbol">=</span> Weekly{' '}
              <strong>{comparisonWeekly}%</strong>{' '}
              {comparisonWeekly === sam.weekly
                ? 'stays unchanged.'
                : `changes to ${sam.weekly}%.`}
              <span className="qd-simulation-label">Sample simulation</span>
            </p>
          </>
        ) : (
          <div className="qd-rehearsal-empty">
            <p>Add Sam again to explore his sample reset.</p>
            <button type="button" onClick={() => changeScenario('limit')}>
              Restore sample <ArrowRight size={14} />
            </button>
          </div>
        )}
      </section>
      <section
        className="qd-window"
        aria-label="Interactive Quodex preview with sample data"
      >
        <header className="qd-header">
          <Image
            className="qd-icon"
            src="/app-icon.svg"
            alt=""
            width={34}
            height={34}
            unoptimized
          />
          <div className="qd-brand">
            <strong>Quodex</strong>
            <span>
              {accounts.length} sample{' '}
              {accounts.length === 1 ? 'account' : 'accounts'}
            </span>
          </div>
          <div className="qd-header-actions">
            <button
              type="button"
              title="Sort by soonest reset"
              aria-label="Sort sample accounts by soonest reset"
              disabled={accounts.length < 2 || refreshing.length > 0}
              onClick={() => {
                setAccounts((current) =>
                  [...current].sort((a, b) => a.resetMinutes - b.resetMinutes),
                );
                setStatus('Sample accounts sorted by their next 5-hour reset.');
              }}
            >
              <ArrowDownUp size={16} />
            </button>
            <button
              type="button"
              title="Refresh all"
              aria-label="Refresh all sample accounts"
              disabled={!accounts.length || refreshing.length > 0}
              onClick={() => refresh(accounts.map((account) => account.id))}
            >
              <RotateCw
                size={16}
                className={refreshing.length ? 'qd-spin' : ''}
              />
            </button>
            <button
              ref={addButtonRef}
              type="button"
              className="qd-add-button"
              title="Add sample account"
              aria-label="Add a sample account"
              disabled={accounts.length >= people.length}
              onClick={() => openDialog('add')}
            >
              <Plus size={18} />
            </button>
          </div>
        </header>

        {accounts.length > 0 ? (
          <>
            <div className="qd-pool">
              <div className="qd-pool-title">
                <span>
                  <span className="qd-status-dot" />
                  Pool capacity
                </span>
                {banked > 0 && (
                  <span className="qd-reset-badge">
                    <RotateCw size={11} /> {banked} banked{' '}
                    {banked === 1 ? 'reset' : 'resets'}
                  </span>
                )}
              </div>
              <div className="qd-pool-values">
                <div>
                  <span>5-hour total</span>
                  <strong>
                    {totalFiveHour}
                    <small>%</small>
                  </strong>
                </div>
                <div>
                  <span>Weekly total</span>
                  <strong>
                    {totalWeekly}
                    <small>%</small>
                  </strong>
                </div>
                <div className="qd-next-reset">
                  <span>Next reset</span>
                  <strong>{resetLabel(nextReset)}</strong>
                </div>
              </div>
              <p>Percentages add up. Each account keeps its own limits.</p>
            </div>
            {/* The account list needs its own keyboard scroll target after adding samples. */}
            <div
              ref={accountsRef}
              className="qd-accounts"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-label="Sample accounts"
            >
              {accounts.map((account) => (
                <article
                  className={`qd-account${account.id === 'sam' && lastResetPreview ? ' qd-account-reset' : ''}`}
                  key={account.id}
                  aria-label={`${account.name} sample account`}
                >
                  <div className="qd-account-top">
                    <span className={`qd-avatar qd-avatar-${account.color}`}>
                      {account.initials}
                    </span>
                    <div className="qd-identity">
                      <button
                        type="button"
                        className="qd-email"
                        title="Copy sample email"
                        onClick={() => void copyEmail(account)}
                      >
                        <span>{account.id}@quodex.app</span>
                        <Copy size={11} />
                      </button>
                      <div>
                        <span className="qd-plan">Plus</span>
                        <span className={account.refreshed ? 'qd-fresh' : ''}>
                          {account.refreshed
                            ? 'Just updated · sample'
                            : 'Updated 23m ago · sample'}
                        </span>
                      </div>
                    </div>
                    <div className="qd-account-actions">
                      <button
                        type="button"
                        className="qd-desktop-action"
                        title={
                          account.alerts
                            ? 'Turn sample alerts off'
                            : 'Turn sample alerts on'
                        }
                        aria-label={`Reset alerts for ${account.name}`}
                        aria-pressed={account.alerts}
                        onClick={() => toggleAlerts(account)}
                      >
                        <Bell
                          size={14}
                          fill={account.alerts ? 'currentColor' : 'none'}
                        />
                      </button>
                      <button
                        type="button"
                        title="Refresh sample account"
                        aria-label={`Refresh ${account.name} sample account`}
                        disabled={refreshing.includes(account.id)}
                        onClick={() => refresh([account.id])}
                      >
                        <RotateCw
                          size={14}
                          className={
                            refreshing.includes(account.id) ? 'qd-spin' : ''
                          }
                        />
                      </button>
                      <button
                        type="button"
                        title="Remove sample account"
                        aria-label={`Remove ${account.name} sample account`}
                        className="qd-remove qd-desktop-action"
                        onClick={() => openDialog(account)}
                      >
                        <Trash2 size={14} />
                      </button>
                      <details className="qd-more-actions">
                        <summary
                          aria-label={`More actions for ${account.name}`}
                          title={`More actions for ${account.name}`}
                          onKeyDown={closeMenuOnEscape}
                        >
                          <MoreHorizontal size={18} />
                        </summary>
                        <div className="qd-actions-menu">
                          <button
                            type="button"
                            aria-pressed={account.alerts}
                            onKeyDown={closeMenuOnEscape}
                            onClick={(event) => {
                              toggleAlerts(account);
                              const details =
                                event.currentTarget.closest('details');
                              details?.removeAttribute('open');
                              details?.querySelector('summary')?.focus();
                            }}
                          >
                            <Bell size={15} />
                            Alerts {account.alerts ? 'on' : 'off'}
                          </button>
                          <button
                            type="button"
                            className="qd-remove"
                            onKeyDown={closeMenuOnEscape}
                            onClick={(event) => {
                              const details =
                                event.currentTarget.closest('details');
                              const summary = details?.querySelector('summary');
                              details?.removeAttribute('open');
                              openDialog(account, summary ?? undefined);
                            }}
                          >
                            <Trash2 size={15} />
                            Remove sample
                          </button>
                        </div>
                      </details>
                    </div>
                  </div>
                  <UsageRow
                    label="5-hour"
                    value={account.fiveHour}
                    reset={account.resetMinutes}
                  />
                  <UsageRow
                    label="Weekly"
                    value={account.weekly}
                    reset={account.weeklyResetMinutes}
                  />
                  {account.banked > 0 && (
                    <p className="qd-account-banked">
                      <RotateCw size={12} /> {account.banked} banked reset
                      available
                    </p>
                  )}
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="qd-empty">
            <strong>A clear view starts with one account.</strong>
            <p>Add a sample to explore limits and resets.</p>
            <button type="button" onClick={() => openDialog('add')}>
              <Plus size={16} /> Add sample account
            </button>
          </div>
        )}
        <footer className="qd-window-footer">
          <div>
            <span className="qd-sample-label">INTERACTIVE PREVIEW</span>
            <span>No sign-in needed</span>
          </div>
          <output className="qd-feedback" aria-live="polite" aria-atomic="true">
            <Check size={13} />
            <span>{status}</span>
          </output>
        </footer>
      </section>

      <dialog
        className="qd-dialog"
        ref={dialogRef}
        aria-labelledby="qd-dialog-title"
        aria-describedby="qd-dialog-description"
        onCancel={() => closeDialog()}
        onClose={() => {
          if (dialogAction) setDialogAction(null);
        }}
      >
        <button
          type="button"
          className="qd-dialog-close"
          aria-label="Close sample account dialog"
          onClick={closeDialog}
        >
          <X size={18} />
        </button>
        <span className="qd-dialog-kicker">SAMPLE DATA ONLY</span>
        <h2 id="qd-dialog-title">
          {dialogAction === 'add'
            ? 'Try another account.'
            : `Remove ${dialogAction?.name ?? 'this sample'}?`}
        </h2>
        <p id="qd-dialog-description">
          {dialogAction === 'add'
            ? 'Add a fictional account to see how pooled usage and individual limits fit together. This preview never connects to ChatGPT.'
            : 'This removes the fictional account from this preview. You can add it again at any time.'}
        </p>
        {dialogAction === 'add' && (
          <p className="qd-dialog-detail">
            This demo includes up to 8 samples. The Mac app supports up to 100
            accounts.
          </p>
        )}
        <div className="qd-dialog-actions">
          <button type="button" onClick={closeDialog}>
            Cancel
          </button>
          <button
            type="button"
            className={
              dialogAction === 'add'
                ? 'qd-confirm'
                : 'qd-confirm qd-confirm-remove'
            }
            onClick={confirmDialog}
          >
            {dialogAction === 'add' ? 'Add sample account' : 'Remove sample'}
          </button>
        </div>
      </dialog>
    </div>
  );
}
