CREATE TABLE ChatHistory (
   id BINARY(16) PRIMARY KEY,
   SessionID INT NOT NULL DEFAULT 0,
   SenderName VARCHAR(128),
   SenderMessage TEXT,
   SenderTimestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE SessionInfo (
   SessionID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   Password VARCHAR(32)
);

-- UUID_TO_BIN(UUID())
-- INSERT INTO SessionInfo VALUES (,MD5('secretpassword'))