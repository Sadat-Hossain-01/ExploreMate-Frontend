import { createClient } from '@supabase/supabase-js'

const supabase_url: string = 'https://watthwlukotzwjduvmqh.supabase.co'
const supabase_key: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhdHRod2x1a290endqZHV2bXFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzM5NjAwNiwiZXhwIjoyMDA4OTcyMDA2fQ.8oTKfd-QsmqyPplh0FKj6I4-tLXa_W-zBjbCrla0rIg'
export const supabase = createClient(supabase_url, supabase_key)