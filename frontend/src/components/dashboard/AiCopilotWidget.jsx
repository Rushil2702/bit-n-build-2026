import { useState } from 'react';
import { MessageSquare, Send, Copy, Check, Terminal } from 'lucide-react';
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
        `Operations Summary for "${customInput}":\n• Cross-referenced TechFest 2026 registry (842 hackers, 42 volunteers on-duty).\n• Relevant Lead: Tech & Infra Committee. Recommended action: Verify status in Command Center or dispatch task to Sprint 3 queue.`
      );
      setIsThinking(false);
      setCustomInput('');
    }, 500);
  };

  const activeContent = customResponse || selectedPrompt.response;

  return (
    <Card
      title="Operations Assistant"
      subtitle="Contextual intelligence & operational query helper"
      icon={MessageSquare}
      action={
        <Badge variant="neutral" size="sm">
          Online
        </Badge>
      }
    >
      {/* Quick Query Chips */}
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-muted)',
            marginBottom: '6px',
          }}
        >
          Common Operational Queries:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {aiCopilotPrompts.map((p) => {
            const isSelected = selectedPrompt.id === p.id && !customResponse;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPrompt(p);
                  setCustomResponse(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--bg-canvas)',
                  border: isSelected ? '1px solid var(--color-primary-border)' : '1px solid var(--border-subtle)',
                  color: isSelected ? 'var(--color-primary)' : 'var(--text-secondary)',
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
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Response Box */}
      <div
        style={{
          backgroundColor: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px 14px',
          marginBottom: '12px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px',
            paddingBottom: '6px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <Terminal size={12} />
            <span style={{ fontWeight: '600' }}>
              {customResponse ? 'Response' : selectedPrompt.title}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
            style={{ fontSize: '11px', padding: '2px 6px', height: '24px' }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        {isThinking ? (
          <div
            style={{
              padding: '16px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '12px',
            }}
          >
            Retrieving operational data...
          </div>
        ) : (
          <pre
            style={{
              fontFamily: 'inherit',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {activeContent}
          </pre>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={handleCustomSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Ask Operations Assistant..."
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '7px 11px',
            fontSize: '12px',
            color: 'var(--text-primary)',
          }}
        />
        <Button
          variant="primary"
          size="sm"
          type="submit"
          icon={Send}
          disabled={!customInput.trim() || isThinking}
        >
          Ask
        </Button>
      </form>
    </Card>
  );
}
