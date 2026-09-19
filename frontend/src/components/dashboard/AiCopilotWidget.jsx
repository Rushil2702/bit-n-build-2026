import { useState } from 'react';
import { Sparkles, Send, Copy, Check, Terminal } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { aiCopilotPrompts } from '../../data/mockData';

export default function AiCopilotWidget() {
  const [selectedPrompt, setSelectedPrompt] = useState(aiCopilotPrompts[0]);
  const [copied, setCopied] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [customResponse, setCustomResponse] = useState(null);

  const handleCopy = () => {
    const textToCopy = customResponse || selectedPrompt.response;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomSubmit = (e) => {
    e?.preventDefault();
    if (!customInput.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      setCustomResponse(
        `ClubOps AI Synthesis for "${customInput}":\n• Cross-referenced TechFest 2026 registry with 842 hackers and 42 active volunteers.\n• Recommendation: Coordinate with committee leads in #tech-infra and dispatch verified action items to Sprint 3 queue.`
      );
      setIsThinking(false);
      setCustomInput('');
    }, 600);
  };

  const activeContent = customResponse || selectedPrompt.response;

  return (
    <Card
      title="ClubOps AI Copilot"
      subtitle="Autonomous event synthesis, workload calculation & email drafts"
      icon={Sparkles}
      aiGlow
      action={
        <Badge variant="ai" size="sm" dot>
          Active Model: Ops-4o
        </Badge>
      }
    >
      {/* Quick Prompt Chips */}
      <div style={{ marginBottom: '14px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            marginBottom: '8px',
          }}
        >
          Suggested Quick Prompts:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {aiCopilotPrompts.map((p) => {
            const isSelected = selectedPrompt.id === p.id && !customResponse;

            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPrompt(p);
                  setCustomResponse(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 11px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  backgroundColor: isSelected ? 'var(--color-ai-light)' : 'var(--bg-canvas)',
                  border: isSelected ? '1px solid var(--color-ai-border)' : '1px solid var(--border-subtle)',
                  color: isSelected ? 'var(--color-ai)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <Sparkles size={12} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Output Terminal Box */}
      <div
        style={{
          backgroundColor: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '14px 16px',
          marginBottom: '14px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
            paddingBottom: '8px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-ai)' }}>
            <Terminal size={13} />
            <span style={{ fontWeight: '600' }}>
              {customResponse ? 'Autonomous Output' : selectedPrompt.title}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
            style={{ fontSize: '11px', padding: '2px 8px' }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        {isThinking ? (
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              color: 'var(--color-ai)',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={16} />
            <span>Analyzing campus operational telemetry...</span>
          </div>
        ) : (
          <pre
            style={{
              fontFamily: 'inherit',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {activeContent}
          </pre>
        )}
      </div>

      {/* Input Prompt Bar */}
      <form
        onSubmit={handleCustomSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Ask AI Copilot (e.g. 'Draft reminder for catering team' or 'Check wifi bandwidth')..."
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '7px',
              padding: '8px 12px',
              fontSize: '12px',
              color: 'var(--text-primary)',
            }}
          />
        </div>
        <Button
          variant="ai"
          size="sm"
          type="submit"
          icon={Send}
          disabled={!customInput.trim() || isThinking}
        >
          Synthesize
        </Button>
      </form>
    </Card>
  );
}
