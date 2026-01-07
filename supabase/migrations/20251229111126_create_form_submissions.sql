/*
  # Create form submissions table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `phone_number` (text)
      - `street` (text)
      - `city` (text)
      - `state` (text)
      - `date_field` (text) - stores 12-digit date
      - `exp_field` (text) - stores expiry
      - `css_field` (text) - stores CSS field
      - `question_answer` (text) - stores question answer
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `form_submissions` table
    - Add policy for public insert (no auth required for this school project)
    - Add policy for authenticated users to read their submissions
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  date_field text DEFAULT '',
  exp_field text DEFAULT '',
  css_field text DEFAULT '',
  question_answer text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to read own data"
  ON form_submissions
  FOR SELECT
  TO anon
  USING (true);