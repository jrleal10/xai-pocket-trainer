import re

# Ler o arquivo
with open(r'C:\Projetos\interview_xai_web_app\js\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Substituir smart quotes por aspas normais
content = content.replace('\u2018', "'")  # Left single quote
content = content.replace('\u2019', "'")  # Right single quote (apostrofe)
content = content.replace('\u201C', '"')  # Left double quote
content = content.replace('\u201D', '"')  # Right double quote
content = content.replace('\u2014', '-')  # Em dash (travessao longo)

# Salvar
with open(r'C:\Projetos\interview_xai_web_app\js\data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('OK - Caracteres especiais corrigidos!')
print('- Smart quotes substituidas por aspas ASCII')
print('- Travessoes longos substituidos por hifens')
