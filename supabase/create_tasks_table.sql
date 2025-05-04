-- Create tasks table function
create or replace function create_tasks_table()
returns void
language plpgsql
security definer
as $$
begin
  create table if not exists tasks (
    id uuid default gen_random_uuid() primary key,
    description text not null,
    completed boolean default false,
    created_at timestamptz default now()
  );

  -- Grant access to public role
  grant all on tasks to anon;
  grant all on tasks to authenticated;
end;
$$;
