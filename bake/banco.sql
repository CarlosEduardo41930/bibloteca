CREATE DATABASE libmanager;
USE libmanager;
CREATE TABLE livros(
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    ano INT,
    disponivel BOOLEAN DEFAULT 1
);

INSERT INTO livros (titulo, autor, ano)
VALUES ('Clean Code', 'Robert Martin', 2008);