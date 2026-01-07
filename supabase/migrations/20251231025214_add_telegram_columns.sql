/*
  # Add Telegram support to form submissions

  1. Changes to `form_submissions` table
    - Add `source` column to track if submission came from web or telegram
    - Add `telegram_user_id` to store Telegram user ID for telegram submissions
    - Add `telegram_username` to store Telegram username if available

  2. Details
    - `source` defaults to 'web' for existing and new web submissions
    - Telegram submissions will have source='telegram' and populate telegram_user_id
    - This allows tracking submissions from both sources in one table
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'source'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN source text DEFAULT 'web';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'telegram_user_id'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN telegram_user_id bigint;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'form_submissions' AND column_name = 'telegram_username'
  ) THEN
    ALTER TABLE form_submissions ADD COLUMN telegram_username text;
  END IF;
END $$;