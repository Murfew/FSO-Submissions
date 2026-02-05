CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
VALUES 
  ('Test Guy', 'test.com', 'New Test'),
  ('Test Dude', 'newtest.com', 'Second Test')
