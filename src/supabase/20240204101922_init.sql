CREATE TYPE priority_type AS ENUM('High', 'Medium', 'Low');

CREATE TABLE todos (
id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
user_id UUID REFERENCES auth.users NOT NULL,
title TEXT CHECK (char_length(title) > 3),
description TEXT DEFAULT NULL,
status BOOLEAN DEFAULT FALSE,
startDate TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
endDate TIMESTAMP WITH TIME ZONE DEFAULT NULL,
priority priority_type DEFAULT NULL,
create_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Individuals can create todos." ON todos;
CREATE POLICY "Individuals can create todos." ON todos FOR
INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Individuals can view their own todos. " ON todos;
CREATE POLICY "Individuals can view their own todos. " ON todos FOR
SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Individuals can update their own todos." ON todos;
CREATE POLICY "Individuals can update their own todos." ON todos FOR
UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Individuals can delete their own todos." ON todos;
CREATE POLICY "Individuals can delete their own todos." ON todos FOR
DELETE USING (auth.uid() = user_id);