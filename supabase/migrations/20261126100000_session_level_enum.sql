-- Every session gets a level. An enum keeps the allowed values in the schema,
-- so `pnpm db:types` generates a union type for them (same reason as
-- `session_track`).
--
-- The read policy on `sessions` is per row, so the new column needs no RLS
-- change.

do $$
begin
  create type public.session_level as enum (
    'beginner',
    'intermediate',
    'advanced'
  );
exception
  when duplicate_object then null;
end $$;

-- Added nullable first: the existing rows need a value before NOT NULL holds.
alter table public.sessions
  add column if not exists level public.session_level;

update public.sessions
set level = case id
  when 'opening-keynote' then 'beginner'
  when 'closing-panel' then 'beginner'
  when 'build-your-agentic-workflow' then 'intermediate'
  when 'server-components-deep-dive' then 'intermediate'
  when 'testing-ai-generated-code' then 'intermediate'
  when 'rsc-payload-budget' then 'advanced'
  when 'agent-context-windows' then 'advanced'
  when 'micro-frontends-2026' then 'advanced'
end::public.session_level
where level is null;

alter table public.sessions
  alter column level set not null;
