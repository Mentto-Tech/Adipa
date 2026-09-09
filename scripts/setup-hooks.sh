#!/usr/bin/env bash
# Instala o pre-commit hook localmente.
# Execute uma vez após clonar o repositório: bash scripts/setup-hooks.sh

set -e

HOOK_SRC=".githooks/pre-commit"
HOOK_DST=".git/hooks/pre-commit"

if [ ! -f "$HOOK_SRC" ]; then
  echo "Arquivo $HOOK_SRC não encontrado."
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DST"
chmod +x "$HOOK_DST"

echo "✓ pre-commit hook instalado em $HOOK_DST"
echo "  Os testes serão rodados automaticamente a cada 'git commit'."
