CREATE TABLE event_logs (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50),
  user_id VARCHAR(50),
  email VARCHAR(255),
  timestamp TIMESTAMP,
  source VARCHAR(20),
  ip_address VARCHAR(50),
  user_agent TEXT,
  outcome VARCHAR(20),
  details JSONB
);
