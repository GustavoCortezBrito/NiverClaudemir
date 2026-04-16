# Setup Supabase - Aniversário do Claudemir

## 1. Criar Projeto no Supabase
- Acesse: https://supabase.com
- Crie um **novo projeto** (pode ser o mesmo da Geo ou um separado)

## 2. Criar a Tabela

No **SQL Editor** do Supabase, rode:

```sql
CREATE TABLE confirmations_claudemir (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'confirmado',
  confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_claudemir_email ON confirmations_claudemir(email);
```

## 3. Configurar `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_aqui
ADMIN_PASSWORD=claudemir2026
```

> Pegue a URL e a chave em **Settings → API** no dashboard do Supabase.

## 4. Instalar e rodar

```bash
npm install
npm run dev
```

## Acesso Admin

- URL: `/admin`
- Senha padrão: `claudemir2026` (altere no `.env.local`)
