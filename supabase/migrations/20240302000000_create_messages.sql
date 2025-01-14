-- Drop the existing table and policies
drop policy if exists "Users can read their own messages" on public.messages;
drop policy if exists "Users can insert their own messages" on public.messages;
drop table if exists public.messages;

-- Create messages table with text user_id
create table public.messages (
    id bigint generated by default as identity primary key,
    user_id text not null,
    role text not null check (role in ('user', 'assistant', 'system')),
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.messages enable row level security;

-- Create policies that explicitly handle both authenticated users and temporary users
create policy "Users can read their own messages"
    on public.messages for select
    using (
        (auth.uid()::text = user_id) or 
        (user_id like 'user_%') or 
        (auth.role() = 'authenticated')
    );

create policy "Users can insert their own messages"
    on public.messages for insert
    with check (
        (auth.uid()::text = user_id) or 
        (user_id like 'user_%') or 
        (auth.role() = 'authenticated')
    ); 