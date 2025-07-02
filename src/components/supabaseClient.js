import { createClient } from '@supabase/supabase-js';

  const supabaseUrl = "https://ebzmguzmfpoqdhzrumep.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViem1ndXptZnBvcWRoenJ1bWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDgzMzMsImV4cCI6MjA2NjQyNDMzM30.OKl9EwWMsjYXs9OwZ09gVCjX9FgZEPvuQm7AvoZNq_E";

export const supabase = createClient(supabaseUrl, supabaseKey);
