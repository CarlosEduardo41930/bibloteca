CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE bibliotecario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    ano_publicacao YEAR,
    image VARCHAR(255)
);

CREATE TABLE leitor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    tel VARCHAR(20),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE emprestimo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_leitor INT NOT NULL,
    fk_livro INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_para_devolucao DATE NOT NULL,
    data_devolvido DATE NULL,
    status ENUM('EMPRESTADO', 'DEVOLVIDO', 'ATRASADO') DEFAULT 'EMPRESTADO',
    divida DECIMAL(10,2) DEFAULT 0.00,

    CONSTRAINT fk_emprestimo_leitor
        FOREIGN KEY (fk_leitor)
        REFERENCES leitor(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_emprestimo_livro
        FOREIGN KEY (fk_livro)
        REFERENCES livros(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

INSERT INTO livros (titulo, autor, categoria, ano_publicacao, image) VALUES
('Dom Casmurro', 'Machado de Assis', 'Romance', 1899, ''),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Infantil', 1943, ''),
('Clean Code', 'Robert C. Martin', 'Programação', 2008, '');