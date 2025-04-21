import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://gffeytnjhuxyfgsdidwb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZmV5dG5qaHV4eWZnc2RpZHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODQ5NjgsImV4cCI6MjA2MDM2MDk2OH0.7z6vt913-SIeYgYq_PY0T81_DjyDAEZ0mInT0iXPXIY'
)