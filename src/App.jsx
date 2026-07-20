import {
  Button,
  Badge,
  Tag,
  Input,
  Card,
  Avatar,
  Accordion,
  Tabs,
  SectionHeader,
} from './components'

/* ------------------------------------------------------------------ */
/* Minimal demo — verifies every component renders without errors      */
/* This file will be replaced with real page sections in later phases  */
/* ------------------------------------------------------------------ */

const accordionItems = [
  {
    id: 'a1',
    title: 'What courses are available?',
    content: 'EduNova offers hundreds of courses across development, design, and business.',
  },
  {
    id: 'a2',
    title: 'How does certification work?',
    content: 'Complete a course and pass the assessment to earn a shareable certificate.',
    defaultOpen: true,
  },
]

const tabItems = [
  { id: 'all',      label: 'All Courses',   badge: 120, content: <p>All courses content.</p> },
  { id: 'popular',  label: 'Popular',        content: <p>Popular courses content.</p> },
  { id: 'new',      label: 'New',            content: <p>New courses content.</p> },
  { id: 'archived', label: 'Archived',       content: <p>Archived content.</p>, disabled: true },
]

export default function App() {
  return (
    <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* SectionHeader */}
      <SectionHeader
        eyebrow="Phase 3"
        title="UI Component Library"
        subtitle="All reusable components rendered below for build verification."
        divider
      />

      {/* Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="primary" loading>Loading</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="primary" dot>Primary</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success" dot>Active</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="solid">99+</Badge>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <Tag>React</Tag>
        <Tag selected>TypeScript</Tag>
        <Tag onClick={() => {}}>Clickable</Tag>
        <Tag onRemove={() => {}}>Removable</Tag>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
        <Input label="Email" type="email" placeholder="hello@edunova.com" />
        <Input label="Search" placeholder="Search courses…" helperText="Try 'React' or 'Python'" />
        <Input label="Required field" required error="This field is required." defaultValue="" />
      </div>

      {/* Card */}
      <Card hoverable accentBar style={{ maxWidth: 360 }}>
        <Card.Header>
          <SectionHeader eyebrow="Course" title="Introduction to React" size="sm" />
        </Card.Header>
        <Card.Body>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Learn the fundamentals of React including hooks, state, and components.
          </p>
        </Card.Body>
        <Card.Footer>
          <Badge variant="success" dot>Beginner</Badge>
          <Badge variant="primary">12h</Badge>
        </Card.Footer>
      </Card>

      {/* Avatars */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar name="Alice Johnson" size="sm" />
        <Avatar name="Bob Smith" size="md" status="online" />
        <Avatar name="Carol White" size="lg" bordered />
        <Avatar size="xl" />
        <Avatar.Group max={3} size="md">
          <Avatar name="Alice Johnson" />
          <Avatar name="Bob Smith" />
          <Avatar name="Carol White" />
          <Avatar name="Dave Brown" />
          <Avatar name="Eve Davis" />
        </Avatar.Group>
      </div>

      {/* Accordion */}
      <Accordion items={accordionItems} variant="separated" />

      {/* Tabs */}
      <Tabs tabs={tabItems} variant="underline" />
      <Tabs tabs={tabItems} variant="pills" />

    </main>
  )
}
