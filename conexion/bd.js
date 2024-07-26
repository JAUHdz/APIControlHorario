const { Client } = require('pg');

const db = new Client({
  host: 'aws-0-us-west-1.pooler.supabase.com',
  port: '6543', // Generalmente es 5432 para PostgreSQL
  database: 'postgres',
  user: 'postgres.nbsfpltgzbqarhbcjarj',
  password: 'QWERTYappch11$',
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a PostgreSQL:', err.stack);
    return;
  }
  console.log('Conectado a PostgreSQL');
});

module.exports = db;
