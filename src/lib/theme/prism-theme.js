var colors = {
  char: '#56B6C2',
  bg: '#282c34',
  comment: '#999999',
  keyword: '#c5a5c5',
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#5FB3B3',
  tag: '#E06C75',
  function: '#79b6f2',
  className: '#61AFEF',
  method: '#6699CC',
  operator: '#fc929e',
  parameter: '#E5C07B',
}

export const prismTheme = {
  plain: {
    backgroundColor: colors.bg,
    color: '#D8DEE9',
  },
  styles: [
    {
      types: ['attr-name'],
      style: {
        color: colors.string,
      },
    },
    {
      types: ['parameter'],
      style: {
        color: colors.parameter,
      },
    },
    {
      types: ['attr-value'],
      style: {
        color: colors.string,
      },
    },
    {
      types: [
        'comment',
        'block-comment',
        'prolog',
        'doctype',
        'cdata',
        'shebang',
      ],
      style: {
        color: colors.comment,
      },
    },
    {
      types: ['property', 'function-name', 'constant', 'symbol', 'deleted'],
      style: {
        color: colors.primitive,
      },
    },
    {
      types: ['boolean', 'number'],
      style: {
        color: colors.boolean,
      },
    },
    {
      types: ['tag'],
      style: {
        color: colors.tag,
      },
    },
    {
      types: ['string'],
      style: {
        color: colors.string,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: colors.variable,
      },
    },
    {
      types: ['selector', 'char', 'builtin', 'inserted'],
      style: {
        color: colors.char,
      },
    },
    {
      types: ['function'],
      style: {
        color: colors.function,
      },
    },
    {
      types: ['operator', 'entity', 'url', 'variable'],
      style: {
        color: colors.variable,
      },
    },
    {
      types: ['keyword'],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ['at-rule', 'class-name'],
      style: {
        color: colors.className,
      },
    },
    {
      types: ['important'],
      style: {
        fontWeight: '400',
      },
    },
    {
      types: ['bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
  ],
}
