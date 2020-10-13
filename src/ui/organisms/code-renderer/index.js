import styled from '@emotion/styled'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { hexToRGBA } from 'lib/hex-to-rgba'
import { sizes, theme } from 'lib/theme'
import { prismTheme } from 'lib/theme/prism-theme'
import { lighten } from 'polished'
import { useWindowSize } from 'lib/use-window-size'

const getSyntaxLabel = (syntax) => {
  switch (syntax) {
    case 'jsx':
      return 'JSX'
    case 'js':
      return 'JavaScript'
    case 'ts':
      return 'TypeScript'
    case 'tsx':
      return 'TSX'
    default:
      return syntax
  }
}

export const CodeRenderer = ({ syntax, code, heading }) => {
  const { isMobile } = useWindowSize()
  return (
    <Container>
      <Syntax>{getSyntaxLabel(syntax)}</Syntax>
      <Highlight
        {...defaultProps}
        theme={prismTheme}
        code={code}
        language={syntax}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            <Scrollbars autoHeight autoHeightMax={6000} universal>
              {tokens.map((line, i) => (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  {!isMobile && <LineNo>{i + 1}</LineNo>}
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Scrollbars>
          </Pre>
        )}
      </Highlight>
      {heading && <CodeHeading>{heading}</CodeHeading>}
    </Container>
  )
}

const Syntax = styled.div`
  position: absolute;
  z-index: 0;
  top: 0px;
  right: 14px;
  transform: translateY(-100%);
  font-size: ${theme.font.size.S + 1}px;
  padding: 5px 10px 3px;
  background: ${lighten(0.04, prismTheme.plain.backgroundColor)};
  border-radius: 8px 8px 0px 0px;
  color: ${hexToRGBA(theme.colors.background, 0.8)};
  font-weight: 600;
  pointer-events: none;
`

const Container = styled.section`
  margin-bottom: 25px;
  margin-top: 55px;
  position: relative;
`

const CodeHeading = styled.p`
  font-size: ${theme.font.size.M - 1}px;
  font-weight: 500;
  /* margin-top: 8px; */
  background: ${lighten(0.03, prismTheme.plain.backgroundColor)};
  padding: 12px 10px;
  border-top: 1px solid ${hexToRGBA(theme.colors.background, 0.4)};
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0px 4px 15px ${hexToRGBA(theme.colors.text, 0.5)};
`

const Pre = styled.pre`
  /* text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll; */
  padding: 13px 7px;
  border-radius: 5px;
  background: red;
  font-size: ${theme.font.size.M - 2}px;
  height: 100%;
  box-shadow: 0px 4px 25px ${hexToRGBA(theme.colors.text, 0.3)};
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 0.7em;
  user-select: none;
  opacity: 0.3;
`

const LineContent = styled.span`
  display: table-cell;
`
