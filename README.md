# Documentação Técnica - PassPass React FrontEnd

## Visão Geral

O PassPass é um sistema web para geração de senhas seguras, customizáveis e responsivas, desenvolvido em ReactJS. O frontend permite ao usuário gerar senhas a partir de palavras-chave, aplicar filtros avançados e copiar a senha gerada de forma prática, com feedback visual. O sistema integra-se a um backend via API REST para geração da senha.

## Estrutura de Pastas

- `src/components/` - Componentes reutilizáveis da interface, incluindo:
  - `PasswordGen.js` e `PasswordGen.css`: Componente principal de geração de senhas.
  - `KeywordInput.js`: Campo de entrada para palavras-chave.
  - `GenericButton.js`, `FilterButton.js`: Botões reutilizáveis e botão de filtro.
  - `FiltersPanel.js`: Painel de filtros customizáveis.
  - `MatrixRain.js`: Efeito visual animado de caracteres caindo (estilo Matrix).
- `src/assets/` - Ícones SVG utilizados nos filtros e interface.
- `src/Api.js` - Configuração do axios para integração com o backend.

## Principais Funcionalidades

### Geração de Senhas
- O usuário informa até 3 palavras-chave.
- Pode customizar a senha usando filtros:
  - Quantidade de caracteres
  - Permitir/proibir números
  - Permitir/proibir caracteres especiais
  - Apenas letras maiúsculas/minúsculas
  - Somente números
- O painel de filtros é expansível e exibe ícones ilustrativos.
- O layout é responsivo e centralizado.
- Ao gerar a senha, o frontend envia um POST para `/api/password` com o seguinte body:

```json
{
  "auth": { "user": "" },
  "keyword": ["palavra1", "palavra2", "palavra3"],
  "options": {
    "chars": 12,
    "use_numbers": true,
    "use_special": true,
    "only_numbers": false,
    "only_upper_case": false,
    "only_lower_case": false
  }
}
```

- O backend responde com a senha gerada e status.
- A senha gerada é exibida e pode ser copiada para a área de transferência.
- Um modal de confirmação é exibido ao copiar a senha.

### Experiência Visual
- O painel de filtros exibe ícones SVG ao lado de cada opção.
- O botão de filtro muda de cor ao ser ativado.
- O efeito MatrixRain é exibido no painel lateral.
- O layout se adapta a diferentes tamanhos de tela.

## Integração Backend
- O frontend espera um backend compatível com FastAPI, recebendo o body conforme o schema acima.
- O backend deve responder com um JSON contendo `status_code`, `password` e `description`.

## Scripts Disponíveis
- `npm install`: Executa a instalacao dos pacotes requeridos para o app.
- `npm start`: Executa o app em modo desenvolvimento.
- `npm test`: Executa os testes (ainda nao desenvolvidos).
- `npm run build`: Gera a build de produção.

## Observações Técnicas
- O código segue boas práticas de componentização e reutilização.
- O painel de filtros é dinâmico e esconde opções incompatíveis (ex: ao marcar "Somente números").
- O sistema é facilmente extensível para novos filtros ou integrações.

## Requisitos
- Node.js >= 14
- Backend compatível com o contrato de API descrito acima.

## Autores
- Equipe PassPass

---

Para dúvidas técnicas, consulte os arquivos fonte em `src/components` e a documentação inline dos componentes.
