CREATE DATABASE IF NOT EXISTS falaetec;
USE falaetec;

-- =====================================================
-- TABELA: TURMA
-- =====================================================
CREATE TABLE turma (
    turma_id varchar(255) PRIMARY KEY,
    classe VARCHAR(50) NOT NULL,
    curso VARCHAR(100) NOT NULL
);

-- =====================================================
-- TABELA: ALUNO
-- =====================================================
CREATE TABLE aluno (
    aluno_id CHAR(5) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL,

    -- Relacionamento: turma 1:N aluno
    turma_id VARCHAR(255) NOT NULL,

    CONSTRAINT fk_aluno_turma
        FOREIGN KEY (turma_id)
        REFERENCES turma(turma_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- =====================================================
-- TABELA: PROFESSOR
-- =====================================================
CREATE TABLE professor (
    professor_id CHAR(5) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL
);

-- =====================================================
-- TABELA: GESTOR
-- =====================================================
CREATE TABLE gestor (
    gestor_id CHAR(5) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL
);

-- =====================================================
-- TABELA: INTERACAO
-- =====================================================
CREATE TABLE interacao (
    interacao_id VARCHAR(255)PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    nota DECIMAL(5,2),
    local VARCHAR(100),
    sub_local VARCHAR(100),
    url_img VARCHAR(500),

    -- Relacionamento: aluno 1:N interacao
    aluno_id CHAR(5) NOT NULL,

    -- Relacionamento: professor 1:N interacao
    professor_id CHAR(5),

    CONSTRAINT fk_interacao_aluno
        FOREIGN KEY (aluno_id)
        REFERENCES aluno(aluno_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_interacao_professor
        FOREIGN KEY (professor_id)
        REFERENCES professor(professor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- =====================================================
-- TABELA: RESPOSTA
-- =====================================================
CREATE TABLE resposta (
    resposta_id VARCHAR(255) PRIMARY KEY,
    mensagem TEXT NOT NULL,
    tipo_autor ENUM('gestor', 'professor'),
    data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Relacionamento: interacao 1:N resposta
    interacao_id VARCHAR(255) NOT NULL,

    -- Relacionamento: professor 1:N resposta
    professor_id CHAR(5),

    -- Relacionamento: gestor 1:N resposta
    gestor_id CHAR(5),

    CONSTRAINT fk_resposta_interacao
        FOREIGN KEY (interacao_id)
        REFERENCES interacao(interacao_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_resposta_professor
        FOREIGN KEY (professor_id)
        REFERENCES professor(professor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_resposta_gestor
        FOREIGN KEY (gestor_id)
        REFERENCES gestor(gestor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- =====================================================
-- TABELA: REFRESH_TOKEN
-- =====================================================

CREATE TABLE refresh_token (
    refresh_token_id VARCHAR(255) PRIMARY KEY,
    token_hash CHAR(64) NOT NULL UNIQUE,
    tipo_usuario ENUM('aluno', 'professor', 'gestor') NOT NULL,
    usuario_id CHAR(5) NOT NULL,
    expiracao DATETIME NOT NULL,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    revogado TINYINT NOT NULL DEFAULT 0,
    INDEX idx_refresh_usuario (tipo_usuario, usuario_id)
);